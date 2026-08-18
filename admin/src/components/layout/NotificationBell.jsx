import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FiBell,
    FiMessageCircle,
    FiShoppingBag,
    FiPackage,
    FiMail,
    FiUserPlus,
    FiAlertTriangle,
    FiCheckCircle,
    FiX
} from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import axiosInstance from "../../config/axios";
import io from "socket.io-client";
import toast from "react-hot-toast";

const NOTIFICATION_SOUND = new Audio("/notification.mp3");

const NotificationBell = () => {
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);
    const socketRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUnreadCount();

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        // Initialize Socket
        const token = localStorage.getItem("token");
        if (token) {
            const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
            const SOCKET_URL = BASE_URL.replace("/api", "");

            socketRef.current = io(SOCKET_URL, {
                auth: { token },
            });

            socketRef.current.on("connect", () => {
                console.log("Connected to Real-time Notification System");
            });

            socketRef.current.on("unread_count_update", (data) => {
                setUnreadCount(data.count);
            });

            socketRef.current.on("new_notification", (notification) => {
                // Trigger Toast & Sound
                showToast(notification);
                playSound();

                setNotifications((prev) => [notification, ...prev].slice(0, 50));
                setUnreadCount((prev) => prev + 1);

                // Browser notification if allowed
                if (Notification.permission === "granted") {
                    new Notification("Imprenta Admin", {
                        body: notification.message,
                    });
                }
            });
        }

        if (Notification.permission === "default") {
            Notification.requestPermission();
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, []);

    const fetchUnreadCount = async () => {
        try {
            const res = await axiosInstance.get("/notifications/unread-count");
            if (res.data.success) {
                setUnreadCount(res.data.count);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchRecentNotifications = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("/notifications?limit=15");
            if (res.data.success) {
                setNotifications(res.data.notifications);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleDropdown = () => {
        if (!isOpen) {
            fetchRecentNotifications();
        }
        setIsOpen(!isOpen);
    };

    const markAllRead = async () => {
        try {
            await axiosInstance.put("/notifications/read-all");
            setUnreadCount(0);
            setNotifications((prev) =>
                prev.map((n) => ({ ...n, isRead: true }))
            );
        } catch (err) {
            console.error(err);
        }
    };

    const markAsRead = async (id) => {
        try {
            await axiosInstance.put(`/notifications/${id}/read`);
            setUnreadCount((prev) => Math.max(0, prev - 1));
            setNotifications((prev) =>
                prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
            );
        } catch (err) {
            console.error(err);
        }
    };

    const determineRoute = (notification) => {
        const typeRoutes = {
            product_inquiry: "/inquiries",
            new_order: "/orders",
            order_status: "/orders",
            sample_request: "/inquiries", // Assuming samples are grouped with inquiries or contact
            contact_message: "/contact",
            new_user: "/users",
            low_stock: "/products",
            out_of_stock: "/products",
            product_published: "/products"
        };

        return typeRoutes[notification.type] || "/dashboard";
    };

    const handleNotificationClick = (notification) => {
        if (!notification.isRead) {
            markAsRead(notification._id);
        }
        setIsOpen(false);
        navigate(determineRoute(notification));
    };

    const playSound = () => {
        // Only play if not globally disabled (could add localStorage setting check here)
        try {
            NOTIFICATION_SOUND.play().catch(() => { });
        } catch (err) { }
    };

    const showToast = (notification) => {
        toast.custom((t) => (
            <div
                className={`${t.visible ? "animate-enter" : "animate-leave"
                    } max-w-sm w-full bg-[#101B2D] border border-white/10 shadow-lg rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            {getIcon(notification.type, 20)}
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-bold text-white">
                                {notification.title}
                            </p>
                            <p className="mt-1 text-sm text-slate-400">
                                {notification.message}
                            </p>
                            <button
                                onClick={() => {
                                    toast.dismiss(t.id);
                                    handleNotificationClick(notification);
                                }}
                                className="mt-2 text-sky-400 text-xs font-semibold hover:text-sky-300 transition"
                            >
                                View &rarr;
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-white/5">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-sm font-medium text-slate-400 hover:text-white focus:outline-none"
                    >
                        <FiX />
                    </button>
                </div>
            </div>
        ), { duration: 6000 });
    };

    const getIcon = (type, size = 18) => {
        switch (type) {
            case "product_inquiry": return <FiMessageCircle size={size} className="text-blue-400" />;
            case "new_order": return <FiShoppingBag size={size} className="text-green-400" />;
            case "sample_request": return <FiPackage size={size} className="text-purple-400" />;
            case "contact_message": return <FiMail size={size} className="text-yellow-400" />;
            case "new_user": return <FiUserPlus size={size} className="text-cyan-400" />;
            case "low_stock": return <FiAlertTriangle size={size} className="text-orange-400" />;
            case "out_of_stock": return <FiAlertTriangle size={size} className="text-red-400" />;
            case "product_published": return <FiCheckCircle size={size} className="text-green-500" />;
            default: return <FiBell size={size} className="text-sky-400" />;
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="
          relative
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          border
          border-white/10
          bg-white/5
          text-white
          hover:bg-sky-500/20
          transition-colors
        "
            >
                <FiBell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 flex items-center justify-center h-4 w-4 text-[10px] font-bold rounded-full bg-sky-500 text-white animate-pulse">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-[min(calc(100vw-32px),430px)] rounded-[24px] border border-white/10 bg-[#0A1220]/95 backdrop-blur-2xl shadow-2xl py-4 z-50 animate-fadeUp">

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 pb-4 border-b border-white/5">
                        <div>
                            <h3 className="text-lg font-bold text-white">Notifications</h3>
                            <p className="text-sm text-slate-400 mt-0.5">{unreadCount} unread</p>
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllRead}
                                className="text-sm font-semibold text-sky-400 hover:text-sky-300 transition"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {/* List */}
                    <div className="max-h-[450px] overflow-y-auto custom-scrollbar px-2 py-2">
                        {loading ? (
                            <div className="py-10 text-center text-slate-400 text-sm">Loading...</div>
                        ) : notifications.length === 0 ? (
                            <div className="py-10 text-center text-slate-400 text-sm">
                                No notifications to display.
                            </div>
                        ) : (
                            notifications.map((notif) => (
                                <div
                                    key={notif._id}
                                    onClick={() => handleNotificationClick(notif)}
                                    className={`flex gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${!notif.isRead ? "bg-white/10 hover:bg-white/15" : "hover:bg-white/5"
                                        }`}
                                >
                                    <div className="mt-1 flex-shrink-0">
                                        {getIcon(notif.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className={`text-sm ${!notif.isRead ? "font-bold text-white" : "font-medium text-slate-300"}`}>
                                                {notif.title}
                                            </h4>
                                            {!notif.isRead && <div className="h-2 w-2 rounded-full bg-cyan-400 mt-1 flex-shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>}
                                        </div>
                                        <p className={`mt-1 text-sm ${!notif.isRead ? "text-slate-300" : "text-slate-500"} line-clamp-2`}>
                                            {notif.message}
                                        </p>
                                        <div className="mt-2 text-xs text-slate-500 font-medium">
                                            {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 pt-4 mt-2 border-t border-white/5 text-center">
                        <Link
                            to="/notifications"
                            onClick={() => setIsOpen(false)}
                            className="text-sm font-semibold text-slate-400 hover:text-white transition"
                        >
                            View All Notifications
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
