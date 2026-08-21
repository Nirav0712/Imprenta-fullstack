import express from "express";



import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  reorderCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

/*
  Category Routes
*/

// Create Category
router.post(
  "/",
  protect,
  adminOnly,
  createCategory
);

// Get All Categories
router.get(
  "/",
  getCategories
);

// Reorder Categories
router.patch(
  "/reorder",
  protect,
  adminOnly,
  reorderCategories
);

// Update Category
router.put(
  "/:id",
  protect,
  adminOnly,
  updateCategory
);

// Delete Category
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteCategory
);

export default router;