import express from "express";
import { getHomePageData, updateHomePageData } from "../controllers/homeController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getHomePageData);
router.put("/", protect, adminOnly, updateHomePageData);

export default router;
