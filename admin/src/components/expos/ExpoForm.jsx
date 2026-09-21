import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSave,
  FiX,
  FiCalendar,
  FiLayout,
  FiBox,
  FiCheckCircle,
  FiFileText,
  FiGlobe,
  FiExternalLink,
} from "react-icons/fi";
import { uploadApi } from "../../api/uploadApi";
import { expoService } from "../../services/expoService";
import ExpoBasicInfo from "./ExpoBasicInfo";
import ExpoHeroConfig from "./ExpoHeroConfig";
import ExpoSolutionsConfig from "./ExpoSolutionsConfig";
import ExpoWhyConfig from "./ExpoWhyConfig";
import ExpoFormConfig from "./ExpoFormConfig";
import ExpoSeoConfig from "./ExpoSeoConfig";

const TABS = [
  { id: "basic", label: "Basic Info", icon: FiCalendar },
  { id: "hero", label: "Hero & Banner", icon: FiLayout },
  { id: "solutions", label: "Packaging Solutions", icon: FiBox },
  { id: "why", label: "Why Meet Imprenta", icon: FiCheckCircle },
  { id: "form", label: "Lead Form Config", icon: FiFileText },
  { id: "seo", label: "SEO & Social", icon: FiGlobe },
];

const ExpoForm = ({ isEdit = false, initialData = null, expoId = null }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [formLoading, setFormLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      slug: "",
      shortDescription: "",
      eventDate: "",
      venue: "",
      boothNumber: "",
      city: "",
      country: "",
      status: "draft",

      heroBadge: "IMPRENTA AT THE EXPO",
      heroHeading: "",
      heroHighlightText: "",
      heroDescription: "",
      heroImage: "",
      primaryButtonText: "Schedule a Meeting",
      primaryButtonAction: "scroll_to_form",
      primaryButtonLink: "#book",
      secondaryButtonText: "Explore Solutions",
      secondaryButtonAction: "scroll_to_solutions",
      secondaryButtonLink: "#solutions",

      solutionsHeading: "Packaging Solutions",
      solutionsSubtitle: "Discover our multi-format capabilities and premium custom printing",
      solutionsEnabled: true,
      solutions: [],

      whyHeading: "Why Meet Imprenta?",
      whySubtitle: "Experience the difference of end-to-end manufacturing and creative expertise",
      whyEnabled: true,
      whyFeatures: [],
      whyCardTitle: "Elevating Brands Globally",
      whyCardDescription: "Discuss your Next-Gen packaging needs with our experts directly on the expo floor.",
      whyImage: "",

      formEnabled: true,
      formTitle: "Book a Meeting",
      formSubtitle: "Secure your dedicated time slot with our packaging experts at the booth.",
      formSubmitButtonText: "Submit Request",
      formSuccessMessage: "Thank you! Your meeting request has been submitted.",
      formFields: [],

      seoTitle: "",
      seoDescription: "",
      ogImage: "",
      canonicalUrl: "",
    }
  );

  // Hero Image file state for Cloudinary upload
  const [heroImageFile, setHeroImageFile] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name?.trim()) {
      setActiveTab("basic");
      return alert("Expo Name is required.");
    }

    try {
      setFormLoading(true);

      let finalHeroImageUrl = formData.heroImage;

      // Handle hero image file upload if selected
      if (heroImageFile) {
        const uploadData = new FormData();
        uploadData.append("image", heroImageFile);
        const uploadRes = await uploadApi.uploadImage(uploadData);
        if (uploadRes.success) {
          finalHeroImageUrl = uploadRes.image?.url || uploadRes.url || finalHeroImageUrl;
        } else {
          throw new Error(uploadRes.message || "Failed to upload hero image.");
        }
      }

      const payload = {
        ...formData,
        heroImage: finalHeroImageUrl,
        ogImage: formData.ogImage || finalHeroImageUrl,
      };

      if (isEdit) {
        await expoService.updateExpo(expoId, payload);
        alert("Expo updated successfully!");
        navigate("/expos");
      } else {
        await expoService.createExpo(payload);
        alert("Expo created successfully!");
        navigate("/expos");
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || error.message || "Operation failed.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Header & Navigation Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-2xl font-black text-white">
            {isEdit ? `Edit Expo: ${formData.name || "Untitled"}` : "Create New Expo Landing Page"}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Build dynamic, high-converting event landing pages with dedicated lead forms.
          </p>
        </div>

        {isEdit && formData.slug && (
          <a
            href={`http://localhost:5173/expo/${formData.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm font-semibold text-sky-400 hover:bg-white/10 transition w-fit"
          >
            <FiExternalLink /> View Live Page
          </a>
        )}
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all shrink-0 ${
                isActive
                  ? "bg-sky-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === "basic" && (
          <ExpoBasicInfo formData={formData} handleChange={handleChange} />
        )}

        {activeTab === "hero" && (
          <ExpoHeroConfig
            formData={formData}
            handleChange={handleChange}
            heroImageFile={heroImageFile}
            setHeroImageFile={setHeroImageFile}
          />
        )}

        {activeTab === "solutions" && (
          <ExpoSolutionsConfig formData={formData} handleChange={handleChange} />
        )}

        {activeTab === "why" && (
          <ExpoWhyConfig formData={formData} handleChange={handleChange} />
        )}

        {activeTab === "form" && (
          <ExpoFormConfig formData={formData} handleChange={handleChange} />
        )}

        {activeTab === "seo" && (
          <ExpoSeoConfig formData={formData} handleChange={handleChange} />
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-6 rounded-2xl border border-white/10 bg-[#101B2D]/90 p-4 backdrop-blur-xl z-20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400">Current Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              formData.status === "published"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
            }`}
          >
            {formData.status || "draft"}
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Link
            to="/expos"
            className="rounded-xl px-5 py-3 text-sm font-bold text-slate-400 hover:bg-white/5 hover:text-white transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={formLoading}
            className="flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-8 py-3.5 text-sm font-black text-white hover:bg-sky-400 transition disabled:opacity-50 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
          >
            <FiSave />
            {formLoading ? "Saving..." : isEdit ? "Update Expo" : "Save Expo"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExpoForm;
