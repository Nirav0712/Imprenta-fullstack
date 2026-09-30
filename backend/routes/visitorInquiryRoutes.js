import express from "express";
import {
  createVisitorInquiry,
  getVisitorInquiries,
  getVisitorInquiryById,
  updateVisitorInquiryStatus,
  deleteVisitorInquiry,
} from "../controllers/visitorInquiryController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to submit inquiry from website footer
router.post("/", createVisitorInquiry);

// Protected Admin routes
router.get("/", protect, adminOnly, getVisitorInquiries);
router.get("/:id", protect, adminOnly, getVisitorInquiryById);
router.put("/:id", protect, adminOnly, updateVisitorInquiryStatus);
router.delete("/:id", protect, adminOnly, deleteVisitorInquiry);

export default router;
