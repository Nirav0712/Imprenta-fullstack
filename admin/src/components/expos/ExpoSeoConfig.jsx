import React from "react";
import { FiGlobe } from "react-icons/fi";

const ExpoSeoConfig = ({ formData, handleChange }) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B2D] p-6 shadow-xl space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FiGlobe className="text-sky-400" /> Search Engine Optimization & Social Sharing
        </h3>
        <p className="text-sm text-slate-400">Configure page title, meta description, and social share tags for this landing page.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-300">SEO Meta Title</label>
          <input
            type="text"
            value={formData.seoTitle || ""}
            onChange={(e) => handleChange("seoTitle", e.target.value)}
            placeholder="e.g. Imprenta at PACK EXPO International 2026 | Chicago"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 font-medium"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-300">SEO Meta Description</label>
          <textarea
            rows="3"
            value={formData.seoDescription || ""}
            onChange={(e) => handleChange("seoDescription", e.target.value)}
            placeholder="Meta description for search engines and social links..."
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 text-sm"
          ></textarea>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Canonical URL (Optional)</label>
          <input
            type="text"
            value={formData.canonicalUrl || ""}
            onChange={(e) => handleChange("canonicalUrl", e.target.value)}
            placeholder="https://imprenta.in/expo/pack-expo-chicago-2026"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 text-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default ExpoSeoConfig;
