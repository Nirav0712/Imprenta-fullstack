import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import BlogForm from "../../components/blogs/BlogForm";

const AddBlog = () => {
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
                    <h1 className="mt-4 text-4xl font-black text-white">Add Blog</h1>
                    <p className="mt-2 text-slate-400">Create a new blog post.</p>
                </div>
            </div>

            <BlogForm isEdit={false} />
        </div>
    );
};

export default AddBlog;
