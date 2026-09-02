import Blog from "../models/Blog.js";
import slugify from "../utils/slugify.js";

// @desc Get all blogs (Public / Admin)
// @route GET /api/blogs
export const getBlogs = async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};

        if (status) {
            filter.status = status; // e.g. 'published'
        }

        const blogs = await Blog.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: blogs.length,
            blogs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc Get single blog by ID
// @route GET /api/blogs/:id
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        res.status(200).json({
            success: true,
            blog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc Get single blog by Slug
// @route GET /api/blogs/slug/:slug
export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        // Only allow viewing published blogs if not authenticated, but simplified filtering can be done on frontend

        res.status(200).json({
            success: true,
            blog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc Create blog
// @route POST /api/blogs
// @access Admin
export const createBlog = async (req, res) => {
    try {
        const { title, excerpt, content, image, status } = req.body;

        if (!title || !excerpt || !content) {
            return res.status(400).json({
                success: false,
                message: "Title, excerpt, and content are required",
            });
        }

        const slug = slugify(title);

        const slugExists = await Blog.findOne({ slug });
        if (slugExists) {
            return res.status(400).json({
                success: false,
                message: "A blog with a similar title already exists. Please change the title.",
            });
        }

        const blog = await Blog.create({
            title,
            slug,
            excerpt,
            content,
            image,
            status: status || "draft",
        });

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc Update blog
// @route PUT /api/blogs/:id
// @access Admin
export const updateBlog = async (req, res) => {
    try {
        const { title, excerpt, content, image, status } = req.body;

        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        let slug = blog.slug;
        if (title && title !== blog.title) {
            slug = slugify(title);
            const slugExists = await Blog.findOne({ slug, _id: { $ne: blog._id } });
            if (slugExists) {
                return res.status(400).json({
                    success: false,
                    message: "A blog with a similar title already exists.",
                });
            }
        }

        blog.title = title || blog.title;
        blog.slug = slug;
        blog.excerpt = excerpt || blog.excerpt;
        blog.content = content || blog.content;
        blog.image = image !== undefined ? image : blog.image;
        blog.status = status || blog.status;

        await blog.save();

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc Delete blog
// @route DELETE /api/blogs/:id
// @access Admin
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        await blog.deleteOne();

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
