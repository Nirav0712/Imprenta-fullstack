import { useFormContext } from "react-hook-form";

import InputField from "../../common/InputField";

const PricingInventory = () => {

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (

    <section className="rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-8">

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-white">
          Pricing & Inventory
        </h2>

        <p className="mt-2 text-slate-400">
          Manage product pricing, stock and inventory.
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <InputField
          label="Regular Price"
          type="number"
          name="regularPrice"
          placeholder="999"
          register={register}
          error={errors.regularPrice}
          required
        />

        <InputField
          label="Sale Price"
          type="number"
          name="salePrice"
          placeholder="799"
          register={register}
          error={errors.salePrice}
        />

        <InputField
          label="Discount (%)"
          type="number"
          name="discount"
          placeholder="20"
          register={register}
          error={errors.discount}
        />

        <InputField
          label="GST (%)"
          type="number"
          name="gst"
          placeholder="18"
          register={register}
          error={errors.gst}
        />

        <InputField
          label="Stock Quantity"
          type="number"
          name="stock"
          placeholder="500"
          register={register}
          error={errors.stock}
        />

        <InputField
          label="Low Stock Alert"
          type="number"
          name="lowStockAlert"
          placeholder="20"
          register={register}
          error={errors.lowStockAlert}
        />

      </div>

      {/* Switches */}

      <div className="mt-10 space-y-5">

        <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#08111F] px-5 py-4">

          <div>

            <h4 className="font-semibold text-white">
              Show Product Price
            </h4>

            <p className="mt-1 text-sm text-slate-400">
              When OFF, Price will be hidden on the website and customers will see "Inquire for Price".
            </p>

          </div>

          <input
            type="checkbox"
            {...register("showPrice")}
            className="h-5 w-5 accent-sky-500"
          />

        </label>

        <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#08111F] px-5 py-4">

          <div>

            <h4 className="font-semibold text-white">
              Manage Inventory
            </h4>

            <p className="mt-1 text-sm text-slate-400">
              Enable inventory tracking.
            </p>

          </div>

          <input
            type="checkbox"
            {...register("manageStock")}
            className="h-5 w-5 accent-sky-500"
          />

        </label>

        <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#08111F] px-5 py-4">

          <div>

            <h4 className="font-semibold text-white">
              Featured Product
            </h4>

            <p className="mt-1 text-sm text-slate-400">
              Show product on homepage.
            </p>

          </div>

          <input
            type="checkbox"
            {...register("featured")}
            className="h-5 w-5 accent-sky-500"
          />

        </label>

        <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#08111F] px-5 py-4">

          <div>

            <h4 className="font-semibold text-white">
              Trending Product
            </h4>

            <p className="mt-1 text-sm text-slate-400">
              Display in trending section.
            </p>

          </div>

          <input
            type="checkbox"
            {...register("trending")}
            className="h-5 w-5 accent-sky-500"
          />

        </label>

      </div>

    </section>

  );

};

export default PricingInventory;