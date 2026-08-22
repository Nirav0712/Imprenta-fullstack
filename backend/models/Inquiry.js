import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
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
        product: {
            type: String,
            required: true,
            default: "General Inquiry",
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            default: null,
        },
        productName: { type: String, default: "" },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },
        categoryName: { type: String, default: "" },
        message: {
            type: String,
            default: "",
        },
        sku: { type: String, default: "" },
        quantity: { type: String, default: "" },
        material: { type: String, default: "" },
        finish: { type: String, default: "" },
        lamination: { type: String, default: "" },
        foil: { type: String, default: "" },
        printing: { type: String, default: "" },
        size: { type: String, default: "" },
        designOption: { type: String, default: "" },
        customWidth: { type: String, default: "" },
        customHeight: { type: String, default: "" },
        unit: { type: String, default: "inch" },
        additionalRequirements: { type: String, default: "" },

        configuration: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        gst: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        address: { type: String, default: "" },
        status: {
            type: String,
            enum: ["New", "Contacted", "In Progress", "Completed", "Cancelled"],
            default: "New",
        },
    },
    { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);
export default Inquiry;
