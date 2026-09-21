import React from "react";
import { FiBox, FiPlus, FiTrash2, FiCheckCircle } from "react-icons/fi";

const ICON_OPTIONS = [
  { value: "FiTag", label: "Tag / Labels (FiTag)" },
  { value: "FiBox", label: "Box / Cartons (FiBox)" },
  { value: "FiLayers", label: "Layers / Sleeves (FiLayers)" },
  { value: "FiPackage", label: "Package / Pouches (FiPackage)" },
  { value: "FiFeather", label: "Feather / Tubes (FiFeather)" },
  { value: "FiEdit3", label: "Design / Branding (FiEdit3)" },
  { value: "FiShield", label: "Shield / Security (FiShield)" },
  { value: "FiAward", label: "Award / Premium (FiAward)" },
];

const ExpoSolutionsConfig = ({ formData, handleChange }) => {
  const solutions = formData.solutions || [];

  const handleSolutionChange = (index, field, value) => {
    const updated = [...solutions];
    updated[index] = { ...updated[index], [field]: value };
    handleChange("solutions", updated);
  };

  const addSolution = () => {
    const newSolution = {
      title: "New Packaging Solution",
      description: "Description of packaging capability...",
      icon: "FiBox",
      isHighlight: false,
      active: true,
      order: solutions.length + 1,
    };
    handleChange("solutions", [...solutions, newSolution]);
  };

  const removeSolution = (index) => {
    const updated = solutions.filter((_, i) => i !== index);
    handleChange("solutions", updated);
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B2D] p-6 shadow-xl space-y-6">
      <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FiBox className="text-sky-400" /> Packaging Solutions Cards
          </h3>
          <p className="text-sm text-slate-400">Configure the packaging solution capability cards showcased at the Expo.</p>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-300">
            <input
              type="checkbox"
              checked={formData.solutionsEnabled !== false}
              onChange={(e) => handleChange("solutionsEnabled", e.target.checked)}
              className="rounded accent-sky-500 w-4 h-4"
            />
            Show Section
          </label>

          <button
            type="button"
            onClick={addSolution}
            className="flex items-center gap-2 rounded-xl bg-sky-500/20 border border-sky-400/30 px-4 py-2 text-sm font-semibold text-sky-400 hover:bg-sky-500/30 transition"
          >
            <FiPlus /> Add Solution Card
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Section Title</label>
          <input
            type="text"
            value={formData.solutionsHeading || ""}
            onChange={(e) => handleChange("solutionsHeading", e.target.value)}
            placeholder="Packaging Solutions"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Section Subtitle</label>
          <input
            type="text"
            value={formData.solutionsSubtitle || ""}
            onChange={(e) => handleChange("solutionsSubtitle", e.target.value)}
            placeholder="Discover our multi-format capabilities"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Solutions Cards Grid */}
      <div className="space-y-4">
        {solutions.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl border p-4 transition-all ${
              item.isHighlight
                ? "border-sky-500/50 bg-sky-500/5"
                : "border-white/10 bg-[#08111F]"
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Card #{index + 1} {item.isHighlight && "• (Highlighted Feature Card)"}
              </span>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.isHighlight || false}
                    onChange={(e) => handleSolutionChange(index, "isHighlight", e.target.checked)}
                    className="rounded accent-sky-500"
                  />
                  Highlight
                </label>

                <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.active !== false}
                    onChange={(e) => handleSolutionChange(index, "active", e.target.checked)}
                    className="rounded accent-sky-500"
                  />
                  Active
                </label>

                <button
                  type="button"
                  onClick={() => removeSolution(index)}
                  className="text-red-400 hover:text-red-300 transition p-1"
                  title="Remove card"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-4">
                <label className="mb-1 block text-xs text-slate-400">Card Title</label>
                <input
                  type="text"
                  value={item.title || ""}
                  onChange={(e) => handleSolutionChange(index, "title", e.target.value)}
                  placeholder="e.g. Premium Labels"
                  className="w-full rounded-lg border border-white/10 bg-[#101B2D] px-3 py-2 text-white outline-none focus:border-sky-500 text-sm font-semibold"
                />
              </div>

              <div className="md:col-span-3">
                <label className="mb-1 block text-xs text-slate-400">Icon</label>
                <select
                  value={item.icon || "FiBox"}
                  onChange={(e) => handleSolutionChange(index, "icon", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#101B2D] px-3 py-2 text-white outline-none focus:border-sky-500 text-sm"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-5">
                <label className="mb-1 block text-xs text-slate-400">Short Description</label>
                <input
                  type="text"
                  value={item.description || ""}
                  onChange={(e) => handleSolutionChange(index, "description", e.target.value)}
                  placeholder="Brief description of the product or service..."
                  className="w-full rounded-lg border border-white/10 bg-[#101B2D] px-3 py-2 text-white outline-none focus:border-sky-500 text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpoSolutionsConfig;
