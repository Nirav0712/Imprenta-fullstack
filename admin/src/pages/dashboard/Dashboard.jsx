import { useState, useEffect } from "react";
import { FiShoppingBag, FiBell } from "react-icons/fi";
import StatCard from "../../components/cards/StatCard";
import axiosInstance from "../../config/axios";
import io from "socket.io-client";

const Dashboard = () => {
  const [notificationSummary, setNotificationSummary] = useState({
    unreadCount: 0,
    orders: 0,
    inquiries: 0,
    samples: 0,
    inventory: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosInstance.get("/notifications?limit=50&unreadOnly=true");
        if (res.data.success) {
          const notifs = res.data.notifications;
          setNotificationSummary({
            unreadCount: res.data.total,
            orders: notifs.filter(n => n.type === "new_order").length,
            inquiries: notifs.filter(n => n.type === "product_inquiry").length,
            samples: notifs.filter(n => n.type === "sample_request").length,
            inventory: notifs.filter(n => n.type === "low_stock" || n.type === "out_of_stock").length,
          });
        }
      } catch (err) { }
    };
    fetchSummary();

    const token = localStorage.getItem("token");
    let socket;
    if (token) {
      const BASE_URL = import.meta.env.VITE_API_URL || "https://darkgreen-lyrebird-159850.hostingersite.com/api";
      const SOCKET_URL = BASE_URL.replace("/api", "");

      socket = io(SOCKET_URL, {
        auth: { token },
      });

      socket.on("new_notification", (notif) => {
        setNotificationSummary(prev => ({
          ...prev,
          unreadCount: prev.unreadCount + 1,
          orders: notif.type === "new_order" ? prev.orders + 1 : prev.orders,
          inquiries: notif.type === "product_inquiry" ? prev.inquiries + 1 : prev.inquiries,
          samples: notif.type === "sample_request" ? prev.samples + 1 : prev.samples,
          inventory: (notif.type === "low_stock" || notif.type === "out_of_stock") ? prev.inventory + 1 : prev.inventory,
        }));
      });

      socket.on("unread_count_update", (data) => {
        setNotificationSummary(prev => ({ ...prev, unreadCount: data.count }));
      });
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);
  return (
    <div>
      <h1 className="text-4xl text-white mb-6">
        Dashboard Working
      </h1>

      <StatCard
        title="Orders"
        value="128"
        icon={FiShoppingBag}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 md:gap-8 gap-6 mt-10">
        <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-[#101B2D] p-6">
          <h2 className="text-white text-2xl font-bold mb-4">
            Recent Orders
          </h2>
          <div className="text-slate-400">Order tracking coming soon...</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0C1524] p-6 h-fit relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition">
            <FiBell size={80} className="text-sky-400" />
          </div>
          <h2 className="text-white text-xl font-bold mb-6 flex items-center gap-3">
            <FiBell className="text-sky-400" />
            Notifications
          </h2>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400 font-semibold">New Unread</span>
              <span className="text-white font-bold text-lg bg-sky-500 px-3 py-0.5 rounded-full">{notificationSummary.unreadCount}</span>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Orders</span>
                <span className="text-slate-200">{notificationSummary.orders}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Product Inquiries</span>
                <span className="text-slate-200">{notificationSummary.inquiries}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Sample Requests</span>
                <span className="text-slate-200">{notificationSummary.samples}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Inventory Alerts</span>
                <span className={notificationSummary.inventory > 0 ? "text-red-400 font-semibold" : "text-slate-200"}>{notificationSummary.inventory}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;