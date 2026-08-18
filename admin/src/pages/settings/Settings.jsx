import { useState, useEffect } from "react";
import { FiSave } from "react-icons/fi";
import { settingService } from "../../services/settingService";

const Settings = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        companyName: "", email: "", phone: "", address: "", whatsapp: "",
        facebook: "", instagram: "", linkedin: "", youtube: ""
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const res = await settingService.getSettings();
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
            await settingService.updateSettings(form);
            alert("Settings updated successfully.");
            fetchSettings();
        } catch (error) {
            console.error(error);
            alert("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white">Settings</h1>
                    <p className="mt-2 text-slate-400">Configure core website contact variables and branding.</p>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saving || loading}
                    className="flex items-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600 shadow-xl shadow-sky-500/20 disabled:opacity-50"
                >
                    <FiSave size={20} />
                    {saving ? "Saving..." : "Save Settings"}
                </button>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-500">Loading Configuration...</div>
            ) : (
                <div className="grid gap-8 xl:grid-cols-[2fr_1fr]">
                    <form className="space-y-6">
                        <section className="rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">General Information</h2>
                            <div className="space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Company Name</label>
                                    <input type="text" value={form.companyName || ""} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-400">Official Email</label>
                                        <input type="email" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500" />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-400">Phone</label>
                                        <input type="text" value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500" />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Office Address</label>
                                    <textarea rows="3" value={form.address || ""} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"></textarea>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Social Networks</h2>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">WhatsApp Number</label>
                                    <input type="text" value={form.whatsapp || ""} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500" />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Facebook URL</label>
                                    <input type="text" value={form.facebook || ""} onChange={(e) => setForm({ ...form, facebook: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500" />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">Instagram URL</label>
                                    <input type="text" value={form.instagram || ""} onChange={(e) => setForm({ ...form, instagram: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500" />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-400">LinkedIn URL</label>
                                    <input type="text" value={form.linkedin || ""} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500" />
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Settings;
