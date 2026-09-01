import { useState, useEffect } from "react";
import { FiPlus, FiSave, FiTrash2, FiEdit2, FiUploadCloud, FiCheckCircle } from "react-icons/fi";
import { heroSlideService } from "../../services/heroSlideService";
import { uploadService } from "../../services/uploadService";

const HeroSliderCMS = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingSlide, setEditingSlide] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            setLoading(true);
            const res = await heroSlideService.getHeroSlides();
            if (res?.data) {
                setSlides(res.data);
            }
        } catch (error) {
            console.error("Failed to load slides", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNew = () => {
        setEditingSlide({
            badge: "",
            heading: "",
            description: "",
            image: "",
            primaryButtonText: "Request a Sample",
            primaryButtonLink: "/request-wizard",
            secondaryButtonText: "Request a Quote",
            secondaryButtonLink: "/request-wizard",
            isActive: true,
            displayOrder: slides.length + 1
        });
    };

    const handleEdit = (slide) => {
        setEditingSlide({ ...slide });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this slide?")) return;
        try {
            await heroSlideService.deleteHeroSlide(id);
            alert("Slide deleted successfully.");
            fetchSlides();
        } catch (error) {
            console.error(error);
            alert("Failed to delete slide.");
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setSaving(true);
            const response = await uploadService.uploadImage(file);
            setEditingSlide((prev) => ({ ...prev, image: response.image.url }));
        } catch (error) {
            console.error(error);
            alert("Image upload failed");
        } finally {
            setSaving(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            if (editingSlide._id) {
                await heroSlideService.updateHeroSlide(editingSlide._id, editingSlide);
                alert("Slide updated successfully.");
            } else {
                await heroSlideService.createHeroSlide(editingSlide);
                alert("Slide created successfully.");
            }
            setEditingSlide(null);
            fetchSlides();
        } catch (error) {
            console.error(error);
            alert("Failed to save slide.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white">Hero Slider CMS</h1>
                    <p className="mt-2 text-slate-400">Manage all slides for the homepage Hero section.</p>
                </div>
                {!editingSlide && (
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600 shadow-xl shadow-sky-500/20"
                    >
                        <FiPlus size={20} />
                        Add New Slide
                    </button>
                )}
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-500">Loading slides...</div>
            ) : editingSlide ? (
                /* Editor Card */
                <form onSubmit={handleSave} className="rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                        <h2 className="text-2xl font-bold text-white">{editingSlide._id ? "Edit Slide" : "New Slide"}</h2>
                        <button type="button" onClick={() => setEditingSlide(null)} className="text-slate-400 hover:text-white font-semibold flex items-center gap-2">
                            Cancel
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-400">Status</label>
                                <label className="flex cursor-pointer items-center gap-3">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={editingSlide.isActive !== false}
                                            onChange={(e) => setEditingSlide({ ...editingSlide, isActive: e.target.checked })}
                                        />
                                        <div className="h-6 w-11 rounded-full bg-slate-700 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-sky-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                    </div>
                                    <span className="text-sm font-semibold text-white">{editingSlide.isActive ? "Active" : "Inactive"}</span>
                                </label>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-400">Display Order</label>
                                <input
                                    type="number"
                                    required
                                    value={editingSlide.displayOrder}
                                    onChange={(e) => setEditingSlide({ ...editingSlide, displayOrder: parseFloat(e.target.value) })}
                                    className="w-full max-w-[120px] rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-400">Badge / Eyebrow Text</label>
                                <input
                                    type="text"
                                    value={editingSlide.badge || ""}
                                    onChange={(e) => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                                    className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-400">Heading (Supports newlines)</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={editingSlide.heading || ""}
                                    placeholder="Line 1&#10;Line 2 (Highlight)&#10;Line 3"
                                    onChange={(e) => setEditingSlide({ ...editingSlide, heading: e.target.value })}
                                    className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                ></textarea>
                                <p className="text-xs text-slate-500 mt-1">Press enter to create a new line. The 2nd line automatically becomes blue.</p>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-400">Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={editingSlide.description || ""}
                                    onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
                                    className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                ></textarea>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-400">Hero Image</label>
                                {editingSlide.image ? (
                                    <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
                                        <img src={editingSlide.image} alt="Hero" className="w-full h-48 object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setEditingSlide({ ...editingSlide, image: "" })}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="relative w-full border-2 border-dashed border-white/10 rounded-xl bg-[#08111F] hover:border-sky-500 transition-colors p-10 flex flex-col items-center justify-center cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleImageUpload}
                                            disabled={saving}
                                        />
                                        <FiUploadCloud size={32} className="text-sky-400 mb-2" />
                                        <span className="text-slate-400 text-sm font-semibold">Upload Slide Image</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Primary CTA Text</label>
                                    <input
                                        type="text"
                                        value={editingSlide.primaryButtonText || ""}
                                        onChange={(e) => setEditingSlide({ ...editingSlide, primaryButtonText: e.target.value })}
                                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Primary CTA Link</label>
                                    <input
                                        type="text"
                                        value={editingSlide.primaryButtonLink || ""}
                                        onChange={(e) => setEditingSlide({ ...editingSlide, primaryButtonLink: e.target.value })}
                                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Secondary CTA Text</label>
                                    <input
                                        type="text"
                                        value={editingSlide.secondaryButtonText || ""}
                                        onChange={(e) => setEditingSlide({ ...editingSlide, secondaryButtonText: e.target.value })}
                                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Secondary CTA Link</label>
                                    <input
                                        type="text"
                                        value={editingSlide.secondaryButtonLink || ""}
                                        onChange={(e) => setEditingSlide({ ...editingSlide, secondaryButtonLink: e.target.value })}
                                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 rounded-2xl bg-sky-500 px-8 py-3 font-semibold text-white transition hover:bg-sky-600 shadow-xl disabled:opacity-50"
                        >
                            <FiSave size={20} />
                            {saving ? "Saving..." : "Save Configuration"}
                        </button>
                    </div>
                </form>

            ) : (
                /* Slides List */
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {slides.length === 0 && (
                        <div className="col-span-full py-16 text-center text-slate-500 border border-white/10 rounded-3xl bg-[#101B2D]">
                            No slides found. Click "Add New Slide" to get started.
                        </div>
                    )}
                    {slides.map(slide => (
                        <div key={slide._id} className={`flex flex-col rounded-3xl border ${slide.isActive ? 'border-white/10 bg-[#101B2D]' : 'border-red-500/20 bg-red-500/5'} overflow-hidden relative`}>
                            {/* Order indicator */}
                            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold z-10 border border-white/10">
                                Order: {slide.displayOrder}
                            </div>
                            <div className="h-40 bg-[#08111F] relative">
                                {slide.image ? (
                                    <img src={slide.image} className="w-full h-full object-cover" alt="" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">No Image</div>
                                )}
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <span className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">{slide.badge || "-"}</span>
                                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{slide.heading.split('\n')[0] || "No heading"}</h3>
                                <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-1">{slide.description}</p>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-md ${slide.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {slide.isActive ? "Active" : "Inactive"}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleEdit(slide)} className="p-2 text-sky-400 hover:bg-sky-500/20 rounded-lg transition" title="Edit">
                                            <FiEdit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(slide._id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition" title="Delete">
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HeroSliderCMS;
