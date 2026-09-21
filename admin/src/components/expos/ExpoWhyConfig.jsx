import React from "react";
import { FiCheckCircle, FiPlus, FiTrash2, FiHelpCircle } from "react-icons/fi";

const ExpoWhyConfig = ({ formData, handleChange }) => {
  const whyFeatures = formData.whyFeatures || [];

  const handleFeatureChange = (index, value) => {
    const updated = [...whyFeatures];
    updated[index] = value;
    handleChange("whyFeatures", updated);
  };

  const addFeature = () => {
    handleChange("whyFeatures", [...whyFeatures, "New capability benefit..."]);
  };

  const removeFeature = (index) => {
    const updated = whyFeatures.filter((_, i) => i !== index);
    handleChange("whyFeatures", updated);
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B2D] p-6 shadow-xl space-y-6">
      <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FiCheckCircle className="text-sky-400" /> "Why Meet Imprenta?" Section
          </h3>
          <p className="text-sm text-slate-400">Configure key bullet advantages, brand credibility highlights, and right-column callout card.</p>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-300">
            <input
              type="checkbox"
              checked={formData.whyEnabled !== false}
              onChange={(e) => handleChange("whyEnabled", e.target.checked)}
              className="rounded accent-sky-500 w-4 h-4"
            />
            Show Section
          </label>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Section Heading</label>
          <input
            type="text"
            value={formData.whyHeading || ""}
            onChange={(e) => handleChange("whyHeading", e.target.value)}
            placeholder="Why Meet Imprenta?"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Section Subtitle</label>
          <input
            type="text"
            value={formData.whySubtitle || ""}
            onChange={(e) => handleChange("whySubtitle", e.target.value)}
            placeholder="Discover how we help brands scale"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
          />
        </div>

        {/* Feature List */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-300">Bullet Points / Key Features</label>
            <button
              type="button"
              onClick={addFeature}
              className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition"
            >
              <FiPlus /> Add Feature Point
            </button>
          </div>

          <div className="space-y-2">
            {whyFeatures.map((feat, index) => (
              <div key={index} className="flex items-center gap-2">
                <FiCheckCircle className="text-sky-400 shrink-0" size={18} />
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="e.g. Multi-format packaging capabilities"
                  className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-2.5 text-white outline-none focus:border-sky-500 text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-400 hover:text-red-300 transition p-2"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Card Details */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Right Callout Card Title</label>
          <input
            type="text"
            value={formData.whyCardTitle || ""}
            onChange={(e) => handleChange("whyCardTitle", e.target.value)}
            placeholder="Elevating Brands Globally"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 font-bold"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Right Callout Card Description</label>
          <textarea
            rows="2"
            value={formData.whyCardDescription || ""}
            onChange={(e) => handleChange("whyCardDescription", e.target.value)}
            placeholder="Discuss your Next-Gen packaging needs with our experts directly on the expo floor."
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 resize-none text-sm"
          ></textarea>
        </div>
      </div>
    </section>
  );
};

export default ExpoWhyConfig;
