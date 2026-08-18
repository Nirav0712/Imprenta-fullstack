import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    brand: {
      type: String,
      default: "",
      trim: true,
    },

    sku: {
      type: String,
      default: "",
      trim: true,
    },

    barcode: {
      type: String,
      default: "",
      trim: true,
    },

    // Description
    shortDescription: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    // Images
    mainImage: {
      url: { type: String },
      public_id: { type: String }
    },
    images: [imageSchema],

    // Pricing
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    salePrice: {
      type: Number,
      min: 0,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
    },
    gst: {
      type: Number,
      min: 0,
      default: 18,
    },
    showPrice: {
      type: Boolean,
      default: false,
    },

    badge: {
      type: String,
      default: "",
    },

    features: [
      { type: String }
    ],

    specifications: [
      {
        key: String,
        value: String
      }
    ],

    // Configurator options
    configuration: {
      enabled: { type: Boolean, default: false },
      minimumQuantity: { type: Number, default: 100 },
      allowCustomQuantity: { type: Boolean, default: true },
      allowCustomSize: { type: Boolean, default: true },
      sizes: [
        { name: String, additionalPrice: Number, enabled: { type: Boolean, default: true } }
      ],
      materials: [
        { name: String, additionalPrice: Number, enabled: { type: Boolean, default: true } }
      ],
      laminations: [
        { name: String, additionalPrice: Number, enabled: { type: Boolean, default: true } }
      ],
      foils: [
        { name: String, additionalPrice: Number, enabled: { type: Boolean, default: true } }
      ],
      designOptions: [
        {
          name: String,
          additionalPrice: { type: Number, default: 0 },
          enabled: { type: Boolean, default: true },
        },
      ],
      splitOnBackPapers: [
        {
          name: String,
          additionalPrice: { type: Number, default: 0 },
          enabled: { type: Boolean, default: true },
        },
      ],
      quantityOptions: [
        { quantity: Number, price: Number, enabled: { type: Boolean, default: true } }
      ]
    },

    // Inventory
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    lowStockAlert: {
      type: Number,
      default: 5,
      min: 0,
    },

    manageStock: {
      type: Boolean,
      default: true,
    },

    // Product Flags
    featured: {
      type: Boolean,
      default: false,
    },

    trending: {
      type: Boolean,
      default: false,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },

    newArrival: {
      type: Boolean,
      default: false,
    },

    showOnHome: {
      type: Boolean,
      default: false,
    },

    // SEO
    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },

    keywords: {
      type: String,
      default: "",
    },

    // Status
    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Published",
    },

    // User
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;