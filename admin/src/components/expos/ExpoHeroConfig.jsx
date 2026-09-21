import React from "react";
import { FiLayout, FiImage, FiMousePointer } from "react-icons/fi";
import ImageUploadField from "../common/ImageUploadField";

const ExpoHeroConfig = ({ formData, handleChange, handleImageChange, heroImageFile, setHeroImageFile }) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B2D] p-6 shadow-xl space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FiLayout className="text-sky-400" /> Hero Section & Banners
        </h3>
        <p className="text-sm text-slate-400">Manage the hero badge, titles, hero background banner, and call-to-action buttons.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Hero Badge / Subtitle</label>
          <input
            type="text"
            value={formData.heroBadge || ""}
            onChange={(e) => handleChange("heroBadge", e.target.value)}
            placeholder="e.g. IMPRENTA AT PACK EXPO INTERNATIONAL 2026"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 text-sm font-semibold tracking-wider uppercase"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Highlight City / Text</label>
          <input
            type="text"
            value={formData.heroHighlightText || ""}
            onChange={(e) => handleChange("heroHighlightText", e.target.value)}
            placeholder="e.g. Chicago"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 font-medium"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-300">Hero Main Heading</label>
          <input
            type="text"
            value={formData.heroHeading || ""}
            onChange={(e) => handleChange("heroHeading", e.target.value)}
            placeholder="e.g. Meet Imprenta in Chicago"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 font-bold text-lg"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-300">Hero Description Paragraph</label>
          <textarea
            rows="3"
            value={formData.heroDescription || ""}
            onChange={(e) => handleChange("heroDescription", e.target.value)}
            placeholder="Tell visitors what to expect when they visit the booth..."
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 leading-relaxed text-sm"
          ></textarea>
        </div>

        {/* Hero Image Upload */}
        <div className="md:col-span-2">
          <ImageUploadField
            specKey="EXPO_HERO_IMAGE"
            label="Hero Showcase Banner / Image"
            required={false}
            imageFile={heroImageFile}
            setImageFile={setHeroImageFile}
            previewUrl={formData.heroImage || ""}
            onUrlChange={(url) => handleChange("heroImage", url)}
            helpText="Recommended: 1200 × 800 px landscape image. Will be used as the hero visual banner and social share image."
          />
        </div>

        {/* Action Buttons */}
        <div className="rounded-xl border border-white/5 bg-[#08111F] p-4 space-y-4">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <FiMousePointer className="text-sky-400" /> Primary CTA Button
          </h4>
          <div>
            <label className="mb-1 block text-xs text-slate-400">Button Label</label>
            <input
              type="text"
              value={formData.primaryButtonText || "Schedule a Meeting"}
              onChange={(e) => handleChange("primaryButtonText", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#101B2D] px-3 py-2 text-white outline-none focus:border-sky-500 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400">Action Type</label>
            <select
              value={formData.primaryButtonAction || "scroll_to_form"}
              onChange={(e) => handleChange("primaryButtonAction", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#101B2D] px-3 py-2 text-white outline-none focus:border-sky-500 text-sm"
            >
              <option value="scroll_to_form">Smooth Scroll to Booking Form (#book)</option>
              <option value="link">Custom External / Internal Link</option>
            </select>
          </div>
          {formData.primaryButtonAction === "link" && (
            <div>
              <label className="mb-1 block text-xs text-slate-400">Custom Target URL</label>
              <input
                type="text"
                value={formData.primaryButtonLink || ""}
                onChange={(e) => handleChange("primaryButtonLink", e.target.value)}
                placeholder="https://... or /contact"
                className="w-full rounded-lg border border-white/10 bg-[#101B2D] px-3 py-2 text-white outline-none focus:border-sky-500 text-sm"
              />
            </div>
          )}
        </div>

        <div className="rounded-xl border border-white/5 bg-[#08111F] p-4 space-y-4">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <FiMousePointer className="text-slate-400" /> Secondary CTA Button
          </h4>
          <div>
            <label className="mb-1 block text-xs text-slate-400">Button Label</label>
            <input
              type="text"
              value={formData.secondaryButtonText || "Explore Solutions"}
              onChange={(e) => handleChange("secondaryButtonText", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#101B2D] px-3 py-2 text-white outline-none focus:border-sky-500 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400">Action Type</label>
            <select
              value={formData.secondaryButtonAction || "scroll_to_solutions"}
              onChange={(e) => handleChange("secondaryButtonAction", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#101B2D] px-3 py-2 text-white outline-none focus:border-sky-500 text-sm"
            >
              <option value="scroll_to_solutions">Smooth Scroll to Solutions (#solutions)</option>
              <option value="link">Custom Target URL</option>
            </select>
          </div>
          {formData.secondaryButtonAction === "link" && (
            <div>
              <label className="mb-1 block text-xs text-slate-400">Custom Target URL</label>
              <input
                type="text"
                value={formData.secondaryButtonLink || ""}
                onChange={(e) => handleChange("secondaryButtonLink", e.target.value)}
                placeholder="/products"
                className="w-full rounded-lg border border-white/10 bg-[#101B2D] px-3 py-2 text-white outline-none focus:border-sky-500 text-sm"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExpoHeroConfig;
