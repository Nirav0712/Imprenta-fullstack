import { useState, useEffect, useMemo } from "react";
import { FiEdit2, FiTrash2, FiSearch, FiPlus, FiImage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { categoryService } from "../../services/categoryService";
import DeleteModal from "../../components/common/modal/DeleteModal";

import category1 from "../../assets/images/categories/category-1.png";
import category2 from "../../assets/images/categories/category-2.png";
import category3 from "../../assets/images/categories/category-3.png";
import category4 from "../../assets/images/categories/category-4.png";
import category5 from "../../assets/images/categories/category-5.png";
import category6 from "../../assets/images/categories/category-6.png";

const imageMap = {
    "category-1.png": category1,
    "category-2.png": category2,
    "category-3.png": category3,
    "category-4.png": category4,
    "category-5.png": category5,
    "category-6.png": category6,
};

const getSrcFromMap = (path) => {
    if (!path) return null;
    const filename = path.split(/[\\/]/).pop();
    return imageMap[filename] || null;
};

const Categories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    const [editingOrder, setEditingOrder] = useState(null);
    const [orderInput, setOrderInput] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await categoryService.getCategories();
            if (Array.isArray(res)) {
                setCategories(res);
            } else if (res && res.categories) {
                setCategories(res.categories);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCategories = useMemo(() => {
        return categories.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [categories, search]);

    const handleOpenAdd = () => {
        navigate("/categories/add");
    };

    const handleOpenEdit = (cat) => {
        navigate(`/categories/edit/${cat._id}`);
    };

    const handleDeleteClick = (cat) => {
        setSelectedCategory(cat);
        setDeleteOpen(true);
    };

    const handleDelete = async () => {
        try {
            setFormLoading(true);
            await categoryService.deleteCategory(selectedCategory._id);
            setDeleteOpen(false);
            fetchCategories();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Delete failed.");
        } finally {
            setFormLoading(false);
        }
    };

    const handleOrderDoubleClick = (item) => {
        setEditingOrder(item._id);
        setOrderInput(item.order || "");
    };

    const handleOrderSubmit = async (item) => {
        if (formLoading) return;
        if (orderInput && orderInput !== String(item.order)) {
            try {
                setFormLoading(true);
                await categoryService.reorderCategory(item._id, orderInput);
                await fetchCategories();
            } catch (error) {
                console.error("Error reordering category:", error);
                alert(error.response?.data?.message || error.message || "Failed to reorder");
            } finally {
                setFormLoading(false);
                setEditingOrder(null);
            }
        } else {
            setEditingOrder(null);
        }
    };

    const handleOrderKeyDown = (e, item) => {
        if (e.key === "Enter") {
            handleOrderSubmit(item);
        } else if (e.key === "Escape") {
            setEditingOrder(null);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white">Categories</h1>
                    <p className="mt-2 text-slate-400">Manage all website categories from one place.</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600 shadow-xl shadow-sky-500/20"
                >
                    <FiPlus size={20} />
                    Add Category
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center rounded-2xl border border-white/10 bg-[#101B2D] p-4">
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 focus-within:border-sky-500 transition">
                    <FiSearch className="text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                    />
                </div>
            </div>

            {/* Category Table */}
            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#101B2D]">
                {/* Desktop View */}
                <div className="hidden lg:block overflow-x-auto w-full">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="border-b border-white/10">
                            <tr className="text-left text-slate-400">
                                <th className="px-6 py-5 whitespace-nowrap w-24">Order #</th>
                                <th className="py-5 whitespace-nowrap">Image</th>
                                <th className="whitespace-nowrap">Name</th>
                                <th className="whitespace-nowrap">Slug</th>
                                <th className="whitespace-nowrap">Status</th>
                                <th className="text-center whitespace-nowrap px-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center text-slate-500">
                                        Loading categories...
                                    </td>
                                </tr>
                            )}
                            {!loading && filteredCategories.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center text-slate-500">
                                        No categories found.
                                    </td>
                                </tr>
                            )}
                            {!loading && filteredCategories.map((item, index) => (
                                <tr key={item._id} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="px-6 py-5" onDoubleClick={() => handleOrderDoubleClick(item)}>
                                        {editingOrder === item._id ? (
                                            <input
                                                type="number"
                                                autoFocus
                                                value={orderInput}
                                                onChange={(e) => setOrderInput(e.target.value)}
                                                onKeyDown={(e) => handleOrderKeyDown(e, item)}
                                                onBlur={() => handleOrderSubmit(item)}
                                                className="w-16 rounded bg-[#08111F] px-2 py-1 text-white text-center border border-sky-500 outline-none"
                                            />
                                        ) : (
                                            <div className="w-16 text-center cursor-pointer font-bold text-sky-400 bg-sky-500/10 py-1 rounded">
                                                {item.order || index + 1}
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-5">
                                        {getSrcFromMap(item.image) ? (
                                            <img src={getSrcFromMap(item.image)} alt={item.name} className="h-12 w-12 rounded-xl object-contain bg-white/5 border border-white/10 p-1" />
                                        ) : item.image && !getSrcFromMap(item.image) ? (
                                            <img src={item.image} alt={item.name} className="h-12 w-12 rounded-xl object-cover bg-white/5 border border-white/10" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                        ) : null}
                                        {(!item.image || (!getSrcFromMap(item.image) && !item.image)) && (
                                            <div className="h-12 w-12 rounded-xl bg-white/5 flex flex-col items-center justify-center text-slate-500 border border-white/10" style={item.image && !getSrcFromMap(item.image) ? { display: 'none' } : {}}>
                                                <FiImage size={16} className="mb-1 opacity-50" />
                                                <span className="text-[10px]">No Img</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="font-semibold text-white">{item.name}</td>
                                    <td className="text-slate-400">{item.slug}</td>
                                    <td>
                                        <span
                                            className={`rounded-full px-4 py-2 text-sm ${item.status === "active"
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-red-500/20 text-red-400"
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
                    {loading && <div className="py-10 text-center text-slate-500">Loading categories...</div>}
                    {!loading && filteredCategories.length === 0 && <div className="py-10 text-center text-slate-500">No categories found.</div>}
                    {!loading && filteredCategories.map((item, index) => (
                        <div key={item._id} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-center" onDoubleClick={() => handleOrderDoubleClick(item)}>
                                    {editingOrder === item._id ? (
                                        <input
                                            type="number"
                                            autoFocus
                                            value={orderInput}
                                            onChange={(e) => setOrderInput(e.target.value)}
                                            onKeyDown={(e) => handleOrderKeyDown(e, item)}
                                            onBlur={() => handleOrderSubmit(item)}
                                            className="w-12 rounded bg-[#08111F] p-1 text-white text-center border border-sky-500 outline-none text-sm"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 flex items-center justify-center cursor-pointer font-bold text-sky-400 bg-sky-500/10 rounded-full mb-1">
                                            {item.order || index + 1}
                                        </div>
                                    )}
                                </div>
                                {getSrcFromMap(item.image) ? (
                                    <img src={getSrcFromMap(item.image)} alt={item.name} className="h-16 w-16 rounded-xl object-contain bg-white/5 border border-white/10 p-1 shrink-0" />
                                ) : item.image && !getSrcFromMap(item.image) ? (
                                    <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover bg-white/5 border border-white/10 shrink-0" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                ) : null}
                                {(!item.image || (!getSrcFromMap(item.image) && !item.image)) && (
                                    <div className="h-16 w-16 rounded-xl bg-white/5 flex flex-col items-center justify-center text-slate-500 border border-white/10 shrink-0" style={item.image && !getSrcFromMap(item.image) ? { display: 'none' } : {}}>
                                        <FiImage size={20} className="mb-1 opacity-50" />
                                        <span className="text-[10px]">No Img</span>
                                    </div>
                                )}
                                <div>
                                    <p className="font-bold text-white text-lg">{item.name}</p>
                                    <p className="text-sm text-slate-400 mb-2">{item.slug}</p>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === "active"
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
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
                title="Delete Category"
                message={`Are you sure you want to delete "${selectedCategory?.name}"?`}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDelete}
                loading={formLoading}
            />
        </div>
    );
};

export default Categories;
