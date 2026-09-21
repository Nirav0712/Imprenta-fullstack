import express from "express";
import {
  getPublicExpos,
  getPublicExpoBySlug,
  submitExpoLead,
  getAdminExpos,
  getAdminExpoById,
  createExpo,
  updateExpo,
  deleteExpo,
  duplicateExpo,
} from "../controllers/expoController.js";
import { protect, adminOnly, optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/public", getPublicExpos);
router.get("/public/:slug", optionalAuth, getPublicExpoBySlug);
router.post("/public/:slug/submit", submitExpoLead);

// Admin Routes (Protected)
router.get("/", protect, adminOnly, getAdminExpos);
router.post("/", protect, adminOnly, createExpo);
router.get("/:id", protect, adminOnly, getAdminExpoById);
router.put("/:id", protect, adminOnly, updateExpo);
router.delete("/:id", protect, adminOnly, deleteExpo);
router.post("/:id/duplicate", protect, adminOnly, duplicateExpo);

export default router;
