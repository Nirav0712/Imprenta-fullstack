import Expo from "../models/Expo.js";
import ExpoLead from "../models/ExpoLead.js";
import slugify from "../utils/slugify.js";

// Helper: default solutions template if creating empty
export const DEFAULT_SOLUTIONS = [
  {
    title: "Premium Labels",
    description: "High-quality labeling solutions that elevate brand presence on the shelf.",
    icon: "FiTag",
    order: 1,
    active: true,
  },
  {
    title: "Mono Cartons",
    description: "Sustainable and sturdy carton packaging for a premium unboxing experience.",
    icon: "FiBox",
    order: 2,
    active: true,
  },
  {
    title: "Shrink Sleeves",
    description: "360-degree branding for complex container shapes with vibrant graphics.",
    icon: "FiLayers",
    order: 3,
    active: true,
  },
  {
    title: "Flexible Packaging Pouches",
    description: "Versatile, lightweight, and durable pouches for diverse product needs.",
    icon: "FiPackage",
    order: 4,
    active: true,
  },
  {
    title: "Seamless Plastic Tubes",
    description: "Sleek and functional packaging for cosmetics, personal care, and more.",
    icon: "FiFeather",
    order: 5,
    active: true,
  },
  {
    title: "Corporate Branding & Design",
    description: "End-to-end design services to ensure your packaging aligns with your brand identity.",
    icon: "FiEdit3",
    isHighlight: true,
    order: 6,
    active: true,
  },
];

// Helper: default form fields
export const DEFAULT_FORM_FIELDS = [
  { fieldId: "fullName", label: "Full Name", placeholder: "John Doe", type: "text", required: true, order: 1, active: true },
  { fieldId: "companyName", label: "Company Name", placeholder: "Acme Corp", type: "text", required: true, order: 2, active: true },
  { fieldId: "email", label: "Email Address", placeholder: "john@example.com", type: "email", required: true, order: 3, active: true },
  { fieldId: "phone", label: "Phone Number", placeholder: "+1 (555) 000-0000", type: "tel", required: false, order: 4, active: true },
  {
    fieldId: "packagingRequirement",
    label: "Packaging Requirement",
    placeholder: "Select an area of interest",
    type: "select",
    required: true,
    options: [
      "Premium Labels",
      "Mono Cartons",
      "Shrink Sleeves",
      "Flexible Packaging Pouches",
      "Seamless Plastic Tubes",
      "Corporate Branding & Design",
      "Other / General Packaging",
    ],
    order: 5,
    active: true,
  },
  { fieldId: "preferredMeetingDate", label: "Preferred Meeting Date", placeholder: "Select Date", type: "date", required: true, order: 6, active: true },
  { fieldId: "message", label: "Message / Specific Requirements", placeholder: "Tell us about your project or booth visit plans...", type: "textarea", required: false, order: 7, active: true },
];

export const DEFAULT_WHY_FEATURES = [
  "Multi-format packaging capabilities",
  "Premium printing & finishing",
  "Packaging development support",
  "Corporate branding & design",
  "International business focus",
];

