import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import InputField from "../../common/InputField";
import TextAreaField from "../../common/TextAreaField";
import SelectField from "../../common/SelectField";

import generateSlug from "../../../utils/generateSlug";
import { categoryService } from "../../../services/categoryService";

const BasicInfo = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [categories, setCategories] = useState([]);
  const [skuEnabled, setSkuEnabled] = useState(false);
  const [isSkuInitialized, setIsSkuInitialized] = useState(false);

  const productName = watch("productName");
  const skuValue = watch("sku");

  useEffect(() => {
    // If the component has loaded an existing product deeply with an SKU, enable the toggle automatically.
    if (!isSkuInitialized && skuValue && skuValue.trim() !== "") {
      setSkuEnabled(true);
      setIsSkuInitialized(true);
    }
  }, [skuValue, isSkuInitialized]);

  const handleSkuToggle = () => {
    const newState = !skuEnabled;
    setSkuEnabled(newState);
    if (!newState) {
      setValue("sku", ""); // Clear the SKU so it saves cleanly 
    }
  };

  useEffect(() => {
    if (productName) {
      setValue("slug", generateSlug(productName));
    }
  }, [productName, setValue]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await categoryService.getCategories();

      const categoryArray = Array.isArray(res) ? res : (res.categories || []);
      const activeCategories = categoryArray.filter(cat => cat.status === "active");

      setCategories(activeCategories);
    } catch (err) {
      console.error("Category Load Error:", err);
    }
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-8">

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Basic Information
        </h2>

        <p className="mt-2 text-slate-400">
          Add your product details.
        </p>
      </div>

      <div className="grid gap-6">

        <InputField
          label="Product Name"
          name="productName"
          placeholder="Premium Business Card"
          register={register}
          error={errors.productName}
          required
        />

        <div className="grid gap-6 lg:grid-cols-2">

          <InputField
            label="Slug"
            name="slug"
            placeholder="premium-business-card"
            register={register}
            error={errors.slug}
          />

          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-white">
                SKU <span className="text-xs text-slate-400 font-normal ml-1">(Optional)</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{skuEnabled ? "ON" : "OFF"}</span>
                <button
                  type="button"
                  onClick={handleSkuToggle}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${skuEnabled ? 'bg-sky-500' : 'bg-white/10'}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${skuEnabled ? 'translate-x-4' : 'translate-x-1'}`}
                  />
                </button>
              </div>
            </div>
            {skuEnabled ? (
              <input
                type="text"
                placeholder="IMP-001"
                {...register("sku")}
                className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white focus:border-sky-500 focus:outline-none transition-all placeholder-slate-600"
              />
            ) : (
              <div className="w-full rounded-xl border border-white/5 bg-[#08111F]/30 px-4 py-3 text-slate-500 italic select-none">
                SKU not required
              </div>
            )}
            {errors.sku && <p className="mt-2 text-sm text-red-500">{errors.sku.message}</p>}
          </div>

        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium text-white">
              Category
            </label>

            <select
              {...register("category")}
              className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white"
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}

            </select>

            {errors.category && (
              <p className="mt-2 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}

          </div>

          <InputField
            label="Brand"
            name="brand"
            placeholder="Imprenta"
            register={register}
            error={errors.brand}
          />

        </div>

        <InputField
          label="Barcode"
          name="barcode"
          placeholder="123456789"
          register={register}
          error={errors.barcode}
        />

        <TextAreaField
          label="Short Description"
          name="shortDescription"
          rows={4}
          placeholder="Write short description..."
          register={register}
          error={errors.shortDescription}
        />

        <TextAreaField
          label="Product Description"
          name="description"
          rows={8}
          placeholder="Write complete product description..."
          register={register}
          error={errors.description}
        />

      </div>

    </section>
  );
};

export default BasicInfo;