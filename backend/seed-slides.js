import mongoose from "mongoose";
import dotenv from "dotenv";
import HeroSlide from "./models/HeroSlide.js";
dotenv.config();

const defaultSlides = [
    {
        badge: "Flexible & Premium Packaging",
        heading: "Premium Packaging Solutions\nThat Wrap\nYour Brand",
        description: "Create a powerful shelf presence with high-quality shrink sleeve packaging designed for standout branding."
    },
    {
        badge: "Premium Paper Packaging Scodix",
        heading: "Premium Packaging Solutions\nThat Elevate\nEvery Product",
        description: "Give your products a premium identity with custom-designed mono cartons built for protection and presentation."
    },
    {
        badge: "Seamless Tube Packaging",
        heading: "Premium Tube Solutions\nMade for\nModern Brands",
        description: "Deliver quality, convenience, and visual appeal with seamless plastic tubes customized for your product."
    },
    {
        badge: "Corporate Branding Solutions",
        heading: "Powerful Branding Solutions\nThat Make You\nStand Out",
        description: "Build a consistent and memorable brand identity with customized corporate branding solutions."
    },
    {
        badge: "Creative Design Services",
        heading: "Creative Design Solutions\nThat Bring Brands\nto Life",
        description: "From concept to final artwork, we create impactful designs that communicate your brand with clarity."
    },
    {
        badge: "Premium Label Solutions",
        heading: "Premium Labels\nThat Make Products\nUnforgettable",
        description: "Make every product stand out with high-quality custom labels designed for impact, clarity, and shelf appeal."
    }
];

defaultSlides.forEach((slide, idx) => slide.displayOrder = idx + 1);

const runSeed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const count = await HeroSlide.countDocuments();
        if (count === 0) {
            await HeroSlide.insertMany(defaultSlides);
            console.log("Seeded hero slides.");
        } else {
            console.log("Already seeded.");
        }
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

runSeed();
