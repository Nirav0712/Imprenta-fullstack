import ImageUploadField from "../common/ImageUploadField";

const BlogBasicInfo = ({
    title, setTitle,
    excerpt, setExcerpt,
    content, setContent,
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
                <h2 className="text-2xl font-bold text-white">Blog Information</h2>
                <p className="mt-2 text-slate-400">Manage standard blog details.</p>
            </div>

            <div className="grid gap-6">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-400">Blog Title <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
                        placeholder="e.g. 5 Trends in Flexible Packaging"
                    />
                </div>

                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="block text-sm font-semibold text-slate-400">Short Description / Excerpt <span className="text-red-500">*</span></label>
                        <span className={`text-xs font-bold ${excerpt?.length >= 500 ? 'text-red-500' : 'text-slate-500'}`}>
                            {(excerpt || "").length} / 500
                        </span>
                    </div>
                    <textarea
                        rows="3"
                        required
                        value={excerpt}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val.length <= 500) {
                                setExcerpt(val);
                            } else {
                                setExcerpt(val.substring(0, 500));
                            }
                        }}
                        className={`w-full rounded-xl border bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 resize-none ${excerpt?.length >= 500 ? 'border-red-500/50' : 'border-white/10'}`}
                        placeholder="A short summary of the blog..."
                    ></textarea>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <ImageUploadField
                            slotKey="BLOG_FEATURED_IMAGE"
                            label="Featured Cover Image"
                            value={previewImage}
                            onChange={handleImageChange}
                            required={status === "published"}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-400">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 h-[52px]"
                        >
                            <option value="draft">Draft (Hidden)</option>
                            <option value="published">Published (Visible)</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-400">Full Article Content <span className="text-red-500">*</span></label>
                    <textarea
                        rows="15"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-4 text-white outline-none focus:border-sky-500 resize-y font-mono text-sm leading-relaxed"
                        placeholder="Write your full article here. HTML tags (<b>, <i>, <ul>, <p>, <h2>) are supported for formatting."
                    ></textarea>
                </div>
            </div>
        </section>
    );
};

export default BlogBasicInfo;

