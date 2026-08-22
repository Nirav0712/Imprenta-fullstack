import { FiImage, FiUploadCloud } from "react-icons/fi";

const CategoryBasicInfo = ({
    name, setName,
    description, setDescription,
    status, setStatus,
    imageFile, setImageFile,
    previewImage, setPreviewImage
}) => {

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        if (!validTypes.includes(file.type)) {
            alert("Unsupported file type. Please upload a PNG, JPG, or WEBP.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("File too large. Maximum size is 5MB.");
            return;
        }

        setImageFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    return (
        <section className="rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">Basic Information</h2>
                <p className="mt-2 text-slate-400">Manage standard category details.</p>
            </div>

            <div className="grid gap-6">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-400">Category Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                        placeholder="e.g. Center Sealed Packaging"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-400">Description</label>
                    <textarea
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 resize-none"
                        placeholder="Describe what goes inside this category..."
                    ></textarea>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-400">Cover Image</label>
                        <div className="mt-2 flex items-center gap-6 p-4 rounded-2xl border border-white/5 bg-[#0A1220]">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#08111F]">
                                {previewImage ? (
                                    <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                                ) : (
                                    <FiImage size={28} className="text-slate-500" />
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="cursor-pointer flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2 px-4 text-xs font-semibold text-white transition hover:bg-white/10 w-fit">
                                    <FiUploadCloud size={16} />
                                    <span>Choose File</span>
                                    <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleImageChange} />
                                </label>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Max 5MB (JPG, PNG)</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-400">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 h-[52px]"
                        >
                            <option value="active">Active (Visible)</option>
                            <option value="inactive">Inactive (Hidden)</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryBasicInfo;
