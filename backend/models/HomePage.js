import mongoose from "mongoose";

const homePageSchema = new mongoose.Schema(
    {
        heroTitle: { type: String, default: "Premium Packaging Solutions" },
        heroSubtitle: { type: String, default: "Elevate your brand with our custom packaging." },
        heroImage: { type: String, default: "" },
        servicesTitle: { type: String, default: "Our Services" },
        servicesDescription: { type: String, default: "What we offer" },
        active: { type: Boolean, default: true }
    },
    { timestamps: true }
);

const HomePage = mongoose.model("HomePage", homePageSchema);
export default HomePage;
