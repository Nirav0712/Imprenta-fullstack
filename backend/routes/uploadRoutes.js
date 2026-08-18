import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer Memory Storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// -------------------------
// TEST GET ROUTE
// -------------------------
router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Upload Route Working 🚀",
  });
});

// -------------------------
// POST ROUTE: Upload Image
// -------------------------
router.post("/", protect, adminOnly, upload.single("image"), uploadImage);

export default router;