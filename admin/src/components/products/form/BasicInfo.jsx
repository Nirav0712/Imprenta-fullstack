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

  const productName = watch("productName");

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

          <InputField
            label="SKU"
            name="sku"
            placeholder="IMP-001"
            register={register}
            error={errors.sku}
          />

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