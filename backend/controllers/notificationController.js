import Notification from "../models/Notification.js";
import { getIo } from "../socket.js";

// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Admin
export const getNotifications = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const query = {};
        if (req.query.unreadOnly === "true") {
            query.isRead = false;
        }

        if (req.query.type && req.query.type !== "All") {
            query.type = req.query.type;
        }

        const notifications = await Notification.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Notification.countDocuments(query);

        res.json({
            success: true,
            notifications,
            total,
            page,
            pages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get unread notification count
// @route   GET /api/notifications/unread-count
// @access  Admin
export const getUnreadCount = async (req, res) => {
    try {
        const count = await Notification.countDocuments({ isRead: false });
        res.json({ success: true, count });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Mark individual notification as read
// @route   PUT /api/notifications/:id/read
// @access  Admin
export const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ success: false, message: "Not found" });
        }
        notification.isRead = true;
        await notification.save();

        // Broadcast count update
        const unreadCount = await Notification.countDocuments({ isRead: false });
        const io = getIo();
        if (io) {
            io.to("admins").emit("unread_count_update", { count: unreadCount });
        }

        res.json({ success: true, notification });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Admin
export const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany({ isRead: false }, { isRead: true });

        // Broadcast count update
        const io = getIo();
        if (io) {
            io.to("admins").emit("unread_count_update", { count: 0 });
        }

        res.json({ success: true, message: "All marked as read" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
// @access  Admin
export const deleteNotification = async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Internal helper for system backend code to create notifications and broadcast
export const createNotification = async (data) => {
    try {
        const newNotification = await Notification.create(data);
        const io = getIo();
        if (io) {
            // Broadcast to admin room
            io.to("admins").emit("new_notification", newNotification);

            // Broadcast new unread count
            const unreadCount = await Notification.countDocuments({ isRead: false });
            io.to("admins").emit("unread_count_update", { count: unreadCount });
        }
        return newNotification;
    } catch (error) {
        console.error("Failed to create notification inside helper:", error);
    }
};
