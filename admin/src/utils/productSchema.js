import { z } from "zod";

export const productSchema = z.object({

  productName: z
    .string()
    .min(3, "Product name must be at least 3 characters"),

  slug: z
    .string()
    .min(3, "Slug is required"),

  category: z
    .string()
    .min(1, "Select category"),

  brand: z
    .string()
    .optional(),

  sku: z
    .string()
    .optional(),

  barcode: z
    .string()
    .optional(),

  shortDescription: z
    .string()
    .min(10, "Minimum 10 characters"),

  description: z
    .string()
    .min(20, "Minimum 20 characters"),

  status: z.string(),

  metaTitle: z
    .string()
    .max(60, "Maximum 60 characters"),

  metaDescription: z
    .string()
    .max(160, "Maximum 160 characters"),

  keywords: z.string(),

  canonical: z
    .string()
    .optional(),

  images: z.array(z.any()),

  regularPrice: z.coerce.number(),

  salePrice: z.coerce.number().optional(),

  discount: z.coerce.number().optional(),

  gst: z.coerce.number().optional(),

  barcode: z.string().optional(),

  brand: z.string().optional(),

  canonical: z.string().optional(),

  stock: z.coerce.number(),

  lowStockAlert: z.coerce.number(),

  manageStock: z.boolean(),

  featured: z.boolean(),

  trending: z.boolean(),

  bestSeller: z.boolean(),

  status: z.string(),

  metaTitle: z
    .string()
    .max(60, "Maximum 60 characters"),

  metaDescription: z
    .string()
    .max(160, "Maximum 160 characters"),

  keywords: z.string(),

  images: z.array(z.any()),

  newArrival: z.boolean(),

  showOnHome: z.boolean(),

  showPrice: z.boolean().default(true),

  configuration: z.object({
    enabled: z.boolean().default(false),
    minimumQuantity: z.coerce.number().default(1),
    allowCustomQuantity: z.boolean().default(false),
    allowCustomSize: z.boolean().default(false),
    sizes: z.array(z.object({
      name: z.string(),
      additionalPrice: z.coerce.number().default(0),
      enabled: z.boolean().default(true),
    })).optional(),
    materials: z.array(z.object({
      name: z.string(),
      additionalPrice: z.coerce.number().default(0),
      enabled: z.boolean().default(true),
    })).optional(),
    laminations: z.array(z.object({
      name: z.string(),
      additionalPrice: z.coerce.number().default(0),
      enabled: z.boolean().default(true),
    })).optional(),
    foils: z.array(z.object({
      name: z.string(),
      additionalPrice: z.coerce.number().default(0),
      enabled: z.boolean().default(true),
    })).optional(),
    designOptions: z.array(z.object({
      name: z.string(),
      additionalPrice: z.coerce.number().default(0),
      enabled: z.boolean().default(true),
    })).optional(),
    splitOnBackPapers: z.array(z.object({
      name: z.string(),
      additionalPrice: z.coerce.number().default(0),
      enabled: z.boolean().default(true),
    })).optional(),
    quantityOptions: z.array(z.any()).optional(),
  }).optional(),

});

