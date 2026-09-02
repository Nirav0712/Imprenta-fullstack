import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Blog title is required"],
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String, // URL from storage
            required: false,
        },
        excerpt: {
            type: String,
            required: [true, "Blog excerpt is required"],
            trim: true,
            maxLength: 500,
        },
        content: {
            type: String,
            required: [true, "Blog content is required"],
        },
        author: {
            type: String,
            default: "Admin",
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },
        publishedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
