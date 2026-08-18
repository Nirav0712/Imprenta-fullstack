import mongoose from "mongoose";

const themeSchema = new mongoose.Schema(
    {
        activePreset: {
            type: String,
            default: "imprenta-ocean",
        },
        colors: {
            primary: { type: String, default: "#0B5FA5" },
            secondary: { type: String, default: "#123B73" },
            accent: { type: String, default: "#00AEEF" },
            heading: { type: String, default: "#FFFFFF" },
            paragraph: { type: String, default: "#9FB3C8" },
            background: { type: String, default: "#061525" },
            surface: { type: String, default: "#12263A" },
            border: { type: String, default: "#29435C" },
            button: { type: String, default: "#00AEEF" },
            buttonHover: { type: String, default: "#0095D1" },
            gradientStart: { type: String, default: "#123B73" },
            gradientEnd: { type: String, default: "#00AEEF" },
        },
        design: {
            style: { type: String, default: "modern" },
            radius: { type: String, default: "12px" },
            shadow: { type: String, default: "subtle" },
        },
        typography: {
            headingFont: { type: String, default: "Poppins" },
            bodyFont: { type: String, default: "Inter" },
        },
    },
    {
        timestamps: true,
    }
);

const Theme = mongoose.model("Theme", themeSchema);

export default Theme;
