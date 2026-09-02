import express from "express";
import {
    getBlogs,
    getBlogById,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
} from "../controllers/blogController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getBlogs).post(protect, adminOnly, createBlog);
router.route("/slug/:slug").get(getBlogBySlug);
router.route("/:id").get(getBlogById).put(protect, adminOnly, updateBlog).delete(protect, adminOnly, deleteBlog);

export default router;
