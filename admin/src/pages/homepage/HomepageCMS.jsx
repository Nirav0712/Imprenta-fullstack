import { useState, useEffect } from "react";
import { FiSave } from "react-icons/fi";
import { homeService } from "../../services/homeService";

const HomepageCMS = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        heroTitle: "",
        heroSubtitle: "",
        servicesTitle: "",
        servicesDescription: "",
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
                setForm(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
