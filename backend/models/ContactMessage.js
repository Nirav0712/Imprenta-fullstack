import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            default: "",
        },
        company: {
            type: String,
            default: "",
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Unread", "Read", "Contacted", "Completed"],
            default: "Unread",
        },
    },
    { timestamps: true }
);

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);
export default ContactMessage;
