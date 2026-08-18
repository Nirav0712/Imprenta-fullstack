import ContactMessage from "../models/ContactMessage.js";
import { createNotification } from "./notificationController.js";

export const createContact = async (req, res) => {
    try {
        const { name, email, phone, company, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "Name, email and message are required" });
        }

        const newContactMessage = await ContactMessage.create({
            name, email, phone, company, message
        });

        // Notify Admin
        await createNotification({
            type: "contact_message",
            title: "New Contact Message",
            message: `${name} sent a new message through the Contact page.`,
            entityId: newContactMessage._id,
            entityType: "contact",
            customerName: name,
            priority: "normal",
        });

        return res.status(201).json({ success: true, message: "Message sent successfully", data: newContactMessage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getContacts = async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: messages });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updateContactStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const message = await ContactMessage.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ success: false, message: "Contact message not found" });
        }

        message.status = status || message.status;
        await message.save();

        return res.status(200).json({ success: true, message: "Status updated successfully", data: message });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const message = await ContactMessage.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ success: false, message: "Contact message not found" });
        }

        await message.deleteOne();

        return res.status(200).json({ success: true, message: "Contact message deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
