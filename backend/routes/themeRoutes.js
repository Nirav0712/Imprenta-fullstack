import express from "express";
import { getTheme, updateTheme } from "../controllers/themeController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getTheme).put(protect, adminOnly, updateTheme);

export default router;