// @desc Get all published expos for public listing
// @route GET /api/expos/public
export const getPublicExpos = async (req, res) => {
  try {
    const expos = await Expo.find({ status: "published" }).sort({ startDate: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: expos.length,
      expos,
    });
  } catch (error) {
    console.error("getPublicExpos error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get public expo by slug
// @route GET /api/expos/public/:slug
export const getPublicExpoBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const { preview } = req.query;

    let filter = { slug: slug.toLowerCase() };

    // If not preview mode, only show published
    if (preview !== "true") {
      filter.status = "published";
    }

    const expo = await Expo.findOne(filter);

    if (!expo) {
      return res.status(404).json({
        success: false,
        message: "Expo page not found or is currently unpublished.",
      });
    }

    res.status(200).json({
      success: true,
      expo,
    });
  } catch (error) {
    console.error("getPublicExpoBySlug error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Submit lead for specific expo (Public)
// @route POST /api/expos/public/:slug/submit
export const submitExpoLead = async (req, res) => {
  try {
    const { slug } = req.params;
    const {
      fullName,
      companyName,
      email,
      phone,
      packagingRequirement,
      preferredMeetingDate,
      message,
      customResponses,
      sourcePage,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      referrer,
    } = req.body;

    // 1. Verify Expo exists
    const expo = await Expo.findOne({ slug: slug.toLowerCase() });
    if (!expo) {
      return res.status(404).json({
        success: false,
        message: "Expo not found for submission.",
      });
    }

    if (expo.status !== "published" && !req.body.allowDraftSubmit) {
      return res.status(400).json({
        success: false,
        message: "This Expo form is currently closed or unpublished.",
      });
    }

    if (expo.formEnabled === false) {
      return res.status(400).json({
        success: false,
        message: "Form submissions are disabled for this Expo.",
      });
    }

    // 2. Validate required core fields
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, message: "Full name is required." });
    }
    if (!companyName || !companyName.trim()) {
      return res.status(400).json({ success: false, message: "Company name is required." });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: "Email address is required." });
    }

    // 3. Extract client IP and user agent
    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const userAgent = req.headers["user-agent"] || "";

    // 4. Create verified Lead
    const lead = await ExpoLead.create({
      expoId: expo._id,
      expoName: expo.name,
      expoSlug: expo.slug,
      fullName: fullName.trim(),
      companyName: companyName.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || "").trim(),
      packagingRequirement: (packagingRequirement || "").trim(),
      preferredMeetingDate: (preferredMeetingDate || "").trim(),
      message: (message || "").trim(),
      customResponses: customResponses || {},
      sourcePage: sourcePage || `/expo/${expo.slug}`,
      utmSource: utmSource || "",
      utmMedium: utmMedium || "",
      utmCampaign: utmCampaign || "",
      utmTerm: utmTerm || "",
      utmContent: utmContent || "",
      referrer: referrer || "",
      ipAddress,
      userAgent,
      status: "New",
      submittedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: expo.formSuccessMessage || "Your meeting request has been submitted successfully!",
      leadId: lead._id,
    });
  } catch (error) {
    console.error("submitExpoLead error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all expos (Admin)
// @route GET /api/expos
export const getAdminExpos = async (req, res) => {
  try {
    const { status, search } = req.query;
    let filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { venue: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
      ];
    }

    const expos = await Expo.find(filter)
      .sort({ createdAt: -1 })
      .populate("leadCount");

    res.status(200).json({
      success: true,
      count: expos.length,
      expos,
    });
  } catch (error) {
    console.error("getAdminExpos error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single expo by ID (Admin)
// @route GET /api/expos/:id
export const getAdminExpoById = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id).populate("leadCount");

    if (!expo) {
      return res.status(404).json({ success: false, message: "Expo not found." });
    }

    res.status(200).json({
      success: true,
      expo,
    });
  } catch (error) {
    console.error("getAdminExpoById error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create new Expo (Admin)
// @route POST /api/expos
export const createExpo = async (req, res) => {
  try {
    const {
      name,
      slug: customSlug,
      shortDescription,
      eventDate,
      startDate,
      endDate,
      venue,
      boothNumber,
      city,
      country,
      heroBadge,
      heroHeading,
      heroHighlightText,
      heroDescription,
      heroImage,
      heroSlideImages,
      primaryButtonText,
      primaryButtonAction,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonAction,
      secondaryButtonLink,
      solutionsHeading,
      solutionsSubtitle,
      solutionsEnabled,
      solutions,
      whyHeading,
      whySubtitle,
      whyEnabled,
      whyFeatures,
      whyCardTitle,
      whyCardDescription,
      whyImage,
      customSections,
      formEnabled,
      formTitle,
      formSubtitle,
      formSubmitButtonText,
      formSuccessMessage,
      formFields,
      seoTitle,
      seoDescription,
      ogImage,
      canonicalUrl,
      status,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Expo name is required." });
    }

    // Generate unique slug
    let baseSlug = (customSlug || slugify(name)).toLowerCase().trim();
    let uniqueSlug = baseSlug;
    let count = 1;
    while (await Expo.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${count}`;
      count++;
    }

    const expo = await Expo.create({
      name: name.trim(),
      slug: uniqueSlug,
      shortDescription: shortDescription || "",
      eventDate: eventDate || "",
      startDate: startDate || null,
      endDate: endDate || null,
      venue: venue || "",
      boothNumber: boothNumber || "",
      city: city || "",
      country: country || "",

      heroBadge: heroBadge || "IMPRENTA AT THE EXPO",
      heroHeading: heroHeading || `Meet Imprenta at ${name}`,
      heroHighlightText: heroHighlightText || (city || ""),
      heroDescription: heroDescription || "",
      heroImage: heroImage || "",
      heroSlideImages: heroSlideImages || [],
      primaryButtonText: primaryButtonText || "Schedule a Meeting",
      primaryButtonAction: primaryButtonAction || "scroll_to_form",
      primaryButtonLink: primaryButtonLink || "#book",
      secondaryButtonText: secondaryButtonText || "Explore Solutions",
      secondaryButtonAction: secondaryButtonAction || "scroll_to_solutions",
      secondaryButtonLink: secondaryButtonLink || "#solutions",

      solutionsHeading: solutionsHeading || "Packaging Solutions",
      solutionsSubtitle: solutionsSubtitle || "Explore our comprehensive range of high-performance packaging",
      solutionsEnabled: solutionsEnabled !== undefined ? solutionsEnabled : true,
      solutions: solutions && solutions.length > 0 ? solutions : DEFAULT_SOLUTIONS,

      whyHeading: whyHeading || "Why Meet Imprenta?",
      whySubtitle: whySubtitle || "Discover how we help brands scale with premium packaging",
      whyEnabled: whyEnabled !== undefined ? whyEnabled : true,
      whyFeatures: whyFeatures && whyFeatures.length > 0 ? whyFeatures : DEFAULT_WHY_FEATURES,
      whyCardTitle: whyCardTitle || "Elevating Brands Globally",
      whyCardDescription: whyCardDescription || "Discuss your Next-Gen packaging needs with our experts directly on the expo floor.",
      whyImage: whyImage || "",

      customSections: customSections || [],

      formEnabled: formEnabled !== undefined ? formEnabled : true,
      formTitle: formTitle || "Book a Meeting",
      formSubtitle: formSubtitle || "Secure your dedicated time slot with our packaging experts at the booth.",
      formSubmitButtonText: formSubmitButtonText || "Submit Meeting Request",
      formSuccessMessage: formSuccessMessage || "Thank you! Your meeting request has been submitted.",
      formFields: formFields && formFields.length > 0 ? formFields : DEFAULT_FORM_FIELDS,

      seoTitle: seoTitle || `${name} | Imprenta Packaging Solutions`,
      seoDescription: seoDescription || shortDescription || `Meet Imprenta at ${name}. Discover multi-format packaging and printing capabilities.`,
      ogImage: ogImage || heroImage || "",
      canonicalUrl: canonicalUrl || "",

      status: status || "draft",
      publishedAt: status === "published" ? new Date() : null,
    });

    res.status(201).json({
      success: true,
      message: "Expo created successfully!",
      expo,
    });
  } catch (error) {
    console.error("createExpo error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update Expo (Admin)
// @route PUT /api/expos/:id
export const updateExpo = async (req, res) => {
  try {
    let expo = await Expo.findById(req.params.id);

    if (!expo) {
      return res.status(404).json({ success: false, message: "Expo not found." });
    }

    const { slug: newSlug, status: newStatus } = req.body;

    // If slug is changed, check uniqueness
    if (newSlug && newSlug.toLowerCase().trim() !== expo.slug) {
      const formattedSlug = newSlug.toLowerCase().trim();
      const existing = await Expo.findOne({ slug: formattedSlug, _id: { $ne: expo._id } });
      if (existing) {
        return res.status(400).json({ success: false, message: "This URL slug is already in use by another Expo." });
      }
      req.body.slug = formattedSlug;
    }

    // Handle published date
    if (newStatus === "published" && expo.status !== "published" && !expo.publishedAt) {
      req.body.publishedAt = new Date();
    }

    Object.assign(expo, req.body);
    await expo.save();

    res.status(200).json({
      success: true,
      message: "Expo updated successfully!",
      expo,
    });
  } catch (error) {
    console.error("updateExpo error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete Expo (Admin)
// @route DELETE /api/expos/:id
export const deleteExpo = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);

    if (!expo) {
      return res.status(404).json({ success: false, message: "Expo not found." });
    }

    await Expo.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Expo deleted successfully!",
    });
  } catch (error) {
    console.error("deleteExpo error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Duplicate Expo as Draft (Admin)
// @route POST /api/expos/:id/duplicate
export const duplicateExpo = async (req, res) => {
  try {
    const original = await Expo.findById(req.params.id);
    if (!original) {
      return res.status(404).json({ success: false, message: "Original Expo not found." });
    }

    const obj = original.toObject();
    delete obj._id;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    obj.name = `${original.name} (Copy)`;
    let baseSlug = `${original.slug}-copy`;
    let uniqueSlug = baseSlug;
    let count = 1;
    while (await Expo.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${count}`;
      count++;
    }
    obj.slug = uniqueSlug;
    obj.status = "draft";
    obj.publishedAt = null;

    const cloned = await Expo.create(obj);

    res.status(201).json({
      success: true,
      message: "Expo duplicated successfully as Draft!",
      expo: cloned,
    });
  } catch (error) {
    console.error("duplicateExpo error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
