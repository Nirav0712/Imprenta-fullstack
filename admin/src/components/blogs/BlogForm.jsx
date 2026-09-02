import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSave, FiX } from "react-icons/fi";
import { uploadApi } from "../../api/uploadApi";
import { blogService } from "../../services/blogService";
import BlogBasicInfo from "./BlogBasicInfo";

const BlogForm = ({ isEdit = false, initialData = null, blogId = null }) => {
    const navigate = useNavigate();
    const [formLoading, setFormLoading] = useState(false);

    // States
    const [title, setTitle] = useState(initialData?.title || "");
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [status, setStatus] = useState(initialData?.status || "draft");

    // Image handling
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(initialData?.image || "");
    const [currentImageStr, setCurrentImageStr] = useState(initialData?.image || "");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedTitle = title.trim();
        if (!trimmedTitle) return alert("Blog Title is required");
        if (!excerpt.trim()) return alert("Short Description/Excerpt is required");
        if (!content.trim() && status === "published") return alert("Full Article Content is required for publishing");

        try {
            setFormLoading(true);

            let finalImageUrl = currentImageStr;

            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);
                const uploadRes = await uploadApi.uploadImage(formData);
                if (uploadRes.success) {
                    finalImageUrl = uploadRes.image?.url || uploadRes.url || finalImageUrl;
                } else {
                    throw new Error(uploadRes.message || "Failed to upload image.");
                }
            }

            if (status === "published" && !finalImageUrl && !currentImageStr) {
                return alert("Featured Image is required for publishing");
            }

            const payload = {
                title: trimmedTitle,
                excerpt: excerpt.trim(),
                content,
                status,
                image: finalImageUrl,
            };

            if (isEdit) {
                await blogService.updateBlog(blogId, payload);
                alert("Blog updated successfully!");
                navigate("/blogs");
            } else {
                await blogService.createBlog(payload);
                alert("Blog created successfully!");
                navigate("/blogs");
            }

        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.message || error.message || "Operation failed.");
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-8 xl:grid-cols-[1fr]">
            <div className="space-y-8">
                <BlogBasicInfo
                    title={title} setTitle={setTitle}
                    excerpt={excerpt} setExcerpt={setExcerpt}
                    content={content} setContent={setContent}
                    status={status} setStatus={setStatus}
                    imageFile={imageFile} setImageFile={setImageFile}
                    previewImage={previewImage} setPreviewImage={setPreviewImage}
                />
            </div>

            <div className="sticky bottom-6 rounded-3xl border border-white/10 bg-[#101B2D] p-5 backdrop-blur-xl z-10 w-full mt-4">
                <div className="flex justify-end gap-3">
                    <Link to="/blogs" className="rounded-xl px-6 py-4 font-bold text-slate-400 hover:bg-white/5 hover:text-white transition">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={formLoading}
                        className="flex items-center gap-2 rounded-xl bg-sky-500 px-8 py-4 font-black text-white hover:bg-sky-600 transition disabled:opacity-50"
                    >
                        <FiSave />
                        {formLoading ? "Saving..." : isEdit ? "Update Blog" : "Save Blog"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default BlogForm;
