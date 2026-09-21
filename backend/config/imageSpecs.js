/**
 * Centralized Image Specifications for Imprenta Platform
 * Defines required dimensions, aspect ratios, file size limits, and validation rules for all image slots.
 */

export const IMAGE_SPECS = {
  HOMEPAGE_HERO: {
    key: "HOMEPAGE_HERO",
    name: "Homepage Hero / Slide Image",
    description: "Main showcase image for the hero slider and homepage",
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    aspectRatio: "4:3",
    aspectRatioValue: 4 / 3,
    aspectRatioTolerance: 0.05,
    allowedFormats: ["image/jpeg", "image/png", "image/webp"],
    allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    maxSizeBytes: 5 * 1024 * 1024,
    maxSizeMB: 5,
    validationMode: "exact",
    fitMode: "contain",
    recommendedDimensions: "800 × 600 px",
  },

  CATEGORY_IMAGE: {
    key: "CATEGORY_IMAGE",
    name: "Category Cover Image",
    description: "Featured visual for category cards and navigation",
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 450,
    aspectRatio: "4:3",
    aspectRatioValue: 1.333,
    aspectRatioTolerance: 0.15,
    allowedFormats: ["image/jpeg", "image/png", "image/webp"],
    allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    maxSizeBytes: 5 * 1024 * 1024,
    maxSizeMB: 5,
    validationMode: "aspect_ratio_min_dimensions",
    fitMode: "cover",
    recommendedDimensions: "800 × 600 px (4:3)",
  },

  PRODUCT_IMAGE: {
    key: "PRODUCT_IMAGE",
    name: "Product Image",
    description: "Product main image and gallery images",
    width: 800,
    height: 800,
    minWidth: 600,
    minHeight: 600,
    aspectRatio: "1:1",
    aspectRatioValue: 1.0,
    aspectRatioTolerance: 0.08,
    allowedFormats: ["image/jpeg", "image/png", "image/webp"],
    allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    maxSizeBytes: 5 * 1024 * 1024,
    maxSizeMB: 5,
    validationMode: "aspect_ratio_min_dimensions",
    fitMode: "contain",
    recommendedDimensions: "800 × 800 px (1:1)",
  },

  PRODUCT_THUMBNAIL: {
    key: "PRODUCT_THUMBNAIL",
    name: "Product Thumbnail",
    description: "Thumbnail preview in cart, search, and galleries",
    width: 200,
    height: 200,
    minWidth: 150,
    minHeight: 150,
    aspectRatio: "1:1",
    aspectRatioValue: 1.0,
    aspectRatioTolerance: 0.08,
    allowedFormats: ["image/jpeg", "image/png", "image/webp"],
    allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    maxSizeBytes: 2 * 1024 * 1024,
    maxSizeMB: 2,
    validationMode: "aspect_ratio_min_dimensions",
    fitMode: "contain",
    recommendedDimensions: "200 × 200 px (1:1)",
  },

  BLOG_FEATURED_IMAGE: {
    key: "BLOG_FEATURED_IMAGE",
    name: "Blog Featured Image",
    description: "Featured article banner and blog list preview",
    width: 1200,
    height: 675,
    minWidth: 800,
    minHeight: 450,
    aspectRatio: "16:9",
    aspectRatioValue: 1.777,
    aspectRatioTolerance: 0.12,
    allowedFormats: ["image/jpeg", "image/png", "image/webp"],
    allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    maxSizeBytes: 5 * 1024 * 1024,
    maxSizeMB: 5,
    validationMode: "aspect_ratio_min_dimensions",
    fitMode: "cover",
    recommendedDimensions: "1200 × 675 px (16:9)",
  },

  NEWSLETTER_IMAGE: {
    key: "NEWSLETTER_IMAGE",
    name: "Newsletter Section Image",
    description: "Homepage newsletter / call-to-action visual",
    width: 800,
    height: 800,
    minWidth: 500,
    minHeight: 500,
    aspectRatio: "1:1",
    aspectRatioValue: 1.0,
    aspectRatioTolerance: 0.1,
    allowedFormats: ["image/jpeg", "image/png", "image/webp"],
    allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    maxSizeBytes: 5 * 1024 * 1024,
    maxSizeMB: 5,
    validationMode: "aspect_ratio_min_dimensions",
    fitMode: "cover",
    recommendedDimensions: "800 × 800 px (1:1)",
  },

  SITE_LOGO: {
    key: "SITE_LOGO",
    name: "Website Logo",
    description: "Brand logo for header and footer",
    width: 400,
    height: 120,
    minWidth: 200,
    minHeight: 50,
    aspectRatio: "flexible",
    aspectRatioValue: null,
    aspectRatioTolerance: null,
    allowedFormats: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
    allowedExtensions: ["jpg", "jpeg", "png", "webp", "svg"],
    maxSizeBytes: 2 * 1024 * 1024,
    maxSizeMB: 2,
    validationMode: "flexible",
    fitMode: "contain",
    recommendedDimensions: "400 × 120 px (Transparent PNG / SVG)",
  },
  EXPO_HERO_IMAGE: {
    key: "EXPO_HERO_IMAGE",
    name: "Expo Hero / Slide Image",
    description: "High-resolution hero banner or background slide for dynamic Expo pages",
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 500,
    aspectRatio: "flexible",
    aspectRatioValue: null,
    aspectRatioTolerance: null,
    allowedFormats: ["image/jpeg", "image/png", "image/webp"],
    allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    maxSizeBytes: 8 * 1024 * 1024,
    maxSizeMB: 8,
    validationMode: "flexible",
    fitMode: "cover",
    recommendedDimensions: "1200 × 800 px (Landscape)",
  },
  EXPO_SECTION_IMAGE: {
    key: "EXPO_SECTION_IMAGE",
    name: "Expo Section Card Image",
    description: "Visual card or feature illustration for Expo sections",
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    aspectRatio: "flexible",
    aspectRatioValue: null,
    aspectRatioTolerance: null,
    allowedFormats: ["image/jpeg", "image/png", "image/webp"],
    allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    maxSizeBytes: 5 * 1024 * 1024,
    maxSizeMB: 5,
    validationMode: "flexible",
    fitMode: "cover",
    recommendedDimensions: "800 × 600 px (4:3)",
  },
};

