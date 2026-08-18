import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import Product from "./models/Product.js";
import Category from "./models/Category.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const dataDir = path.join(__dirname, "../client/src/data");

const filesToParse = [
    "popularProducts.js",
    "trendingProducts.js",
    "labelsProducts.js",
    "exploreMoreProducts.js",
    "newArrivalsProducts.js",
];

const getArrayFromJs = (filePath) => {
    try {
        let content = fs.readFileSync(filePath, "utf-8");
        const startIndex = content.indexOf("[");
        const endIndex = content.lastIndexOf("];") + 1;
        if (startIndex === -1 || endIndex === 0) return [];

        let arrayStr = content.substring(startIndex, endIndex);
        const parsed = (new Function(`return ${arrayStr}`))();
        return parsed;
    } catch (err) {
        console.error("Error reading file:", filePath, err.message);
        return [];
    }
};

const seedDB = async () => {
    try {
        console.log("Connecting database...");
        await Product.deleteMany();
        await Category.deleteMany();
        console.log("Cleared existing products and categories.");

        const backendUser = new mongoose.Types.ObjectId();
        const coreCategories = [
            { name: "Labels", slug: "labels", description: "Premium quality custom labels", image: "/src/assets/images/categories/category-1.png", status: "active", createdBy: backendUser },
            { name: "Shrink Sleeves", slug: "shrink-sleeves", description: "High quality shrink sleeves", image: "/src/assets/images/categories/category-2.png", status: "active", createdBy: backendUser },
            { name: "Mono Cartons", slug: "mono-cartons", description: "Printed retail mono cartons", image: "/src/assets/images/categories/category-3.png", status: "active", createdBy: backendUser },
            { name: "Seamless Plastic Tubes", slug: "seamless-plastic-tubes", description: "Seamless extrusion tubes", image: "/src/assets/images/categories/category-4.png", status: "active", createdBy: backendUser },
            { name: "Corporate Branding", slug: "corporate-branding", description: "Corporate branding materials", image: "/src/assets/images/categories/category-5.png", status: "active", createdBy: backendUser },
            { name: "Design Services", slug: "design-services", description: "Professional design services", image: "/src/assets/images/categories/category-6.png", status: "active", createdBy: backendUser }
        ];

        const createdCategories = await Category.insertMany(coreCategories);
        const generalCategoryRef = createdCategories[0]._id; // fallback

        const allProducts = [];

        for (let file of filesToParse) {
            const arr = getArrayFromJs(path.join(dataDir, file));
            allProducts.push(...arr);
        }

        const formattedProducts = allProducts.map((p) => {
            const priceNum = p.price ? parseInt(p.price.replace(/[^0-9]/g, '')) || 0 : 0;
            return {
                name: p.title,
                slug: p.id,
                category: generalCategoryRef,
                price: priceNum,
                badge: p.badge || "",
                mainImage: { url: p.image, public_id: p.image || "seed" },
                status: "Published",
                shortDescription: p.unitPrice || ""
            }
        });

        await Product.insertMany(formattedProducts);

        console.log(`Successfully seeded ${formattedProducts.length} products to database.`);
        process.exit();
    } catch (err) {
        console.error("Seed error:", err);
        process.exit(1);
    }
}

seedDB();
