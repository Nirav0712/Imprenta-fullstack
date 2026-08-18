import Inquiry from "../models/Inquiry.js";
import { createNotification } from "./notificationController.js";

export const createInquiry = async (req, res) => {
    try {
        const { name, email, product } = req.body;

        if (!name || !email || !product) {
            return res.status(400).json({ success: false, message: "Name, email, and product are required" });
        }

        const inquiry = await Inquiry.create({
            ...req.body
        });

        // Notify Admin
        await createNotification({
            type: "product_inquiry",
            title: "New Product Inquiry",
            message: `${name} submitted an inquiry for ${product}.`,
            entityId: inquiry._id,
            entityType: "inquiry",
            productId: req.body.productId || null,
            productName: product || null,
            customerName: name || null,
            priority: "normal",
        });

        return res.status(201).json({ success: true, message: "Request submitted successfully", data: inquiry });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().populate("productId", "name slug").sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: inquiries });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updateInquiryStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ success: false, message: "Inquiry not found" });
        }

        inquiry.status = status || inquiry.status;
        await inquiry.save();

        return res.status(200).json({ success: true, message: "Inquiry status updated successfully", data: inquiry });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ success: false, message: "Inquiry not found" });
        }

        await inquiry.deleteOne();

        return res.status(200).json({ success: true, message: "Inquiry deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
