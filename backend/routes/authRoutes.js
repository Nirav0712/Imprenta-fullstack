import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getCart,
  updateCart,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register

router.post("/register", registerUser);

// Login

router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

router.get("/cart", protect, getCart);
router.put("/cart", protect, updateCart);

import { getUsers, updateUserRole, deleteUser } from "../controllers/authController.js";
import { adminOnly } from "../middleware/authMiddleware.js";

router.get("/users", protect, adminOnly, getUsers);
router.put("/users/:id", protect, adminOnly, updateUserRole);
router.delete("/users/:id", protect, adminOnly, deleteUser);

export default router;