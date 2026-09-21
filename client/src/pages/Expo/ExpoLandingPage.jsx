import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import {
  FiCalendar,
  FiMapPin,
  FiArrowRight,
  FiCheckCircle,
  FiTag,
  FiBox,
  FiLayers,
  FiFeather,
  FiEdit3,
  FiShield,
  FiAward,
  FiClock,
  FiSend,
  FiCheck,
} from "react-icons/fi";
import { fetchExpoBySlug, submitExpoLead } from "../../services/api";
import logo from "../../assets/logo/logo.png";

// Icon mapping helper
const ICON_MAP = {
  FiTag: FiTag,
  FiBox: FiBox,
  FiLayers: FiLayers,
  FiPackage: FiBox,
  FiFeather: FiFeather,
  FiEdit3: FiEdit3,
  FiShield: FiShield,
  FiAward: FiAward,
};

const ExpoLandingPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";
  const navigate = useNavigate();

  const [expo, setExpo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    packagingRequirement: "Premium Labels",
    preferredMeetingDate: "",
    message: "",
  });

  // Extract UTM Parameters from URL
  const utmSource = searchParams.get("utm_source") || "";
  const utmMedium = searchParams.get("utm_medium") || "";
  const utmCampaign = searchParams.get("utm_campaign") || "";
  const utmTerm = searchParams.get("utm_term") || "";
  const utmContent = searchParams.get("utm_content") || "";

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadExpo = async () => {
      try {
        setLoading(true);
        const res = await fetchExpoBySlug(slug, isPreview);
        if (res.expo) {
          setExpo(res.expo);
          // Preselect requirement from first option if available
          const reqField = res.expo.formFields?.find(
            (f) => f.fieldId === "packagingRequirement"
          );
          if (reqField?.options?.length > 0) {
            setFormData((prev) => ({
              ...prev,
              packagingRequirement: reqField.options[0],
            }));
          }
        }
      } catch (error) {
        console.error("Failed to load expo:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) loadExpo();
  }, [slug, isPreview]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) return toast.error("Please enter your full name.");
    if (!formData.companyName.trim()) return toast.error("Please enter your company name.");
    if (!formData.email.trim()) return toast.error("Please enter your email address.");

    try {
      setSubmitting(true);

      const payload = {
        ...formData,
        sourcePage: window.location.pathname,
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent,
        referrer: document.referrer || "",
      };

      const res = await submitExpoLead(slug, payload);

      if (res.success) {
        setSubmittedSuccess(true);
        toast.success(res.message || "Meeting request submitted successfully!");
      }
    } catch (error) {
      console.error("Form submit error:", error);
      toast.error(error.response?.data?.message || "Failed to submit meeting request.");
    } finally {
      setSubmitting(false);
    }
  };

  // Smooth scroll helper
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0A1220] min-h-screen font-sans text-center text-white flex flex-col items-center justify-center pt-24 pb-20">
        <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-slate-400 text-lg font-semibold animate-pulse">
          Loading Expo Experience...
        </h2>
      </div>
    );
  }

  if (!expo) {
    return (
      <div className="bg-[#0A1220] min-h-screen font-sans text-center text-white flex flex-col items-center justify-center pt-24 pb-20 px-4">
        <h1 className="text-4xl font-extrabold mb-4">Expo Page Not Found</h1>
        <p className="text-slate-400 max-w-md mb-8">
          The requested Expo landing page is either unpublished or does not exist.
        </p>
        <Link
          to="/"
          className="rounded-2xl bg-sky-500 px-8 py-3.5 text-base font-bold text-white hover:bg-sky-400 transition"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

  // Active solution cards & features
  const activeSolutions = (expo.solutions || []).filter((s) => s.active !== false);
  const whyFeatures = expo.whyFeatures || [];
  const formFields = (expo.formFields || []).filter((f) => f.active !== false);

  return (
    <div className="bg-[#0A1220] min-h-screen font-sans text-white selection:bg-sky-500 selection:text-white">
      <Helmet>
        <title>{expo.seoTitle || `${expo.name} | Imprenta`}</title>
        <meta
          name="description"
          content={expo.seoDescription || expo.shortDescription || `Meet Imprenta at ${expo.name}`}
        />
        {expo.ogImage && <meta property="og:image" content={expo.ogImage} />}
      </Helmet>

      {/* Floating Glassmorphic Top Navbar */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0A1220]/80 border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Imprenta" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "home")}
              className="hover:text-sky-400 transition-colors"
            >
              Overview
            </a>
            {expo.solutionsEnabled && (
              <a
                href="#solutions"
                onClick={(e) => scrollToSection(e, "solutions")}
                className="hover:text-sky-400 transition-colors"
              >
                Packaging Solutions
              </a>
            )}
            {expo.whyEnabled && (
              <a
                href="#why-us"
                onClick={(e) => scrollToSection(e, "why-us")}
                className="hover:text-sky-400 transition-colors"
              >
                Why Meet Imprenta?
              </a>
            )}
          </div>

          <div className="flex items-center gap-4">
            {expo.formEnabled && (
              <a
                href="#book"
                onClick={(e) => scrollToSection(e, "book")}
                className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-sky-400 transition shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-105"
              >
                Book Meeting
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative pt-16 pb-28 md:pt-24 md:pb-36 overflow-hidden">
        {/* Background Glows and ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Event Copy & Badges */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              {/* Event Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 border border-sky-400/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-400 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                {expo.heroBadge || "IMPRENTA AT THE EXPO"}
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight">
                {expo.heroHeading || `Meet Imprenta in ${expo.city || "Chicago"}`}
              </h1>

              {/* Event Metadata (Date, Venue, Booth) */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-slate-300 font-medium text-sm sm:text-base pt-2">
                {expo.eventDate && (
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                    <FiCalendar className="text-sky-400 shrink-0" size={18} />
                    <span>{expo.eventDate}</span>
                  </div>
                )}

                {expo.boothNumber && (
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                    <FiMapPin className="text-sky-400 shrink-0" size={18} />
                    <span>{expo.boothNumber}</span>
                  </div>
                )}

                {expo.venue && (
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                    <span>{expo.venue}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 pt-2 font-normal">
                {expo.heroDescription || expo.shortDescription}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <a
                  href={expo.primaryButtonAction === "scroll_to_form" ? "#book" : expo.primaryButtonLink}
                  onClick={(e) => {
                    if (expo.primaryButtonAction === "scroll_to_form") {
                      scrollToSection(e, "book");
                    }
                  }}
                  className="inline-flex items-center gap-3 rounded-2xl bg-sky-500 px-8 py-4 text-base font-bold text-white hover:bg-sky-400 transition-all duration-300 shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:scale-105"
                >
                  {expo.primaryButtonText || "Schedule a Meeting"}
                  <FiArrowRight size={18} />
                </a>

                {expo.solutionsEnabled && (
                  <a
                    href="#solutions"
                    onClick={(e) => scrollToSection(e, "solutions")}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-8 py-4 text-base font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition"
                  >
                    {expo.secondaryButtonText || "Explore Solutions"}
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Hero Visual Banner Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.6)] group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#08111F]">
                  <img
                    src={
                      expo.heroImage ||
                      "https://res.cloudinary.com/dkenmez3t/image/upload/v1788338383/imprenta/products/yop399ugb8snu2ye5i4s.png"
                    }
                    alt={expo.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1220]/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0A1220]/90 backdrop-blur-md rounded-xl p-3.5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                        {expo.city || "Official Expo"}
                      </div>
                      <div className="text-sm font-bold text-white">{expo.name}</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
                      <FiTag size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Packaging Solutions Section */}
      {expo.solutionsEnabled && activeSolutions.length > 0 && (
        <section id="solutions" className="py-24 relative z-10 border-t border-white/5 bg-[#08111F]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h4 className="text-sky-400 text-sm font-bold uppercase tracking-wider">
                Multi-Format Capabilities
              </h4>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {expo.solutionsHeading || "Packaging Solutions"}
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                {expo.solutionsSubtitle || "Explore our comprehensive range of high-performance packaging"}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeSolutions.map((item, index) => {
                const IconComponent = ICON_MAP[item.icon] || FiBox;
                return (
                  <div
                    key={index}
                    className={`rounded-3xl p-8 transition-all duration-300 backdrop-blur-xl border ${
                      item.isHighlight
                        ? "bg-gradient-to-br from-sky-500/20 to-sky-500/5 border-sky-400/40 shadow-[0_10px_40px_rgba(56,189,248,0.15)] hover:border-sky-400"
                        : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]"
                    } hover:-translate-y-1.5`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-6">
                      <IconComponent size={26} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Why Meet Imprenta Section */}
      {expo.whyEnabled && (
        <section id="why-us" className="py-24 relative z-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Feature Highlights */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 border border-sky-400/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-400">
                  Excellence & Innovation
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  {expo.whyHeading || "Why Meet Imprenta?"}
                </h2>
                <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                  {expo.whySubtitle ||
                    "Discuss your high-volume packaging challenges with our senior production team and explore innovative printing technologies."}
                </p>

                <div className="space-y-4 pt-4">
                  {whyFeatures.map((feat, index) => (
                    <div key={index} className="flex items-start gap-3.5">
                      <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
                        <FiCheck size={14} />
                      </div>
                      <span className="text-slate-200 text-base sm:text-lg font-medium">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Glassmorphic Callout Box */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-sky-500/10 via-white/5 to-white/5 p-8 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                  <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-sky-400/20 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 mb-6">
                    <FiAward size={24} />
                  </div>

                  <h3 className="text-2xl font-black text-white mb-4">
                    {expo.whyCardTitle || "Elevating Brands Globally"}
                  </h3>
                  <p className="text-slate-300 text-base leading-relaxed mb-6">
                    {expo.whyCardDescription ||
                      "Discuss your Next-Gen packaging needs with our experts directly on the expo floor. We help you transition from concept to finished retail-ready packaging."}
                  </p>

                  <a
                    href="#book"
                    onClick={(e) => scrollToSection(e, "book")}
                    className="inline-flex items-center gap-2 text-sky-400 font-bold hover:text-sky-300 transition text-sm"
                  >
                    Schedule a Meeting with Us <FiArrowRight />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Book a Meeting Section */}
      {expo.formEnabled && (
        <section id="book" className="py-24 relative z-10 border-t border-white/5 bg-[#08111F]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 border border-sky-400/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-400">
                Direct Booth Appointments
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {expo.formTitle || "Book a Meeting"}
              </h2>
              <p className="text-slate-400 text-base">
                {expo.formSubtitle || "Secure your dedicated time slot with our team at the booth."}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 sm:p-10 md:p-12 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {submittedSuccess ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                    <FiCheck size={36} />
                  </div>
                  <h3 className="text-3xl font-black text-white">Meeting Request Received!</h3>
                  <p className="text-slate-300 max-w-lg mx-auto text-base leading-relaxed">
                    {expo.formSuccessMessage ||
                      "Thank you! Your meeting request has been submitted. Our team will contact you shortly to confirm your time slot."}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setFormData({
                        fullName: "",
                        companyName: "",
                        email: "",
                        phone: "",
                        packagingRequirement: "Premium Labels",
                        preferredMeetingDate: "",
                        message: "",
                      });
                    }}
                    className="rounded-2xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Full Name <span className="text-sky-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3.5 text-white outline-none focus:border-sky-400 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Company Name <span className="text-sky-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        placeholder="Acme Corp"
                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3.5 text-white outline-none focus:border-sky-400 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Email Address <span className="text-sky-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3.5 text-white outline-none focus:border-sky-400 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3.5 text-white outline-none focus:border-sky-400 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Packaging Requirement <span className="text-sky-400">*</span>
                      </label>
                      <select
                        value={formData.packagingRequirement}
                        onChange={(e) => handleInputChange("packagingRequirement", e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3.5 text-white outline-none focus:border-sky-400 transition h-[52px]"
                      >
                        <option value="Premium Labels">Premium Labels</option>
                        <option value="Mono Cartons">Mono Cartons</option>
                        <option value="Shrink Sleeves">Shrink Sleeves</option>
                        <option value="Flexible Packaging Pouches">Flexible Packaging Pouches</option>
                        <option value="Seamless Plastic Tubes">Seamless Plastic Tubes</option>
                        <option value="Corporate Branding & Design">Corporate Branding & Design</option>
                        <option value="Other / General">Other / General</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Preferred Meeting Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredMeetingDate}
                        onChange={(e) => handleInputChange("preferredMeetingDate", e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3.5 text-white outline-none focus:border-sky-400 transition h-[52px]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Message / Project Scope (Optional)
                      </label>
                      <textarea
                        rows="3"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about your requirements or preferred time of day..."
                        className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3.5 text-white outline-none focus:border-sky-400 transition resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-2xl bg-sky-500 py-4 font-black text-white hover:bg-sky-400 transition-all duration-300 shadow-[0_0_30px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 text-lg disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        {expo.formSubmitButtonText || "Submit Request"}
                        <FiSend size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-[#060D17] text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <img src={logo} alt="Imprenta" className="h-8 w-auto mx-auto object-contain opacity-80" />
          <p>© {new Date().getFullYear()} Imprenta Pvt Ltd. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ExpoLandingPage;
