import express from "express";
import {
    getHeroSlides,
    createHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    seedHeroSlides
} from "../controllers/heroSlideController.js";
import { protect, adminOnly, optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", optionalAuth, getHeroSlides);
router.post("/seed", protect, adminOnly, seedHeroSlides);
router.post("/", protect, adminOnly, createHeroSlide);
router.put("/:id", protect, adminOnly, updateHeroSlide);
router.delete("/:id", protect, adminOnly, deleteHeroSlide);

export default router;
