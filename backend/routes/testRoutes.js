import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

router.post("/test-create", async (req, res) => {
    try {
        const blog = await Blog.create({
            title: "Test Blog",
            slug: "test-blog",
            excerpt: "Test excerpt",
            content: "Test content",
        });
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});

export default router;
