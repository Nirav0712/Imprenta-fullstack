import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiBriefcase,
  FiPhone,
  FiMail,
  FiMapPin,
  FiPlus,
  FiTrash2,
  FiUploadCloud,
  FiCheckCircle,
  FiFileText,
  FiImage,
  FiSend,
  FiMessageSquare,
  FiCheck,
  FiArrowRight,
  FiHome,
} from "react-icons/fi";
import { submitVisitorInquiry, uploadVisitingCard, fetchSettings } from "../../services/api";
import { COUNTRIES } from "../../constants/countries";
import logo from "../../assets/logo/logo.png";

const VisitorInquiry = () => {
  const navigate = useNavigate();

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
  const [settings, setSettings] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    document.title = "Visitor Inquiry Form | Imprenta";
    window.scrollTo(0, 0);

    const loadSettings = async () => {
      try {
        const res = await fetchSettings();
        if (res?.data) {
          setSettings(res.data);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    };
    loadSettings();
  }, []);

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
        window.scrollTo({ top: 0, behavior: "smooth" });
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

  const handleReset = () => {
    setIsSuccess(false);
    setErrorMessage("");
    setFormData({
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
    setRequirements(["", "", ""]);
    setVisitingCardFile(null);
    setVisitingCardPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#050B14] font-sans text-white overflow-hidden pb-24">
      {/* Background Ambient Glows */}
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-sky-500/15 blur-[140px] pointer-events-none" />
      <div className="absolute right-0 top-32 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-sky-400/10 blur-[130px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 border-b border-white/5">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-xs sm:text-sm mb-8">
            <Link to="/" className="text-slate-400 hover:text-white transition flex items-center gap-1.5">
              <FiHome size={14} /> Home
            </Link>
            <span className="text-slate-600">/</span>
            <span className="font-semibold text-sky-400">Visitor Inquiry</span>
          </div>

          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/10 px-5 py-2 text-xs sm:text-sm font-semibold text-sky-300 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              Official Visitor Inquiry Slip
            </span>

            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Visitor Inquiry <span className="text-sky-400">Form</span>
            </h1>

            <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Register your project requirements, visit slip, and contact details with Imprenta.
              Our technical packaging and production team will review your specifications and connect with you directly.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="relative pt-12 sm:pt-16">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">
          {isSuccess ? (
            /* SUCCESS STATE (Full Page Hero Card) */
            <div className="max-w-3xl mx-auto rounded-[32px] sm:rounded-[36px] border border-emerald-500/30 bg-[#0A1220]/90 p-8 sm:p-14 text-center backdrop-blur-2xl shadow-[0_20px_60px_rgba(16,185,129,0.15)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500"></div>

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.25)] mb-8">
                <FiCheckCircle size={52} />
              </div>

              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                Inquiry Registered Successfully
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Thank You, {formData.name || "Visitor"}!
              </h2>

              <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Your visitor inquiry slip has been registered in our database. Our sales and technical packaging specialists will get in touch with you shortly.
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300 max-w-md mx-auto">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Confirmation Sent To</p>
                <p className="font-bold text-white text-base">{formData.contactNo || formData.email}</p>
                {formData.companyName && (
                  <p className="text-xs text-sky-400 mt-1 font-medium">{formData.companyName}</p>
                )}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 text-base font-extrabold transition-all duration-300 shadow-[0_0_30px_rgba(56,189,248,0.35)] hover:scale-[1.02] cursor-pointer"
                >
                  <FiPlus size={20} />
                  Add New / Another Record
                </button>
                <Link
                  to="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 px-8 py-4 text-base font-bold text-slate-300 hover:text-white transition cursor-pointer"
                >
                  Back to Home <FiArrowRight />
                </Link>
              </div>
              <p className="text-xs text-slate-400 mt-4">
                Clicking <span className="text-sky-400 font-semibold">"Add New / Another Record"</span> opens a fresh blank form for entering the next visitor.
              </p>
            </div>
          ) : (
            /* 2-COLUMN FULL PAGE RESPONSIVE LAYOUT */
            <div className="grid gap-10 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr]">
              {/* LEFT COLUMN: BRAND INFO & CONTACT SUPPORT */}
              <div className="space-y-6">
                {/* Brand & Introduction Card */}
                <div className="rounded-[30px] border border-white/10 bg-white/5 p-7 sm:p-8 backdrop-blur-xl relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-5">
                    <img src={logo} alt="Imprenta" className="h-10 w-auto object-contain" />
                    <div>
                      <h3 className="text-base font-extrabold text-white leading-none">Imprenta Pvt. Ltd.</h3>
                      <p className="text-[11px] text-sky-400 font-mono font-bold mt-1 uppercase tracking-wider">Packaging & Printing</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Welcome to Imprenta. Whether you visited our factory, office, or expo booth, filling out this slip records your detailed technical packaging inquiries directly with our team.
                  </p>

                  <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 text-sky-400 mt-0.5">
                        <FiCheck size={14} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Dedicated Engineering Team</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Specialists for Mono Cartons, Shrink Sleeves, and Tubes.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5">
                        <FiCheck size={14} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fast Quotation & Feasibility</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Accurate cost estimates tailored to your batch volume.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 text-sky-400 mt-0.5">
                        <FiCheck size={14} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Free Prototype & Samples</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Physical print samples available upon request.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Card */}
                <div className="rounded-[30px] border border-white/10 bg-white/5 p-7 sm:p-8 backdrop-blur-xl space-y-5">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest">Direct Contact Details</h4>

                  <div className="space-y-4">
                    <a
                      href={`tel:${settings?.phone || "+919427061888"}`}
                      className="flex items-center gap-4 group p-2.5 rounded-xl hover:bg-white/5 transition"
                    >
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 group-hover:bg-sky-500 group-hover:text-white transition">
                        <FiPhone size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Phone</span>
                        <span className="text-sm font-semibold text-slate-200 group-hover:text-sky-300 transition">{settings?.phone || "+91 94270 61888"}</span>
                      </div>
                    </a>

                    <a
                      href={`mailto:${settings?.email || "contact@imprenta.in"}`}
                      className="flex items-center gap-4 group p-2.5 rounded-xl hover:bg-white/5 transition"
                    >
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 group-hover:bg-cyan-500 group-hover:text-white transition">
                        <FiMail size={16} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Email Address</span>
                        <span className="text-sm font-semibold text-slate-200 truncate block group-hover:text-cyan-300 transition">{settings?.email || "contact@imprenta.in"}</span>
                      </div>
                    </a>

                    <div className="flex items-start gap-4 p-2.5 rounded-xl">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                        <FiMapPin size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Plant & Office</span>
                        <span className="text-xs text-slate-300 leading-relaxed block mt-0.5">
                          Gala No C-2, Dungra Park, Mahavir Nagar, 100 Shed Area, Vapi GIDC, Valsad, Gujarat - 396195
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: MAIN FORM */}
              <div className="rounded-[32px] sm:rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-10 lg:p-12 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] relative overflow-hidden">
                {/* Decorative Top Accent Glow Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-600"></div>

                <div className="border-b border-white/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                      Visitor Registration Slip
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Please enter your contact info & custom packaging specifications.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full w-fit">
                    <span className="text-red-400">*</span> Required Fields
                  </span>
                </div>

                {errorMessage && (
                  <div className="mb-8 p-4 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-medium flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0"></span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* SECTION 1: VISITOR DETAILS */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-sky-400 uppercase tracking-wider">
                      <div className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                        <FiUser size={13} />
                      </div>
                      1. Visitor & Business Details
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Rajesh Sharma"
                          className="h-13 w-full rounded-2xl border border-white/10 bg-[#060D17] px-4 text-sm text-white placeholder-slate-600 outline-none transition focus:border-sky-400 focus:bg-white/5"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                          Designation
                        </label>
                        <input
                          type="text"
                          name="designation"
                          value={formData.designation}
                          onChange={handleChange}
                          placeholder="e.g. Purchase Manager / Director"
                          className="h-13 w-full rounded-2xl border border-white/10 bg-[#060D17] px-4 text-sm text-white placeholder-slate-600 outline-none transition focus:border-sky-400 focus:bg-white/5"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                          Company Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          required
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="e.g. Imprenta Pvt. Ltd."
                          className="h-13 w-full rounded-2xl border border-white/10 bg-[#060D17] px-4 text-sm text-white placeholder-slate-600 outline-none transition focus:border-sky-400 focus:bg-white/5"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                          Contact No <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          name="contactNo"
                          required
                          value={formData.contactNo}
                          onChange={handleChange}
                          placeholder="e.g. +91 94270 61888"
                          className="h-13 w-full rounded-2xl border border-white/10 bg-[#060D17] px-4 text-sm text-white placeholder-slate-600 outline-none transition focus:border-sky-400 focus:bg-white/5"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. contact@company.com"
                          className="h-13 w-full rounded-2xl border border-white/10 bg-[#060D17] px-4 text-sm text-white placeholder-slate-600 outline-none transition focus:border-sky-400 focus:bg-white/5"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                          Office / Factory Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="e.g. Plot No. 45, Phase II, GIDC Industrial Estate"
                          className="h-13 w-full rounded-2xl border border-white/10 bg-[#060D17] px-4 text-sm text-white placeholder-slate-600 outline-none transition focus:border-sky-400 focus:bg-white/5"
                        />
                      </div>

                      {/* City, State, Country, Pincode (4 columns on md, 2 on sm) */}
                      <div className="sm:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="e.g. Vapi / Mumbai"
                            className="h-13 w-full rounded-2xl border border-white/10 bg-[#060D17] px-3.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-sky-400 focus:bg-white/5"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="e.g. Gujarat"
                            className="h-13 w-full rounded-2xl border border-white/10 bg-[#060D17] px-3.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-sky-400 focus:bg-white/5"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                            Country
                          </label>
                          <select
                            name="country"
                            value={formData.country || "India"}
                            onChange={handleChange}
                            className="h-13 w-full rounded-2xl border border-white/10 bg-[#060D17] px-3 text-sm text-white outline-none transition focus:border-sky-400 focus:bg-white/5 cursor-pointer"
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
                          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                            Pincode
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            placeholder="e.g. 396195"
                            className="h-13 w-full rounded-2xl border border-white/10 bg-[#060D17] px-3.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-sky-400 focus:bg-white/5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: REQUIREMENTS DETAILS */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-xs font-bold text-sky-400 uppercase tracking-wider">
                        <div className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                          <FiFileText size={13} />
                        </div>
                        2. Project & Packaging Requirements
                      </div>
                      <button
                        type="button"
                        onClick={addRequirementLine}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/25 px-3 py-1.5 rounded-xl transition cursor-pointer"
                      >
                        <FiPlus size={14} /> Add Another Line
                      </button>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-white/10 bg-[#060D17]/80 p-4 sm:p-6">
                      {requirements.map((req, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-xs font-bold text-sky-300 border border-sky-500/30">
                            {idx + 1}
                          </span>
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => handleRequirementChange(idx, e.target.value)}
                            placeholder={`Requirement ${idx + 1} (e.g. Mono Cartons 50,000 pcs, 300 GSM MetPET, Shrink Sleeves...)`}
                            className="flex-1 h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-xs sm:text-sm text-white placeholder-slate-600 outline-none transition focus:border-sky-400 focus:bg-white/10"
                          />
                          {requirements.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeRequirementLine(idx)}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-400/10 border border-transparent hover:border-red-400/20 transition cursor-pointer"
                              title="Delete requirement"
                            >
                              <FiTrash2 size={15} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 3: VISITING CARD UPLOAD */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-sky-400 uppercase tracking-wider">
                      <div className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                        <FiImage size={13} />
                      </div>
                      3. Visiting Card (Optional)
                    </div>

                    {visitingCardPreview ? (
                      <div className="relative rounded-2xl border border-sky-500/30 bg-[#060D17] p-5 flex flex-col sm:flex-row items-center gap-5">
                        <div className="relative w-44 h-28 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                          <img
                            src={visitingCardPreview}
                            alt="Visiting Card Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-center sm:text-left space-y-1.5">
                          <p className="text-sm font-bold text-white truncate">
                            {visitingCardFile?.name || "Visiting Card Attached"}
                          </p>
                          <p className="text-xs text-slate-400">
                            Image attached and ready to be stored with your official inquiry slip.
                          </p>
                          <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="text-xs font-bold text-sky-400 hover:text-sky-300 hover:underline cursor-pointer"
                            >
                              Replace Image
                            </button>
                            <span className="text-slate-600">•</span>
                            <button
                              type="button"
                              onClick={handleRemoveCard}
                              className="text-xs font-bold text-red-400 hover:text-red-300 hover:underline cursor-pointer"
                            >
                              Remove Card
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer rounded-2xl border-2 border-dashed border-white/15 bg-[#060D17]/70 hover:border-sky-400/50 hover:bg-sky-500/5 transition p-7 sm:p-9 text-center flex flex-col items-center justify-center gap-3 group"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/25 group-hover:scale-110 transition">
                          <FiUploadCloud size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">Click to upload your Visiting Card photo</p>
                          <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WebP up to 10MB</p>
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
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-sky-400 uppercase tracking-wider">
                      <div className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                        <FiMessageSquare size={13} />
                      </div>
                      4. Remarks & Additional Notes (Optional)
                    </div>

                    <div>
                      <textarea
                        name="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Enter any specific requirements, material preferences, sample delivery deadlines, or instructions..."
                        className="w-full rounded-2xl border border-white/10 bg-[#060D17] p-4 text-sm text-white placeholder-slate-600 outline-none transition focus:border-sky-400 focus:bg-white/5 resize-none"
                      />
                    </div>
                  </div>

                  {/* SUBMIT ACTION BUTTONS */}
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-4">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleReset}
                      className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
                    >
                      Clear Form
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-10 py-4 text-base font-extrabold text-white hover:bg-sky-400 transition-all duration-300 disabled:opacity-50 shadow-[0_0_30px_rgba(56,189,248,0.35)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] cursor-pointer"
                    >
                      <FiSend size={18} />
                      {isSubmitting ? "Submitting Inquiry Slip..." : "Submit Visitor Inquiry"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default VisitorInquiry;
