import { useState, useEffect } from "react";
import axiosInstance from "../../config/axios";
import { formatDistanceToNow } from "date-fns";
import {
    FiMessageCircle,
    FiShoppingBag,
    FiPackage,
    FiMail,
    FiUserPlus,
    FiAlertTriangle,
    FiCheckCircle,
    FiBell,
    FiTrash2
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const filters = [
        "All", "Unread", "Orders", "Product Inquiries", "Sample Requests",
        "Messages", "Users", "Inventory", "System"
    ];

    const typeMap = {
        "Orders": "new_order",
        "Product Inquiries": "product_inquiry",
        "Sample Requests": "sample_request",
        "Messages": "contact_message",
        "Users": "new_user",
        "Inventory": "low_stock", // and out_of_stock mapping combined natively or handled separately
        "System": "system",
    };

    useEffect(() => {
        fetchNotifications();
    }, [filter, page]);

    const fetchNotifications = async () => {
        try {
            setLoading(true);

            let queryType = "";
            let unreadOnly = false;

            if (filter === "Unread") unreadOnly = true;
            else if (filter !== "All") queryType = typeMap[filter] || "";

            const res = await axiosInstance.get(`/notifications?page=${page}&limit=20${unreadOnly ? "&unreadOnly=true" : ""}${queryType ? `&type=${queryType}` : ""}`);

            if (res.data.success) {
                setNotifications(res.data.notifications);
                setTotalPages(res.data.pages);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            await axiosInstance.put(`/notifications/${id}/read`);
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
        } catch (err) { }
    };

    const deleteNotification = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await axiosInstance.delete(`/notifications/${id}`);
            setNotifications(prev => prev.filter(n => n._id !== id));
        } catch (err) { }
    };

    const getIcon = (type, size = 20) => {
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

    const handleNotificationClick = (notif) => {
        if (!notif.isRead) markAsRead(notif._id);
        // Custom logic to navigate to relevant pages based on type could go here
        // navigate(determineRoute(notif))
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white">Notifications</h1>
                    <p className="mt-1 text-slate-400">View and manage all system alerts.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => { setFilter(f); setPage(1); }}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === f
                            ? "bg-sky-500 text-white"
                            : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="bg-[#101B2D] border border-white/10 rounded-[24px] overflow-hidden">
                {loading ? (
                    <div className="p-10 text-center text-slate-400">Loading notifications...</div>
                ) : notifications.length === 0 ? (
                    <div className="p-10 text-center text-slate-400">No notifications found for this filter.</div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {notifications.map(notif => (
                            <div
                                key={notif._id}
                                className={`flex gap-4 p-5 sm:p-6 transition-colors ${!notif.isRead ? "bg-white/5" : "hover:bg-white/5"}`}
                            >
                                <div className="flex-shrink-0 mt-1 cursor-pointer" onClick={() => handleNotificationClick(notif)}>
                                    {getIcon(notif.type, 24)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="cursor-pointer" onClick={() => handleNotificationClick(notif)}>
                                            <h4 className={`text-base ${!notif.isRead ? "font-bold text-white" : "font-semibold text-slate-300"}`}>
                                                {notif.title}
                                            </h4>
                                            <p className={`mt-1 text-sm ${!notif.isRead ? "text-slate-300" : "text-slate-400"}`}>
                                                {notif.message}
                                            </p>
                                            <div className="mt-3 flex items-center gap-3 text-xs font-semibold text-slate-500">
                                                <span>{formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}</span>
                                                {!notif.isRead && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">New</span>
                                                    </>
                                                )}
                                                {notif.priority === "high" && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full">High Priority</span>
                                                    </>
                                                )}
                                                {notif.priority === "urgent" && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">Urgent</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {!notif.isRead && (
                                                <button
                                                    onClick={() => markAsRead(notif._id)}
                                                    className="text-xs font-semibold text-sky-400 hover:text-sky-300 whitespace-nowrap bg-sky-500/10 px-3 py-1.5 rounded-lg"
                                                >
                                                    Mark Read
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteNotification(notif._id)}
                                                className="text-slate-500 hover:text-red-400 p-2 rounded-lg transition-colors border border-transparent hover:border-red-400/20 hover:bg-red-400/10"
                                                title="Delete Notification"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="px-4 py-2 rounded-xl border border-white/10 bg-[#101B2D] text-slate-400 disabled:opacity-50 hover:bg-white/5"
                    >
                        Previous
                    </button>
                    <span className="text-sm font-semibold text-slate-400">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className="px-4 py-2 rounded-xl border border-white/10 bg-[#101B2D] text-slate-400 disabled:opacity-50 hover:bg-white/5"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Notifications;
