import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSave, FiX } from "react-icons/fi";
import { uploadApi } from "../../api/uploadApi";
import { categoryService } from "../../services/categoryService";

import CategoryBasicInfo from "./CategoryBasicInfo";
import CategoryConfigurator from "./CategoryConfigurator";

const CategoryForm = ({ isEdit = false, initialData = null, categoryId = null }) => {
    const navigate = useNavigate();
    const [formLoading, setFormLoading] = useState(false);

    // States
    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [status, setStatus] = useState(initialData?.status || "active");

    // Image handling
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(initialData?.image || "");
    const [currentImageStr, setCurrentImageStr] = useState(initialData?.image || "");

    // Configurator Default Structure
    const defaultConfigurator = {
        enabled: false,
        baseMinQuantity: 100,
        allowCustomQuantity: true,
        allowCustomSize: true,
        sections: []
    };

    const [configurator, setConfigurator] = useState(() => {
        const data = initialData?.configurator;
        return data ? { ...defaultConfigurator, ...data, sections: data.sections || [] } : defaultConfigurator;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return alert("Category Name is required");

        try {
            setFormLoading(true);

            let finalImageUrl = currentImageStr;

            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);
                const uploadRes = await uploadApi.uploadImage(formData);
                if (uploadRes.success) {
                    finalImageUrl = uploadRes.image?.url || uploadRes.url || finalImageUrl;
                } else {
                    throw new Error(uploadRes.message || "Failed to upload image.");
                }
            }

            const payload = {
                name,
                description,
                status,
                image: finalImageUrl,
                configurator
            };

            if (isEdit) {
                await categoryService.updateCategory(categoryId, payload);
                alert("Category updated successfully!");
                navigate("/categories");
            } else {
                await categoryService.createCategory(payload);
                alert("Category created successfully!");
                navigate("/categories");
            }

        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.message || error.message || "Operation failed.");
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-8 xl:grid-cols-[1fr]">
            <div className="space-y-8">
                <CategoryBasicInfo
                    name={name} setName={setName}
                    description={description} setDescription={setDescription}
                    status={status} setStatus={setStatus}
                    imageFile={imageFile} setImageFile={setImageFile}
                    previewImage={previewImage} setPreviewImage={setPreviewImage}
                />

                <CategoryConfigurator
                    configurator={configurator}
                    setConfigurator={setConfigurator}
                />
            </div>

            <div className="sticky bottom-6 rounded-3xl border border-white/10 bg-[#101B2D] p-5 backdrop-blur-xl z-10 w-full mt-4">
                <div className="flex justify-end gap-3">
                    <Link to="/categories" className="rounded-xl px-6 py-4 font-bold text-slate-400 hover:bg-white/5 hover:text-white transition">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={formLoading}
                        className="flex items-center gap-2 rounded-xl bg-sky-500 px-8 py-4 font-black text-white hover:bg-sky-600 transition disabled:opacity-50"
                    >
                        <FiSave />
                        {formLoading ? "Saving..." : isEdit ? "Update Category" : "Save Category"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CategoryForm;
