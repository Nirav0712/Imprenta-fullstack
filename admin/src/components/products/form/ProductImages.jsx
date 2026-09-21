import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { uploadService } from "../../../services/uploadService";
import { IMAGE_SPECS, validateImageFile } from "../../../config/imageSpecs";

import {
  FiUploadCloud,
  FiTrash2,
  FiStar,
  FiImage,
  FiInfo,
  FiAlertCircle,
} from "react-icons/fi";

const ProductImages = () => {
  const { setValue } = useFormContext();
  const spec = IMAGE_SPECS.PRODUCT_IMAGE;

  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const MAX_IMAGES = 10;

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setErrorMessage("");

      if (images.length + acceptedFiles.length > MAX_IMAGES) {
        setErrorMessage(`Maximum ${MAX_IMAGES} images allowed.`);
        return;
      }

      setUploading(true);

      try {
        const uploadedImages = [];

        for (const file of acceptedFiles) {
          // Pre-upload client validation against specification
          const validation = await validateImageFile(spec, file);
          if (!validation.isValid) {
            setErrorMessage(`${file.name}: ${validation.error}`);
            continue;
          }

          const response = await uploadService.uploadImage(file, "PRODUCT_IMAGE");

          uploadedImages.push({
            url: response.image.url,
            preview: response.image.url,
            public_id: response.image.public_id,
            width: response.image.width || validation.width,
            height: response.image.height || validation.height,
            featured:
              images.length === 0 &&
              uploadedImages.length === 0,
          });
        }

        if (uploadedImages.length > 0) {
          const updated = [...images, ...uploadedImages];
          setImages(updated);
          setValue("images", updated, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }
      } catch (error) {
        console.error(error);
        setErrorMessage(error.response?.data?.message || "Image upload failed.");
      } finally {
        setUploading(false);
      }
    },
    [images, setValue, spec]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: true,
    disabled: uploading || images.length >= MAX_IMAGES,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
  });

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);

    if (
      updatedImages.length > 0 &&
      !updatedImages.some((img) => img.featured)
    ) {
      updatedImages[0].featured = true;
    }

    setImages(updatedImages);
    setValue("images", updatedImages, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const setFeatured = (index) => {
    const updated = images.map((img, i) => ({
      ...img,
      featured: i === index,
    }));

    setImages(updated);
    setValue("images", updated, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Product Images
        </h2>
        <span className="rounded-md bg-sky-500/10 px-2.5 py-0.5 text-xs font-semibold text-sky-400 border border-sky-500/20">
          Ratio: 1:1
        </span>
      </div>

      {/* Dynamic Specification Info Box */}
      <div className="mt-4 rounded-xl border border-white/5 bg-[#08111F] p-3.5 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-1.5 font-medium text-slate-300">
          <FiInfo size={14} className="text-sky-400 shrink-0" />
          <span>Image Specification Requirements:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
          <div className="bg-white/5 px-2.5 py-1.5 rounded-lg">
            <span className="text-slate-500 block text-[10px] uppercase">Dimensions</span>
            <span className="text-white font-bold">{spec.recommendedDimensions}</span>
          </div>
          <div className="bg-white/5 px-2.5 py-1.5 rounded-lg">
            <span className="text-slate-500 block text-[10px] uppercase">Aspect Ratio</span>
            <span className="text-white font-bold">{spec.aspectRatio} (Square)</span>
          </div>
          <div className="bg-white/5 px-2.5 py-1.5 rounded-lg">
            <span className="text-slate-500 block text-[10px] uppercase">Formats</span>
            <span className="text-white font-bold">{spec.allowedExtensions.join(", ").toUpperCase()}</span>
          </div>
          <div className="bg-white/5 px-2.5 py-1.5 rounded-lg">
            <span className="text-slate-500 block text-[10px] uppercase">Max Size</span>
            <span className="text-white font-bold">{spec.maxSizeMB} MB Each</span>
          </div>
        </div>
      </div>

      {/* Error Callout */}
      {errorMessage && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
          <FiAlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
          <div className="flex-1 font-medium">{errorMessage}</div>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-300">
            {images.length} / {MAX_IMAGES} Images Uploaded
          </p>
          <p className="mt-1 text-xs text-slate-500">
            First uploaded image becomes Featured automatically.
          </p>
        </div>

        {images.length > 0 && (
          <span className="rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-400">
            Gallery
          </span>
        )}
      </div>

      {/* Upload Box */}
      <div
        {...(images.length < MAX_IMAGES ? getRootProps() : {})}
        style={{
          pointerEvents: uploading ? "none" : "auto",
        }}
        className={`
          mt-6
          rounded-3xl
          border-2
          border-dashed
          bg-[#08111F]
          p-8
          transition-all
          duration-300
          ${
            images.length >= MAX_IMAGES
              ? "cursor-not-allowed border-red-500 opacity-70"
              : "cursor-pointer border-slate-600 hover:border-sky-500"
          }
        `}
      >
        {images.length < MAX_IMAGES && (
          <input
            {...getInputProps()}
            disabled={uploading}
          />
        )}

        <div className="flex flex-col items-center">
          <FiUploadCloud
            size={48}
            className="text-sky-400"
          />

          {uploading && (
            <p className="my-2 text-sky-400 font-semibold">
              Uploading & Validating Images...
            </p>
          )}

          <h3 className="mt-4 text-lg font-bold text-white">
            {images.length >= MAX_IMAGES
              ? "Maximum Images Uploaded"
              : isDragActive
              ? "Drop Images Here"
              : "Drag & Drop Product Images"}
          </h3>

          <p className="mt-2 text-slate-400 text-sm">
            {images.length >= MAX_IMAGES
              ? "Delete an image to upload another."
              : "or click to browse"}
          </p>

          <p className="mt-3 text-xs text-slate-500 font-mono">
            Requires 1:1 Aspect Ratio (Min 600×600 px) • Max {MAX_IMAGES} Images
          </p>
        </div>
      </div>


        {/* Preview */}

      {images.length > 0 && (

        <div
          className="
            mt-8
            grid
            grid-cols-2
            gap-4

            sm:grid-cols-3

            xl:grid-cols-2

            2xl:grid-cols-3
          "
        >

          {images.map((img, index) => (

            <div
             key={img.public_id || img.preview}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                transition-all
                duration-300
                hover:border-sky-500
                hover:shadow-lg
                hover:shadow-sky-500/10
              "
            >

              <img
                src={img.preview}
                alt={`Preview ${index + 1}`}
                className="
                  h-40
                  w-full
                  object-contain
                  p-2
                  bg-[#08111F]
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />

              {img.width && img.height && (
                <div className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-mono text-slate-300 backdrop-blur-sm border border-white/10">
                  {img.width}×{img.height}
                </div>
              )}

              <div
                className="
                  absolute
                  right-3
                  top-3
                  flex
                  gap-2
                  opacity-0
                  transition-all
                  duration-300
                  group-hover:opacity-100
                "
              >
                <button
                  type="button"
                  onClick={() => setFeatured(index)}
                  className={`rounded-full p-2 ${
                    img.featured
                      ? "bg-yellow-500 text-white"
                      : "bg-black/60 text-white"
                  }`}
                >
                  <FiStar />
                </button>

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="rounded-full bg-red-500 p-2 text-white"
                >
                  <FiTrash2 />
                </button>
              </div>

              {img.featured && (
                <div className="absolute bottom-3 left-3 rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-white">
                  Featured
                </div>
              )}
            </div>
          ))}

        </div>

      )}

      {/* Empty State */}

      {images.length === 0 && (

        <div className="mt-8 flex h-40 items-center justify-center rounded-2xl border border-dashed border-white/10">

          <div className="text-center">

            <FiImage
              size={40}
              className="mx-auto text-slate-500"
            />

            <p className="mt-3 text-slate-500">

              No Images Uploaded

            </p>

          </div>

        </div>

      )}

    </section>

  );

};

export default ProductImages;