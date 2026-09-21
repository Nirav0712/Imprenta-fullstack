import { useState, useEffect, useRef } from "react";
import { FiUploadCloud, FiTrash2, FiImage, FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";
import { IMAGE_SPECS, validateImageFile } from "../../config/imageSpecs";
import { uploadService } from "../../services/uploadService";

/**
 * Reusable Image Upload Field with Dynamic Specification Display and Validation
 *
 * Props:
 * - slotKey: string (key from IMAGE_SPECS, e.g. "CATEGORY_IMAGE", "HOMEPAGE_HERO", "BLOG_FEATURED_IMAGE", "NEWSLETTER_IMAGE")
 * - label: string (optional override for field label)
 * - value: string (existing image URL)
 * - onChange: function(urlOrFile, metadata) -> called when image changes
 * - autoUpload: boolean (if true, automatically uploads to server on valid select)
 * - disabled: boolean
 * - required: boolean
 */
const ImageUploadField = ({
  slotKey = "PRODUCT_IMAGE",
  label,
  value = "",
  onChange,
  autoUpload = false,
  disabled = false,
  required = false,
  className = "",
}) => {
  const spec = IMAGE_SPECS[slotKey] || IMAGE_SPECS.PRODUCT_IMAGE;
  const fileInputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState(value || "");
  const [detectedDimensions, setDetectedDimensions] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setPreviewUrl(value || "");
    if (value && !detectedDimensions) {
      // Measure natural dimensions of existing image
      const img = new Image();
      img.onload = () => {
        setDetectedDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = value;
    }
  }, [value]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValidationError("");
    setIsValidating(true);

    try {
      const validation = await validateImageFile(spec, file);

      if (!validation.isValid) {
        setValidationError(validation.error);
        setDetectedDimensions({ width: validation.width, height: validation.height });
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      setDetectedDimensions({ width: validation.width, height: validation.height });
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);

      if (autoUpload) {
        setIsUploading(true);
        try {
          const res = await uploadService.uploadImage(file, slotKey);
          if (res.success && res.image?.url) {
            setPreviewUrl(res.image.url);
            onChange?.(res.image.url, { file, dimensions: validation });
          } else {
            throw new Error(res.message || "Failed to upload image.");
          }
        } catch (uploadErr) {
          console.error("Upload error:", uploadErr);
          setValidationError(uploadErr.response?.data?.message || uploadErr.message || "Image upload failed.");
          setPreviewUrl(value || "");
        } finally {
          setIsUploading(false);
        }
      } else {
        // Pass file & preview for deferred submission
        onChange?.(file, { previewUrl: localPreview, dimensions: validation });
      }
    } catch (err) {
      console.error("Validation error:", err);
      setValidationError("Failed to process image file.");
    } finally {
      setIsValidating(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPreviewUrl("");
    setDetectedDimensions(null);
    setValidationError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    onChange?.("", null);
  };

  const fieldTitle = label || spec.name;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Field Header & Label */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-sm font-semibold text-slate-300">
          {fieldTitle} {required && <span className="text-red-500">*</span>}
        </label>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-sky-500/10 px-2.5 py-0.5 text-xs font-semibold text-sky-400 border border-sky-500/20">
          {spec.aspectRatio && spec.aspectRatio !== "flexible" ? `Ratio: ${spec.aspectRatio}` : "Flexible"}
        </span>
      </div>

      {/* Dynamic Specification Info Box */}
      <div className="rounded-xl border border-white/5 bg-[#08111F] p-3.5 text-xs text-slate-400 space-y-1.5">
        <div className="flex items-center gap-1.5 font-medium text-slate-300">
          <FiInfo size={14} className="text-sky-400 shrink-0" />
          <span>Upload Specification Requirements:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
          <div className="bg-white/5 px-2.5 py-1.5 rounded-lg">
            <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Required</span>
            <span className="text-white font-bold">{spec.recommendedDimensions}</span>
          </div>
          <div className="bg-white/5 px-2.5 py-1.5 rounded-lg">
            <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Aspect Ratio</span>
            <span className="text-white font-bold">{spec.aspectRatio || "Free"}</span>
          </div>
          <div className="bg-white/5 px-2.5 py-1.5 rounded-lg">
            <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Allowed Formats</span>
            <span className="text-white font-bold">{spec.allowedExtensions.join(", ").toUpperCase()}</span>
          </div>
          <div className="bg-white/5 px-2.5 py-1.5 rounded-lg">
            <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Max Size</span>
            <span className="text-white font-bold">{spec.maxSizeMB} MB</span>
          </div>
        </div>
      </div>

      {/* Error Message Callout */}
      {validationError && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
          <FiAlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
          <div className="flex-1 font-medium">{validationError}</div>
        </div>
      )}

      {/* Upload & Preview Area */}
      {previewUrl ? (
        <div className="relative rounded-2xl border border-white/10 bg-[#0A1220] p-4 flex flex-col sm:flex-row items-center gap-5">
          {/* Thumbnail Preview */}
          <div className="relative w-32 h-28 sm:w-36 sm:h-28 rounded-xl overflow-hidden bg-[#08111F] border border-white/10 flex items-center justify-center shrink-0">
            <img
              src={previewUrl}
              alt="Uploaded preview"
              className={`w-full h-full ${spec.fitMode === "contain" ? "object-contain" : "object-cover"}`}
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-sky-400 text-xs font-semibold gap-1">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-sky-400 border-t-transparent"></div>
                <span>Uploading...</span>
              </div>
            )}
          </div>

          {/* Details & Action Buttons */}
          <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left w-full">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <FiCheckCircle size={12} /> Image Loaded
              </span>
              {detectedDimensions?.width > 0 && (
                <span className="text-xs font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md">
                  {detectedDimensions.width} × {detectedDimensions.height} px
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 truncate">
              {previewUrl.startsWith("data:") || previewUrl.startsWith("blob:") ? "Local preview (ready to save)" : previewUrl}
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
              <button
                type="button"
                disabled={disabled || isUploading || isValidating}
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
              >
                <FiUploadCloud size={14} /> Replace Image
              </button>
              <button
                type="button"
                disabled={disabled || isUploading || isValidating}
                onClick={handleRemove}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-red-500/10 border border-red-500/20 px-3.5 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
              >
                <FiTrash2 size={14} /> Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Upload Dropzone */
        <div
          onClick={() => !disabled && !isValidating && !isUploading && fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-7 text-center transition-all duration-200 flex flex-col items-center justify-center gap-3 bg-[#08111F] ${
            validationError
              ? "border-red-500/40 hover:border-red-400 bg-red-500/5"
              : "border-slate-700 hover:border-sky-500 hover:bg-sky-500/5"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div className="rounded-full bg-sky-500/10 p-3 text-sky-400 border border-sky-500/20">
            <FiUploadCloud size={28} />
          </div>
          <div>
            <span className="text-sm font-bold text-white block">Click to select image</span>
            <span className="text-xs text-slate-400 block mt-1">
              Supports {spec.allowedExtensions.join(", ").toUpperCase()} (up to {spec.maxSizeMB}MB)
            </span>
          </div>
          <span className="inline-block text-[11px] font-mono text-sky-400 font-semibold bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
            Recommended: {spec.recommendedDimensions}
          </span>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={spec.allowedFormats?.join(",") || "image/jpeg,image/png,image/webp"}
        disabled={disabled || isUploading || isValidating}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploadField;
