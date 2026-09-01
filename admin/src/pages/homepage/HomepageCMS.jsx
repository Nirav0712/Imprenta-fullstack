import { useState, useEffect } from "react";
import { FiSave } from "react-icons/fi";
import { homeService } from "../../services/homeService";
import { uploadService } from "../../services/uploadService";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";

const HomepageCMS = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        heroBadge: "",
        heroTitle: "",
        heroSubtitle: "",
        heroImage: "",
        servicesTitle: "",
        servicesDescription: "",
        newsletterEnabled: true,
        newsletterHeading: "Hey",
        newsletterDescription: "Get updates.",
        newsletterButtonText: "Submit",
        newsletterButtonLink: "#",
        newsletterImage: "",
        active: true
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await homeService.getHomePageData();
            if (res?.data) {
                setForm(prev => ({ ...prev, ...res.data }));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setSaving(true);
            const response = await uploadService.uploadImage(file);
            setForm((prev) => ({ ...prev, newsletterImage: response.image.url }));
        } catch (error) {
            console.error(error);
            alert("Image upload failed");
        } finally {
            setSaving(false);
        }
    };

    const handleHeroImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setSaving(true);
            const response = await uploadService.uploadImage(file);
            setForm((prev) => ({ ...prev, heroImage: response.image.url }));
        } catch (error) {
            console.error(error);
            alert("Image upload failed");
        } finally {
            setSaving(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await homeService.updateHomePageData(form);
            alert("Homepage content updated successfully.");
            fetchData();
        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.message || "Failed to save.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white">Homepage CMS</h1>
                    <p className="mt-2 text-slate-400">Manage dynamic sections of your client homepage.</p>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saving || loading}
                    className="flex items-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600 shadow-xl shadow-sky-500/20 disabled:opacity-50"
                >
                    <FiSave size={20} />
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-500">Loading CMS Data...</div>
            ) : (
                <div className="grid gap-8 xl:grid-cols-[2fr_1fr]">
                    <form className="space-y-6" id="cms-form">
                        <section className="rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Hero Section</h2>
                            <div className="space-y-5">
                                {/* Image Upload */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Hero Image</label>
                                    {form.heroImage ? (
                                        <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-white/10">
                                            <img src={form.heroImage} alt="Hero" className="w-full h-40 object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setForm({ ...form, heroImage: "" })}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="relative w-full max-w-sm border-2 border-dashed border-white/10 rounded-xl bg-[#08111F] hover:border-sky-500 transition-colors p-6 flex flex-col items-center justify-center cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={handleHeroImageUpload}
                                                disabled={saving}
                                            />
                                            <FiUploadCloud size={30} className="text-sky-400 mb-2" />
                                            <span className="text-slate-400 text-sm font-semibold">Upload Image</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Badge / Eyebrow Text</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.heroBadge || ""}
                                        onChange={(e) => setForm({ ...form, heroBadge: e.target.value })}
                                        placeholder="Premium Paper Packaging Solutions"
                                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Hero Title / Tagline</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.heroTitle || ""}
                                        onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
                                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Hero Subtitle</label>
                                    <textarea
                                        rows="3"
                                        value={form.heroSubtitle || ""}
                                        onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
                                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                    ></textarea>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Services Section</h2>
                            <div className="space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Section Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.servicesTitle || ""}
                                        onChange={(e) => setForm({ ...form, servicesTitle: e.target.value })}
                                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Short Description</label>
                                    <textarea
                                        rows="2"
                                        value={form.servicesDescription || ""}
                                        onChange={(e) => setForm({ ...form, servicesDescription: e.target.value })}
                                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                    ></textarea>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Newsletter Section</h2>
                                <label className="flex cursor-pointer items-center gap-3">
                                    <span className="text-sm font-semibold text-slate-400">Enabled</span>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={form.newsletterEnabled || false}
                                            onChange={(e) => setForm({ ...form, newsletterEnabled: e.target.checked })}
                                        />
                                        <div className="h-6 w-11 rounded-full bg-slate-700 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                    </div>
                                </label>
                            </div>

                            <div className="space-y-5">
                                {/* Image Upload */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Newsletter Image</label>
                                    {form.newsletterImage ? (
                                        <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-white/10">
                                            <img src={form.newsletterImage} alt="Newsletter" className="w-full h-40 object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setForm({ ...form, newsletterImage: "" })}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="relative w-full max-w-sm border-2 border-dashed border-white/10 rounded-xl bg-[#08111F] hover:border-sky-500 transition-colors p-6 flex flex-col items-center justify-center cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={handleImageUpload}
                                                disabled={saving}
                                            />
                                            <FiUploadCloud size={30} className="text-sky-400 mb-2" />
                                            <span className="text-slate-400 text-sm font-semibold">Upload Image</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Heading</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.newsletterHeading || ""}
                                        onChange={(e) => setForm({ ...form, newsletterHeading: e.target.value })}
                                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Description</label>
                                    <textarea
                                        rows="3"
                                        value={form.newsletterDescription || ""}
                                        onChange={(e) => setForm({ ...form, newsletterDescription: e.target.value })}
                                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                    ></textarea>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-400">Button Text</label>
                                        <input
                                            type="text"
                                            value={form.newsletterButtonText || ""}
                                            onChange={(e) => setForm({ ...form, newsletterButtonText: e.target.value })}
                                            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-400">Button Link</label>
                                        <input
                                            type="text"
                                            value={form.newsletterButtonLink || ""}
                                            onChange={(e) => setForm({ ...form, newsletterButtonLink: e.target.value })}
                                            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>

                    <div className="space-y-8">
                        <section className="rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-8">
                            <h2 className="text-lg font-bold text-white mb-4">CMS Status</h2>
                            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
                                <div>
                                    <div className="font-semibold text-white">Active Status</div>
                                    <div className="text-sm border-0 text-slate-400">Live on Site</div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        checked={form.active || false}
                                        onChange={(e) => setForm({ ...form, active: e.target.checked })}
                                    />
                                    <div className="h-6 w-11 rounded-full bg-slate-700 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </div>
                            </label>
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomepageCMS;
