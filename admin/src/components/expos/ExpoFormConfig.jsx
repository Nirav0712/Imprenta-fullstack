import React from "react";
import { FiFileText, FiPlus, FiTrash2, FiSettings, FiCheckSquare } from "react-icons/fi";

const FIELD_TYPES = [
  { value: "text", label: "Single Line Text (text)" },
  { value: "email", label: "Email Address (email)" },
  { value: "tel", label: "Phone / WhatsApp (tel)" },
  { value: "select", label: "Dropdown Select (select)" },
  { value: "date", label: "Date Picker (date)" },
  { value: "textarea", label: "Multi-line Text (textarea)" },
];

const ExpoFormConfig = ({ formData, handleChange }) => {
  const formFields = formData.formFields || [];

  const handleFieldChange = (index, field, value) => {
    const updated = [...formFields];
    updated[index] = { ...updated[index], [field]: value };
    handleChange("formFields", updated);
  };

  const handleOptionsChange = (index, optionsString) => {
    const optionsArray = optionsString
      .split(",")
      .map((opt) => opt.trim())
      .filter(Boolean);
    handleFieldChange(index, "options", optionsArray);
  };

  const addField = () => {
    const newFieldId = `custom_field_${Date.now()}`;
    const newField = {
      fieldId: newFieldId,
      label: "New Form Field",
      placeholder: "Enter details...",
      type: "text",
      required: false,
      options: [],
      order: formFields.length + 1,
      active: true,
    };
    handleChange("formFields", [...formFields, newField]);
  };

  const removeField = (index) => {
    const updated = formFields.filter((_, i) => i !== index);
    handleChange("formFields", updated);
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-[#101B2D] p-6 shadow-xl space-y-6">
      <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FiFileText className="text-sky-400" /> Expo Booking Form Configuration
          </h3>
          <p className="text-sm text-slate-400">
            Configure the dedicated lead capture form for this Expo. All submissions are automatically attributed to this Expo.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-300">
            <input
              type="checkbox"
              checked={formData.formEnabled !== false}
              onChange={(e) => handleChange("formEnabled", e.target.checked)}
              className="rounded accent-sky-500 w-4 h-4"
            />
            Enable Form
          </label>

          <button
            type="button"
            onClick={addField}
            className="flex items-center gap-2 rounded-xl bg-sky-500/20 border border-sky-400/30 px-4 py-2 text-sm font-semibold text-sky-400 hover:bg-sky-500/30 transition"
          >
            <FiPlus /> Add Field
          </button>
        </div>
      </div>

      {/* Form Titles & Copy */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Form Title</label>
          <input
            type="text"
            value={formData.formTitle || ""}
            onChange={(e) => handleChange("formTitle", e.target.value)}
            placeholder="Book a Meeting"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 font-bold"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">Submit Button Text</label>
          <input
            type="text"
            value={formData.formSubmitButtonText || ""}
            onChange={(e) => handleChange("formSubmitButtonText", e.target.value)}
            placeholder="Submit Request"
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 font-bold text-sky-400"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-300">Form Subtitle / Instructions</label>
          <input
            type="text"
            value={formData.formSubtitle || ""}
            onChange={(e) => handleChange("formSubtitle", e.target.value)}
            placeholder="Secure your time slot with our team in Chicago."
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-300">Submission Success Message</label>
          <input
            type="text"
            value={formData.formSuccessMessage || ""}
            onChange={(e) => handleChange("formSuccessMessage", e.target.value)}
            placeholder="Thank you! Your meeting request has been submitted."
            className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-white outline-none focus:border-sky-500 text-sm"
          />
        </div>
      </div>

      {/* Form Fields List */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <h4 className="text-sm font-bold text-slate-300">Configured Form Fields</h4>

        <div className="space-y-3">
          {formFields.map((field, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-[#08111F] p-4 transition-all"
            >
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Field #{index + 1}: <span className="text-white font-mono">{field.fieldId}</span>
                </span>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.required || false}
                      onChange={(e) => handleFieldChange(index, "required", e.target.checked)}
                      className="rounded accent-sky-500"
                    />
                    Required
                  </label>

                  <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.active !== false}
                      onChange={(e) => handleFieldChange(index, "active", e.target.checked)}
                      className="rounded accent-sky-500"
                    />
                    Active
                  </label>

                  {/* Core fields should not be deleted, but custom can be */}
                  {index >= 5 && (
                    <button
                      type="button"
                      onClick={() => removeField(index)}
                      className="text-red-400 hover:text-red-300 transition p-1"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Field Label</label>
                  <input
                    type="text"
                    value={field.label || ""}
                    onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                    placeholder="Field Label"
                    className="w-full rounded-lg border border-white/10 bg-[#101B2D] px-3 py-2 text-white outline-none focus:border-sky-500 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-slate-400">Placeholder Text</label>
                  <input
                    type="text"
                    value={field.placeholder || ""}
                    onChange={(e) => handleFieldChange(index, "placeholder", e.target.value)}
                    placeholder="Placeholder..."
                    className="w-full rounded-lg border border-white/10 bg-[#101B2D] px-3 py-2 text-white outline-none focus:border-sky-500 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-slate-400">Field Input Type</label>
                  <select
                    value={field.type || "text"}
                    onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#101B2D] px-3 py-2 text-white outline-none focus:border-sky-500 text-sm"
                  >
                    {FIELD_TYPES.map((ft) => (
                      <option key={ft.value} value={ft.value}>
                        {ft.label}
                      </option>
                    ))}
                  </select>
                </div>

                {field.type === "select" && (
                  <div className="sm:col-span-2 md:col-span-3">
                    <label className="mb-1 block text-xs text-slate-400">
                      Dropdown Options (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={(field.options || []).join(", ")}
                      onChange={(e) => handleOptionsChange(index, e.target.value)}
                      placeholder="Option 1, Option 2, Option 3..."
                      className="w-full rounded-lg border border-white/10 bg-[#101B2D] px-3 py-2 text-white outline-none focus:border-sky-500 text-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpoFormConfig;
