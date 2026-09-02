import { useState, useEffect, useMemo } from "react";
import { FiEdit2, FiTrash2, FiSearch, FiPlus, FiImage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { blogService } from "../../services/blogService";
import DeleteModal from "../../components/common/modal/DeleteModal";

const Blogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const res = await blogService.getAllBlogs();
            if (Array.isArray(res)) {
                setBlogs(res);
            } else if (res && res.blogs) {
                setBlogs(res.blogs);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredBlogs = useMemo(() => {
        return blogs.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [blogs, search]);

    const handleOpenAdd = () => {
        navigate("/blogs/add");
    };

    const handleOpenEdit = (blog) => {
        navigate(`/blogs/edit/${blog._id}`);
    };

    const handleDeleteClick = (blog) => {
        setSelectedBlog(blog);
        setDeleteOpen(true);
    };

    const handleDelete = async () => {
        try {
            setFormLoading(true);
            await blogService.deleteBlog(selectedBlog._id);
            setDeleteOpen(false);
            fetchBlogs();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Delete failed.");
        } finally {
            setFormLoading(false);
        }
    };

    // Date formatter
    const formatDate = (dateValue) => {
        if (!dateValue) return "N/A";
        const date = new Date(dateValue);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white">Blogs</h1>
                    <p className="mt-2 text-slate-400">Manage all blog posts here.</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600 shadow-xl shadow-sky-500/20"
                >
                    <FiPlus size={20} />
                    Add Blog
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center rounded-2xl border border-white/10 bg-[#101B2D] p-4">
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 focus-within:border-sky-500 transition">
                    <FiSearch className="text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                    />
                </div>
            </div>

            {/* Blog Table */}
            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#101B2D]">
                <div className="hidden lg:block overflow-x-auto w-full">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="border-b border-white/10">
                            <tr className="text-left text-slate-400">
                                <th className="py-5 pl-6 whitespace-nowrap w-24">Image</th>
                                <th className="whitespace-nowrap">Title</th>
                                <th className="whitespace-nowrap">Date</th>
                                <th className="whitespace-nowrap">Status</th>
                                <th className="text-center whitespace-nowrap px-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center text-slate-500">
                                        Loading blogs...
                                    </td>
                                </tr>
                            )}
                            {!loading && filteredBlogs.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center text-slate-500">
                                        No blogs found.
                                    </td>
                                </tr>
                            )}
                            {!loading && filteredBlogs.map((item) => (
                                <tr key={item._id} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="py-5 pl-6">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} className="h-12 w-12 rounded-xl object-cover bg-white/5 border border-white/10" />
                                        ) : (
                                            <div className="h-12 w-12 rounded-xl bg-white/5 flex flex-col items-center justify-center text-slate-500 border border-white/10">
                                                <FiImage size={16} className="mb-1 opacity-50" />
                                            </div>
                                        )}
                                    </td>
                                    <td className="font-semibold text-white truncate max-w-[250px]">{item.title}</td>
                                    <td className="text-slate-400">{formatDate(item.publishedAt || item.createdAt)}</td>
                                    <td>
                                        <span
                                            className={`rounded-full px-4 py-2 text-sm ${item.status === "published"
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-yellow-500/20 text-yellow-500"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => handleOpenEdit(item)}
                                                className="rounded-xl bg-yellow-500/20 p-3 text-yellow-400 hover:bg-yellow-500 hover:text-white transition"
                                            >
                                                <FiEdit2 />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(item)}
                                                className="rounded-xl bg-red-500/20 p-3 text-red-400 hover:bg-red-500 hover:text-white transition"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View */}
                <div className="grid grid-cols-1 gap-4 p-4 lg:hidden">
                    {loading && <div className="py-10 text-center text-slate-500">Loading blogs...</div>}
                    {!loading && filteredBlogs.length === 0 && <div className="py-10 text-center text-slate-500">No blogs found.</div>}
                    {!loading && filteredBlogs.map((item) => (
                        <div key={item._id} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {item.image ? (
                                    <img src={item.image} alt={item.title} className="h-16 w-16 rounded-xl object-cover bg-white/5 border border-white/10 shrink-0" />
                                ) : (
                                    <div className="h-16 w-16 rounded-xl bg-white/5 flex flex-col items-center justify-center text-slate-500 border border-white/10 shrink-0">
                                        <FiImage size={20} className="mb-1 opacity-50" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-bold text-white text-[15px] leading-snug mb-1">{item.title}</p>
                                    <p className="text-xs text-slate-400 mb-2">{formatDate(item.publishedAt || item.createdAt)}</p>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === "published"
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-yellow-500/20 text-yellow-500"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 shrink-0">
                                <button
                                    onClick={() => handleOpenEdit(item)}
                                    className="rounded-xl bg-yellow-500/10 p-3 text-yellow-400 hover:bg-yellow-500 hover:text-white transition"
                                >
                                    <FiEdit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(item)}
                                    className="rounded-xl bg-red-500/10 p-3 text-red-400 hover:bg-red-500 hover:text-white transition"
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delete Modal */}
            <DeleteModal
                isOpen={deleteOpen}
                title="Delete Blog"
                message={`Are you sure you want to delete "${selectedBlog?.title}"?`}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDelete}
                loading={formLoading}
            />
        </div>
    );
};

export default Blogs;
