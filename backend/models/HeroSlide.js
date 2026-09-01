import mongoose from "mongoose";

const heroSlideSchema = new mongoose.Schema(
    {
        badge: { type: String, default: "" },
        heading: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, default: "" },
        primaryButtonText: { type: String, default: "Request a Sample" },
        primaryButtonLink: { type: String, default: "/request-wizard" },
        secondaryButtonText: { type: String, default: "Request a Quote" },
        secondaryButtonLink: { type: String, default: "/request-wizard" },
        isActive: { type: Boolean, default: true },
        displayOrder: { type: Number, default: 0 }
    },
    { timestamps: true }
);

const HeroSlide = mongoose.model("HeroSlide", heroSlideSchema);
export default HeroSlide;
