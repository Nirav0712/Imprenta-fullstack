import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();

// Middleware

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/products", productRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/inquiries", inquiryRoutes);

app.use("/api/homepage", homeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/theme", themeRoutes);
app.use("/api/notifications", notificationRoutes);

// Test Route

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message: "Imprenta Backend API Running 🚀",

  });

});

export default app;