import React from "react";
import { FiCalendar, FiMapPin, FiGlobe, FiTag } from "react-icons/fi";

const ExpoBasicInfo = ({ formData, handleChange }) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B2D] p-6 shadow-xl space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FiCalendar className="text-sky-400" /> Basic & Event Information
        </h3>
        <p className="text-sm text-slate-400">Configure the primary details, dates, venue, and status of the Expo.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Expo / Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Pack Expo Chicago 2026"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 font-medium"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            URL Slug <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center rounded-xl border border-white/10 bg-[#08111F] px-3">
            <span className="text-slate-500 text-sm font-mono select-none">/expo/</span>
            <input
              type="text"
              required
              value={formData.slug || ""}
              onChange={(e) => handleChange("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
              placeholder="pack-expo-chicago-2026"
              className="w-full bg-transparent px-2 py-3 text-white outline-none focus:border-transparent font-mono text-sm"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Publish Status</label>
          <select
            value={formData.status || "draft"}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 h-[48px] font-medium"
          >
            <option value="draft">Draft (Hidden from Public)</option>
            <option value="published">Published (Live at /expo/:slug)</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Display Event Date / Range
          </label>
          <input
            type="text"
            value={formData.eventDate || ""}
            onChange={(e) => handleChange("eventDate", e.target.value)}
            placeholder="e.g. October 18–21, 2026"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Booth / Stall Number</label>
          <input
            type="text"
            value={formData.boothNumber || ""}
            onChange={(e) => handleChange("boothNumber", e.target.value)}
            placeholder="e.g. Booth No. W39062 (West Hall)"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Venue Center</label>
          <input
            type="text"
            value={formData.venue || ""}
            onChange={(e) => handleChange("venue", e.target.value)}
            placeholder="e.g. McCormick Place"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">City, State / Region</label>
          <input
            type="text"
            value={formData.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="e.g. Chicago, Illinois"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Country</label>
          <input
            type="text"
            value={formData.country || ""}
            onChange={(e) => handleChange("country", e.target.value)}
            placeholder="e.g. USA"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Short Summary / Description</label>
          <textarea
            rows="2"
            value={formData.shortDescription || ""}
            onChange={(e) => handleChange("shortDescription", e.target.value)}
            placeholder="Brief overview of Imprenta's participation..."
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 resize-none text-sm"
          ></textarea>
        </div>
      </div>
    </section>
  );
};

export default ExpoBasicInfo;
