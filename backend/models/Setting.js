import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
    {
        companyName: { type: String, default: "Imprenta" },
        email: { type: String, default: "contact@imprenta.com" },
        phone: { type: String, default: "+91 9876543210" },
        address: { type: String, default: "Mumbai, India" },
        whatsapp: { type: String, default: "+91 9876543210" },
        facebook: { type: String, default: "" },
        instagram: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        youtube: { type: String, default: "" },
        logo: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" }
        },
        favicon: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" }
        }
    },
    { timestamps: true }
);

const Setting = mongoose.model("Setting", settingSchema);
export default Setting;