/**
 * Validate image metadata against a slot specification
 * @param {Object} spec - Slot specification from IMAGE_SPECS
 * @param {Object} metadata - { width, height, sizeBytes, mimeType }
 * @returns {Object} - { isValid: boolean, error: string|null }
 */
export const validateImageSpec = (spec, metadata) => {
  if (!spec) return { isValid: true, error: null };

  const { width, height, sizeBytes, mimeType } = metadata;

  // File type validation
  if (mimeType && spec.allowedFormats && !spec.allowedFormats.includes(mimeType)) {
    return {
      isValid: false,
      error: `Unsupported file type (${mimeType}). Allowed formats: ${spec.allowedExtensions.join(", ").toUpperCase()}`,
    };
  }

  // File size validation
  if (sizeBytes && spec.maxSizeBytes && sizeBytes > spec.maxSizeBytes) {
    return {
      isValid: false,
      error: `File size exceeds limit (${(sizeBytes / (1024 * 1024)).toFixed(1)}MB). Maximum allowed is ${spec.maxSizeMB}MB.`,
    };
  }

  // Dimension validation if width/height are available
  if (width && height) {
    if (spec.validationMode === "exact") {
      if (width !== spec.width || height !== spec.height) {
        return {
          isValid: false,
          error: `${spec.name} must be exactly ${spec.width} × ${spec.height} pixels (4:3 aspect ratio). Provided image is ${width} × ${height} px.`,
        };
      }
    } else {
      if (spec.minWidth && width < spec.minWidth) {
        return {
          isValid: false,
          error: `Image width (${width}px) is below the minimum required width of ${spec.minWidth}px for ${spec.name}.`,
        };
      }

      if (spec.minHeight && height < spec.minHeight) {
        return {
          isValid: false,
          error: `Image height (${height}px) is below the minimum required height of ${spec.minHeight}px for ${spec.name}.`,
        };
      }

      if (spec.aspectRatioValue && spec.aspectRatioTolerance) {
        const actualRatio = width / height;
        const diff = Math.abs(actualRatio - spec.aspectRatioValue);
        if (diff > spec.aspectRatioTolerance) {
          return {
            isValid: false,
            error: `Image aspect ratio (${width}:${height} ~ ${actualRatio.toFixed(2)}:1) does not match required ${spec.aspectRatio} (~${spec.aspectRatioValue.toFixed(2)}:1) for ${spec.name}.`,
          };
        }
      }
    }
  }

  return { isValid: true, error: null };
};

