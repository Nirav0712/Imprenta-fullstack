import mongoose from "mongoose";

const homePageSchema = new mongoose.Schema(
    {
        heroTitle: { type: String, default: "Premium Packaging Solutions" },
        heroSubtitle: { type: String, default: "Elevate your brand with our custom packaging." },
        heroImage: { type: String, default: "" },
        servicesTitle: { type: String, default: "Our Services" },
        servicesDescription: { type: String, default: "What we offer" },
        newsletterEnabled: { type: Boolean, default: true },
        newsletterImage: { type: String, default: "" },
        newsletterHeading: { type: String, default: "It's good to be on the list." },
        newsletterDescription: { type: String, default: "Partner with us today and start experiencing premium quality packaging and branding designed specifically for your industry's demands." },
        newsletterButtonText: { type: String, default: "Get in Touch" },
        newsletterButtonLink: { type: String, default: "/contact" },
        active: { type: Boolean, default: true }
    },
    { timestamps: true }
);

const HomePage = mongoose.model("HomePage", homePageSchema);
export default HomePage;
