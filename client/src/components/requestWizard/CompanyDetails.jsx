import { useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiFileText,
} from "react-icons/fi";

const CompanyDetails = ({ next, back, formData, updateFormData }) => {

  const handleChange = (e) => {
    updateFormData({
      [e.target.name]: e.target.value,
    });
  };

  const Input = ({
    icon,
    name,
    placeholder,
    type = "text",
  }) => (

    <div className="relative">

      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-sky-400">

        {icon}

      </div>

      <input
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          h-14
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/5
          pl-14
          pr-5
          text-white
          outline-none
          transition
          placeholder:text-slate-500
          focus:border-sky-400
          focus:bg-white/10
        "
      />

    </div>

  );

  return (

    <div className="space-y-8">

      {/* Heading */}

      <div>

        <h2 className="text-4xl font-black text-white">

          Company Details

        </h2>

        <p className="mt-3 text-slate-400">

          Fill in your business information so we can prepare
          your quotation and sample request.

        </p>

      </div>

      {/* Form */}

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          icon={<FiBriefcase />}
          name="company"
          placeholder="Company Name"
        />

        <Input
          icon={<FiUser />}
          name="person"
          placeholder="Contact Person"
        />

        <Input
          icon={<FiMail />}
          name="email"
          type="email"
          placeholder="Email Address"
        />

        <Input
          icon={<FiPhone />}
          name="phone"
          placeholder="Phone Number"
        />

        <Input
          icon={<FiFileText />}
          name="gst"
          placeholder="GST Number"
        />

        <Input
          icon={<FiMapPin />}
          name="city"
          placeholder="City"
        />

        <Input
          icon={<FiMapPin />}
          name="state"
          placeholder="State"
        />

      </div>

      {/* Address */}

      <textarea
        rows={5}
        name="address"
        value={formData.address || ""}
        onChange={handleChange}
        placeholder="Complete Address"
        className="
          w-full
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-6
          text-white
          outline-none
          placeholder:text-slate-500
          focus:border-sky-400
        "
      />

      {/* Notes */}

      <textarea
        rows={5}
        name="notes"
        value={formData.notes || ""}
        onChange={handleChange}
        placeholder="Additional Instructions..."
        className="
          w-full
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-6
          text-white
          outline-none
          placeholder:text-slate-500
          focus:border-sky-400
        "
      />

      {/* Bottom */}

      <div className="flex justify-between">

        <button
          onClick={back}
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-8
            py-4
            text-white
            transition
            hover:border-sky-400
          "
        >

          <FiArrowLeft />

          Back

        </button>

        <button
          onClick={next}
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-sky-500
            px-8
            py-4
            font-semibold
            text-white
            transition
            hover:bg-sky-600
          "
        >

          Continue

          <FiArrowRight />

        </button>

      </div>

    </div>

  );

};

export default CompanyDetails;