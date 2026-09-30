import { useState, useRef } from "react";
import {
  FiX,
  FiUser,
  FiBriefcase,
  FiHome,
  FiMapPin,
  FiPhone,
  FiMail,
  FiPlus,
  FiTrash2,
  FiUploadCloud,
  FiCheckCircle,
  FiFileText,
  FiImage,
  FiSend,
  FiMessageSquare,
} from "react-icons/fi";
import { submitVisitorInquiry, uploadVisitingCard } from "../../services/api";
import { COUNTRIES } from "../../constants/countries";
import logo from "../../assets/logo/logo.png";

const VisitorInquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    companyName: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    contactNo: "",
    email: "",
    notes: "",
  });

  const [requirements, setRequirements] = useState(["", "", ""]);
  const [visitingCardFile, setVisitingCardFile] = useState(null);
  const [visitingCardPreview, setVisitingCardPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleRequirementChange = (index, value) => {
    setRequirements((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addRequirementLine = () => {
    setRequirements((prev) => [...prev, ""]);
  };

  const removeRequirementLine = (index) => {
    if (requirements.length <= 1) {
      setRequirements([""]);
      return;
    }
    setRequirements((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCardFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (JPG, PNG, WebP) for visiting card.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Visiting card image size should not exceed 10MB.");
      return;
    }

    setVisitingCardFile(file);
    setVisitingCardPreview(URL.createObjectURL(file));
    if (errorMessage) setErrorMessage("");
  };

  const handleRemoveCard = () => {
    setVisitingCardFile(null);
    setVisitingCardPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.companyName.trim()) {
      setErrorMessage("Please enter your company name.");
      return;
    }
    if (!formData.contactNo.trim()) {
      setErrorMessage("Please enter your contact number.");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    try {
      setIsSubmitting(true);

      let cardImageUrl = "";
      if (visitingCardFile) {
        const uploadRes = await uploadVisitingCard(visitingCardFile);
        if (uploadRes?.success) {
          cardImageUrl = uploadRes.image?.url || uploadRes.url || "";
        }
      }

      const activeReqs = requirements.filter((r) => r.trim().length > 0);

      const payload = {
        name: formData.name.trim(),
        designation: formData.designation.trim(),
        companyName: formData.companyName.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        country: formData.country.trim(),
        pincode: formData.pincode.trim(),
        contactNo: formData.contactNo.trim(),
        email: formData.email.trim(),
        requirements: activeReqs,
        notes: formData.notes.trim(),
        visitingCardImage: cardImageUrl,
      };

      const res = await submitVisitorInquiry(payload);
      if (res.success) {
        setIsSuccess(true);
      } else {
        throw new Error(res.message || "Failed to submit inquiry.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || err.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setIsSuccess(false);
    setErrorMessage("");
    setFormData({
      name: "",
      designation: "",
      companyName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      contactNo: "",
      email: "",
      notes: "",
    });
    setRequirements(["", "", ""]);
    setVisitingCardFile(null);
    setVisitingCardPreview("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Card */}
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-sky-500/20 bg-[#0A1220] shadow-[0_0_50px_rgba(56,189,248,0.15)] text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-600"></div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 transition"
        >
          <FiX size={20} />
        </button>

        {isSuccess ? (
          /* SUCCESS STATE */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <FiCheckCircle size={44} />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Visitor Inquiry Received!</h3>
              <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                Thank you for visiting <span className="text-sky-400 font-semibold">Imprenta</span>. Your inquiry slip has been registered and assigned to our sales & technical team.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400 max-w-sm mx-auto">
              Our packaging specialist will connect with you via <span className="text-white font-medium">{formData.contactNo || formData.email}</span> shortly.
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl bg-sky-500 px-8 py-3.5 font-bold text-white hover:bg-sky-400 transition shadow-[0_0_20px_rgba(56,189,248,0.3)]"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* FORM CONTENT */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header branding (Matching the physical printed slip) */}
            <div className="text-center border-b border-white/10 pb-6 relative">
              <div className="flex justify-center mb-3">
                <img src={logo} alt="Imprenta" className="h-9 sm:h-10 w-auto object-contain" />
              </div>
              <p className="text-[11px] uppercase tracking-widest font-mono text-sky-400 font-bold">
                Imprenta Pvt. Ltd.
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                Visitor Inquiry Form
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Please provide your contact details & project requirements below.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SECTION 1: VISITOR INFORMATION */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                  <FiUser size={14} /> 1. Visitor Details
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full rounded-xl border border-white/10 bg-[#060D17] px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="e.g. Purchase Manager / Director"
                      className="w-full rounded-xl border border-white/10 bg-[#060D17] px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                      Company Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Imprenta Pvt. Ltd."
                      className="w-full rounded-xl border border-white/10 bg-[#060D17] px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                      Contact No <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactNo"
                      required
                      value={formData.contactNo}
                      onChange={handleChange}
                      placeholder="e.g. +91 94270 61888"
                      className="w-full rounded-xl border border-white/10 bg-[#060D17] px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                      Email ID <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. contact@company.com"
                      className="w-full rounded-xl border border-white/10 bg-[#060D17] px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                      Office / Factory Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. Plot No. 45, Phase II, GIDC Industrial Estate"
                      className="w-full rounded-xl border border-white/10 bg-[#060D17] px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-sky-500"
                    />
                  </div>

                  {/* City, State, Country, Pincode Grid */}
                  <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Vapi / Mumbai"
                        className="w-full rounded-xl border border-white/10 bg-[#060D17] px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="e.g. Gujarat"
                        className="w-full rounded-xl border border-white/10 bg-[#060D17] px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country || "India"}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-[#060D17] px-3 py-2.5 text-sm text-white outline-none focus:border-sky-500 cursor-pointer"
                      >
                        <option value="" className="bg-[#0A1220] text-slate-400">Select Country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c} className="bg-[#0A1220] text-white">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="e.g. 396195"
                        className="w-full rounded-xl border border-white/10 bg-[#060D17] px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: REQUIREMENTS DETAILS (Like physical numbered lines) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                    <FiFileText size={14} /> 2. Requirements Details
                  </span>
                  <button
                    type="button"
                    onClick={addRequirementLine}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300 transition"
                  >
                    <FiPlus size={14} /> Add Line
                  </button>
                </div>

                <div className="space-y-2 rounded-2xl border border-white/10 bg-[#060D17] p-3 sm:p-4">
                  {requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-xs font-bold text-sky-400 border border-sky-500/20">
                        {idx + 1}.
                      </span>
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => handleRequirementChange(idx, e.target.value)}
                        placeholder={`Requirement ${idx + 1} (e.g. Mono Cartons 50,000 qty, Shrink Sleeves...)`}
                        className="flex-1 rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-600 outline-none focus:border-sky-500"
                      />
                      {requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRequirementLine(idx)}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition"
                          title="Remove item"
                        >
                          <FiTrash2 size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: VISITING CARD UPLOAD */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                  <FiImage size={14} /> 3. Visiting Card (Optional)
                </div>

                {visitingCardPreview ? (
                  <div className="relative rounded-2xl border border-sky-500/30 bg-[#060D17] p-3.5 flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative w-36 h-24 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                      <img
                        src={visitingCardPreview}
                        alt="Visiting Card Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                      <p className="text-xs font-bold text-white truncate">
                        {visitingCardFile?.name || "Visiting Card Attached"}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Image ready to be submitted with your inquiry.
                      </p>
                      <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs font-semibold text-sky-400 hover:underline"
                        >
                          Replace
                        </button>
                        <span className="text-slate-600">•</span>
                        <button
                          type="button"
                          onClick={handleRemoveCard}
                          className="text-xs font-semibold text-red-400 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer rounded-2xl border-2 border-dashed border-white/10 bg-[#060D17] hover:border-sky-500/40 hover:bg-sky-500/5 transition p-5 text-center flex flex-col items-center justify-center gap-2 group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:scale-110 transition">
                      <FiUploadCloud size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Click or upload visiting card image</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Supports JPG, PNG, WebP up to 10MB</p>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCardFileSelect}
                  className="hidden"
                />
              </div>

              {/* SECTION 4: REMARKS / ADDITIONAL NOTES */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                  <FiMessageSquare size={14} /> 4. Remark / Additional Notes (Optional)
                </div>

                <div>
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Enter any remarks, special instructions, sample requirements, or timeline..."
                    className="w-full rounded-xl border border-white/10 bg-[#060D17] px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-sky-500 transition resize-none"
                  />
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-8 py-3.5 text-sm font-black text-white hover:bg-sky-400 transition disabled:opacity-50 shadow-[0_0_25px_rgba(56,189,248,0.35)] cursor-pointer"
                >
                  <FiSend />
                  {isSubmitting ? "Submitting Inquiry..." : "Submit Visitor Form"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorInquiryModal;
