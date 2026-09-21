import mongoose from "mongoose";

const expoSolutionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    icon: { type: String, default: "FiBox" }, // icon identifier or key
    image: { type: String, default: "" },
    isHighlight: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const expoFormFieldSchema = new mongoose.Schema(
  {
    fieldId: { type: String, required: true, trim: true }, // e.g. "fullName", "companyName", "requirement"
    label: { type: String, required: true, trim: true },
    placeholder: { type: String, default: "" },
    type: {
      type: String,
      enum: ["text", "email", "tel", "select", "date", "textarea"],
      default: "text",
    },
    required: { type: Boolean, default: false },
    options: [{ type: String }], // Options for select dropdown
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { _id: true }
);

const expoCustomSectionSchema = new mongoose.Schema(
  {
    sectionId: { type: String, default: "" },
    title: { type: String, default: "", trim: true },
    subtitle: { type: String, default: "", trim: true },
    content: { type: String, default: "" },
    layout: { type: String, enum: ["grid", "split", "full"], default: "split" },
    image: { type: String, default: "" },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const expoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Expo name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Expo slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    shortDescription: {
      type: String,
      default: "",
      trim: true,
    },
    // Event specific details
    eventDate: {
      type: String,
      default: "", // Human readable e.g. "October 18–21, 2026"
      trim: true,
    },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    venue: { type: String, default: "", trim: true }, // e.g. "McCormick Place"
    boothNumber: { type: String, default: "", trim: true }, // e.g. "Booth No. W39062"
    city: { type: String, default: "", trim: true }, // e.g. "Chicago, Illinois"
    country: { type: String, default: "", trim: true }, // e.g. "USA"

    // Hero Section
    heroBadge: { type: String, default: "IMPRENTA AT THE EXPO", trim: true },
    heroHeading: { type: String, default: "Meet Imprenta at the Expo", trim: true },
    heroHighlightText: { type: String, default: "", trim: true }, // e.g. "Chicago"
    heroDescription: { type: String, default: "", trim: true },
    heroImage: { type: String, default: "" },
    heroSlideImages: [{ type: String }],
    primaryButtonText: { type: String, default: "Schedule a Meeting", trim: true },
    primaryButtonAction: { type: String, enum: ["scroll_to_form", "link"], default: "scroll_to_form" },
    primaryButtonLink: { type: String, default: "#book" },
    secondaryButtonText: { type: String, default: "Explore Solutions", trim: true },
    secondaryButtonAction: { type: String, enum: ["scroll_to_solutions", "link"], default: "scroll_to_solutions" },
    secondaryButtonLink: { type: String, default: "#solutions" },

    // Packaging Solutions Section
    solutionsHeading: { type: String, default: "Packaging Solutions", trim: true },
    solutionsSubtitle: { type: String, default: "Explore our comprehensive range of high-performance packaging", trim: true },
    solutionsEnabled: { type: Boolean, default: true },
    solutions: [expoSolutionSchema],

    // Why Meet Imprenta Section
    whyHeading: { type: String, default: "Why Meet Imprenta?", trim: true },
    whySubtitle: { type: String, default: "Discover how we help brands scale with premium packaging", trim: true },
    whyEnabled: { type: Boolean, default: true },
    whyFeatures: [{ type: String }],
    whyCardTitle: { type: String, default: "Elevating Brands Globally", trim: true },
    whyCardDescription: { type: String, default: "Discuss your Next-Gen packaging needs with our experts directly on the expo floor.", trim: true },
    whyImage: { type: String, default: "" },

    // Custom Sections
    customSections: [expoCustomSectionSchema],

    // Dynamic Form Configuration
    formEnabled: { type: Boolean, default: true },
    formTitle: { type: String, default: "Book a Meeting", trim: true },
    formSubtitle: { type: String, default: "Secure your dedicated time slot with our packaging experts at the booth.", trim: true },
    formSubmitButtonText: { type: String, default: "Submit Meeting Request", trim: true },
    formSuccessMessage: { type: String, default: "Thank you! Your meeting request has been submitted. Our team will contact you shortly to confirm your time slot.", trim: true },
    formFields: [expoFormFieldSchema],

    // SEO Metadata
    seoTitle: { type: String, default: "", trim: true },
    seoDescription: { type: String, default: "", trim: true },
    ogImage: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },

    // Status
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },
    publishedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

// Virtual for lead count
expoSchema.virtual("leadCount", {
  ref: "ExpoLead",
  localField: "_id",
  foreignField: "expoId",
  count: true,
});

expoSchema.set("toObject", { virtuals: true });
expoSchema.set("toJSON", { virtuals: true });

const Expo = mongoose.model("Expo", expoSchema);

export default Expo;
