/**
 * Centralized Image Specifications for Imprenta Client
 * Used for standardized aspect ratios, fit modes, and responsive image rendering.
 */

export const IMAGE_SPECS = {
  HOMEPAGE_HERO: {
    key: "HOMEPAGE_HERO",
    name: "Hero Slide Image",
    aspectRatio: "4/3",
    fitMode: "contain",
    recommendedDimensions: "800 × 600 px",
  },

  CATEGORY_IMAGE: {
    key: "CATEGORY_IMAGE",
    name: "Category Cover Image",
    aspectRatio: "4/3",
    fitMode: "cover",
    recommendedDimensions: "800 × 600 px",
  },

  PRODUCT_IMAGE: {
    key: "PRODUCT_IMAGE",
    name: "Product Image",
    aspectRatio: "1/1",
    fitMode: "contain",
    recommendedDimensions: "800 × 800 px",
  },

  PRODUCT_THUMBNAIL: {
    key: "PRODUCT_THUMBNAIL",
    name: "Product Thumbnail",
    aspectRatio: "1/1",
    fitMode: "contain",
    recommendedDimensions: "200 × 200 px",
  },

  BLOG_FEATURED_IMAGE: {
    key: "BLOG_FEATURED_IMAGE",
    name: "Blog Featured Image",
    aspectRatio: "16/9",
    fitMode: "cover",
    recommendedDimensions: "1200 × 675 px",
  },

  NEWSLETTER_IMAGE: {
    key: "NEWSLETTER_IMAGE",
    name: "Newsletter Section Image",
    aspectRatio: "1/1",
    fitMode: "cover",
    recommendedDimensions: "800 × 800 px",
  },

  FEATURED_PROMO_BANNER: {
    key: "FEATURED_PROMO_BANNER",
    name: "Featured Promo Banner",
    aspectRatio: "16/10",
    fitMode: "cover",
    recommendedDimensions: "800 × 520 px",
  },

  SITE_LOGO: {
    key: "SITE_LOGO",
    name: "Website Logo",
    aspectRatio: "auto",
    fitMode: "contain",
    recommendedDimensions: "400 × 120 px",
  },

  EXPO_HERO_IMAGE: {
    key: "EXPO_HERO_IMAGE",
    name: "Expo Hero Image",
    aspectRatio: "16/9",
    fitMode: "cover",
    recommendedDimensions: "1200 × 800 px",
  },

  EXPO_SECTION_IMAGE: {
    key: "EXPO_SECTION_IMAGE",
    name: "Expo Section Image",
    aspectRatio: "4/3",
    fitMode: "cover",
    recommendedDimensions: "800 × 600 px",
  },
};
