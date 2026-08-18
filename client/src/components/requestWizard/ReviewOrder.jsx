import {
  FiArrowLeft,
  FiCheckCircle,
  FiPackage,
  FiFileText,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const ReviewOrder = ({ onSubmit, submitting, back, formData }) => {

  return (

    <div className="space-y-8">

      {/* Heading */}

      <div>

        <h2 className="text-4xl font-black text-white">

          Review Your Request

        </h2>

        <p className="mt-3 text-slate-400">

          Please verify your details before submitting your sample request.

        </p>

      </div>

      {/* Summary */}

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Left */}

        <div className="space-y-6">

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">

            <div className="flex items-center gap-3">

              <FiPackage className="text-sky-400" size={22} />

              <h3 className="text-xl font-bold text-white">

                Product Summary

              </h3>

            </div>

            <div className="mt-6 space-y-3 text-slate-300">

              <p>Product : {formData.product}</p>

              <p>Quantity : {formData.quantity}</p>

              <p>Material : {formData.material}</p>

              <p>Finish : {formData.finish}</p>

              <p>Printing : {formData.printing}</p>

              <p>Size : {formData.size}</p>

            </div>

          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">

            <div className="flex items-center gap-3">

              <FiFileText className="text-sky-400" size={22} />

              <h3 className="text-xl font-bold text-white">

                Uploaded Artwork

              </h3>

            </div>

            <div className="mt-6">

              <p className="text-slate-300">

                {formData.artwork ? formData.artwork.name : "No artwork uploaded"}

              </p>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">

          <div className="flex items-center gap-3">

            <FiUser className="text-sky-400" size={22} />

            <h3 className="text-xl font-bold text-white">

              Company Information

            </h3>

          </div>

          <div className="mt-6 space-y-5">

            <div className="flex gap-3">

              <FiUser className="text-sky-400 mt-1" />

              <div>

                <p className="text-sm text-slate-500">Contact Person</p>

                <p className="text-white">{formData.person}</p>

              </div>

            </div>

            <div className="flex gap-3">

              <FiMail className="text-sky-400 mt-1" />

              <div>

                <p className="text-sm text-slate-500">Email</p>

                <p className="text-white">{formData.email}</p>

              </div>

            </div>

            <div className="flex gap-3">

              <FiPhone className="text-sky-400 mt-1" />

              <div>

                <p className="text-sm text-slate-500">Phone</p>

                <p className="text-white">{formData.phone}</p>

              </div>

            </div>

            <div className="flex gap-3">

              <FiMapPin className="text-sky-400 mt-1" />

              <div>

                <p className="text-sm text-slate-500">Company & Address</p>

                <p className="text-white">{formData.company}, {formData.city}, {formData.state}</p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="flex flex-col gap-5 sm:flex-row sm:justify-between">

        <button
          onClick={back}
          className="
            flex
            items-center
            justify-center
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
          onClick={onSubmit}
          disabled={submitting}
          className="
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-green-500
            px-8
            py-4
            font-semibold
            text-white
            transition
            disabled:opacity-50
            hover:bg-green-600
          "
        >

          <FiCheckCircle />

          {submitting ? "Submitting..." : "Submit Request"}

        </button>

      </div>

    </div>

  );

};

export default ReviewOrder;