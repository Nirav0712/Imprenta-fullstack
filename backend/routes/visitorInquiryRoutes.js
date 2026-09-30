import express from "express";
import multer from "multer";
import {
  createVisitorInquiry,
  getVisitorInquiries,
  getVisitorInquiryById,
  updateVisitorInquiryStatus,
  deleteVisitorInquiry,
} from "../controllers/visitorInquiryController.js";
import { uploadImage } from "../controllers/uploadController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// Public routes for visitor inquiries
router.post("/upload-card", upload.single("image"), uploadImage);
router.post("/", createVisitorInquiry);

// Protected Admin routes
router.get("/", protect, adminOnly, getVisitorInquiries);
router.get("/:id", protect, adminOnly, getVisitorInquiryById);
router.put("/:id", protect, adminOnly, updateVisitorInquiryStatus);
router.delete("/:id", protect, adminOnly, deleteVisitorInquiry);

export default router;
