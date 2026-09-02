import { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { blogService } from "../../services/blogService";
import BlogForm from "../../components/blogs/BlogForm";

const EditBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await blogService.getBlogById(id);
                setBlog(res.blog || res);
            } catch (error) {
                console.error(error);
                alert("Failed to load blog");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBlog();
    }, [id]);

    if (loading) {
        return <div className="text-white py-12 text-center text-lg">Loading blog...</div>;
    }

    if (!blog) {
        return <div className="text-red-400 py-12 text-center text-lg font-bold">Blog not found.</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300"
                    >
                        <FiArrowLeft />
                        Back to Blogs
                    </Link>
                    <h1 className="mt-4 text-4xl font-black text-white">Edit Blog</h1>
                    <p className="mt-2 text-slate-400">Update existing blog content.</p>
                </div>
            </div>

            <BlogForm isEdit={true} initialData={blog} blogId={blog._id || id} />
        </div>
    );
};

export default EditBlog;
