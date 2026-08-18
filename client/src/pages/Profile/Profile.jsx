import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiPhone, FiCheckCircle } from "react-icons/fi";

const Profile = () => {
    const { user, isAuthenticated, loading, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        companyName: "",
        password: ""
    });

    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!loading && !isAuthenticated) navigate("/login");
        if (isAuthenticated && user) {
            setFormData({
                name: user.name || "",
                phone: user.phone || "",
                companyName: user.companyName || "",
                password: ""
            });
        }
    }, [isAuthenticated, loading, navigate, user]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateProfile(formData);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <section className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-white">My Profile</h1>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Full Name</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-14 rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-sky-500" />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Email Address</label>
                                <input type="email" value={user.email} disabled className="w-full h-14 rounded-xl border border-white/10 bg-white/5 px-4 text-slate-500 outline-none cursor-not-allowed" />
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Phone Number</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full h-14 rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-sky-500" />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Company Name (Optional)</label>
                                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full h-14 rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-sky-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">New Password (leave blank to keep current)</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full h-14 rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-sky-500" />
                        </div>
                        <button disabled={isSaving} type="submit" className="h-14 px-8 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition disabled:opacity-50 mt-4">
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
export default Profile;
