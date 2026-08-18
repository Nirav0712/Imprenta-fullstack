import { useState } from "react";
import {
  FiPackage,
  FiLayers,
  FiDroplet,
  FiArrowRight,
} from "react-icons/fi";

const quantities = [100, 250, 500, 1000, 2500];

const materials = [
  "Paper",
  "PVC",
  "BOPP",
  "Vinyl",
];

const finishes = [
  "Matte",
  "Gloss",
  "Soft Touch",
];

const printTypes = [
  "Single Side",
  "Double Side",
];

const sizes = [
  "A6",
  "A5",
  "A4",
  "Custom",
];

const OptionSelector = ({
  template,
  formData,
  updateFormData,
  next,
}) => {

  const Card = ({
    title,
    icon,
    options,
    value,
    setValue,
  }) => (

    <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">

          {icon}

        </div>

        <h3 className="text-xl font-bold text-white">

          {title}

        </h3>

      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">

        {options.map((item) => (

          <button
            key={item}
            onClick={() => setValue(item)}
            className={`
              rounded-2xl
              border
              px-5
              py-4
              font-medium
              transition-all
              duration-300

              ${value === item
                ? "border-sky-400 bg-sky-500 text-white shadow-lg"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-sky-400"
              }
            `}
          >
            {item}
          </button>

        ))}

      </div>

    </div>

  );

  return (

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-black text-white">

          Configure Your Sample

        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">

          Select the specifications for your sample request.
          These settings help us prepare the most accurate
          prototype for your business.

        </p>

      </div>

      {template && (

        <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

          <div className="flex flex-col gap-6 md:flex-row">

            <img
              src={template.image}
              alt={template.title}
              className="h-48 w-full rounded-2xl object-cover md:w-72"
            />

            <div className="flex flex-1 flex-col justify-center">

              <span className="w-fit rounded-full bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-300">

                {template.category}

              </span>

              <h2 className="mt-5 text-3xl font-black text-white">

                {template.title}

              </h2>

              <p className="mt-4 leading-7 text-slate-400">

                Premium professionally designed template ready for commercial printing. Customize specifications below before requesting your production sample.

              </p>

              <div className="mt-6">

                <p className="text-4xl font-black text-sky-400">

                  {template.price}

                </p>

              </div>

            </div>

          </div>

        </div>

      )}

      <Card
        title="Quantity"
        icon={<FiPackage />}
        options={quantities}
        value={formData?.quantity || 250}
        setValue={(val) => updateFormData({ quantity: val })}
      />

      <Card
        title="Material"
        icon={<FiLayers />}
        options={materials}
        value={formData?.material || "Paper"}
        setValue={(val) => updateFormData({ material: val })}
      />

      <Card
        title="Finish"
        icon={<FiDroplet />}
        options={finishes}
        value={formData?.finish || "Matte"}
        setValue={(val) => updateFormData({ finish: val })}
      />

      <Card
        title="Printing"
        icon={<FiPackage />}
        options={printTypes}
        value={formData?.printing || "Single Side"}
        setValue={(val) => updateFormData({ printing: val })}
      />

      <Card
        title="Size"
        icon={<FiLayers />}
        options={sizes}
        value={formData?.size || "A5"}
        setValue={(val) => updateFormData({ size: val })}
      />

      {/* Bottom */}

      <div className="flex justify-end">

        <button
          onClick={next}
          className="
            inline-flex
            items-center
            gap-3
            rounded-2xl
            bg-sky-500
            px-8
            py-4
            text-lg
            font-semibold
            text-white
            transition-all
            hover:bg-sky-600
            hover:scale-105
          "
        >

          Continue

          <FiArrowRight />

        </button>

      </div>

    </div>

  );

};

export default OptionSelector;