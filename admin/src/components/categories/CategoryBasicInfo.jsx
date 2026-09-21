import ImageUploadField from "../common/ImageUploadField";

const CategoryBasicInfo = ({
    name, setName,
    description, setDescription,
    status, setStatus,
    imageFile, setImageFile,
    previewImage, setPreviewImage
}) => {

    const handleImageChange = (fileOrUrl, meta) => {
        if (!fileOrUrl) {
            setImageFile(null);
            setPreviewImage("");
            return;
        }

        if (typeof fileOrUrl === "string") {
            setPreviewImage(fileOrUrl);
        } else {
            setImageFile(fileOrUrl);
            setPreviewImage(meta?.previewUrl || URL.createObjectURL(fileOrUrl));
        }
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
                    <div className="mb-2 flex items-center justify-between">
                        <label className="block text-sm font-semibold text-slate-400">Description</label>
                        <span className={`text-xs font-bold ${description?.length >= 500 ? 'text-red-500' : 'text-slate-500'}`}>
                            {(description || "").length} / 500
                        </span>
                    </div>
                    <textarea
                        rows="3"
                        value={description}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val.length <= 500) {
                                setDescription(val);
                            } else {
                                setDescription(val.substring(0, 500));
                            }
                        }}
                        className={`w-full rounded-xl border bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 resize-none ${description?.length >= 500 ? 'border-red-500/50' : 'border-white/10'}`}
                        placeholder="Describe what goes inside this category..."
                    ></textarea>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <ImageUploadField
                            slotKey="CATEGORY_IMAGE"
                            label="Category Cover Image"
                            value={previewImage}
                            onChange={handleImageChange}
                        />
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

