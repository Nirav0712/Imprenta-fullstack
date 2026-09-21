import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Expo from "./models/Expo.js";

const seedInitialExpo = async () => {
  try {
    await connectDB();

    const existing = await Expo.findOne({ slug: "pack-expo-chicago-2026" });
    if (existing) {
      console.log("Pack Expo Chicago 2026 already exists in database.");
      process.exit(0);
    }

    const packExpo = await Expo.create({
      name: "Pack Expo Chicago 2026",
      slug: "pack-expo-chicago-2026",
      shortDescription:
        "Meet Imprenta in Chicago at PACK EXPO International 2026. Discover our multi-format packaging capabilities, mono cartons, shrink sleeves, labels, and premium printing solutions.",
      eventDate: "October 18–21, 2026",
      startDate: new Date("2026-10-18"),
      endDate: new Date("2026-10-21"),
      venue: "McCormick Place",
      boothNumber: "Booth No. W39062 (West Hall)",
      city: "Chicago, Illinois",
      country: "USA",

      heroBadge: "IMPRENTA AT PACK EXPO INTERNATIONAL 2026",
      heroHeading: "Meet Imprenta in Chicago",
      heroHighlightText: "Chicago",
      heroDescription:
        "We're excited to participate in PACK EXPO International 2026 in Chicago. Visit Imprenta at our booth and discover our innovative packaging solutions. Let's connect, collaborate, and explore new opportunities.",
      heroImage: "https://res.cloudinary.com/dkenmez3t/image/upload/v1788338383/imprenta/products/yop399ugb8snu2ye5i4s.png",
      heroSlideImages: [
        "https://res.cloudinary.com/dkenmez3t/image/upload/v1788338383/imprenta/products/yop399ugb8snu2ye5i4s.png",
        "https://res.cloudinary.com/dkenmez3t/image/upload/v1788338238/imprenta/products/jnkbh63fzgw5wyoph7vq.png",
        "https://res.cloudinary.com/dkenmez3t/image/upload/v1788338119/imprenta/products/qnhxummlcwmennsly4yx.png",
      ],
      primaryButtonText: "Schedule a Meeting",
      primaryButtonAction: "scroll_to_form",
      primaryButtonLink: "#book",
      secondaryButtonText: "Explore Solutions",
      secondaryButtonAction: "scroll_to_solutions",
      secondaryButtonLink: "#solutions",

      solutionsHeading: "Packaging Solutions",
      solutionsSubtitle: "Discover our multi-format capabilities and premium custom printing",
      solutionsEnabled: true,
      solutions: [
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
      ],

      whyHeading: "Why Meet Imprenta?",
      whySubtitle: "Experience the difference of end-to-end manufacturing and creative expertise",
      whyEnabled: true,
      whyFeatures: [
        "Multi-format packaging capabilities",
        "Premium printing & finishing",
        "Packaging development support",
        "Corporate branding & design",
        "International business focus",
      ],
      whyCardTitle: "Elevating Brands Globally",
      whyCardDescription:
        "Discuss your Next-Gen packaging needs with our experts directly on the expo floor. We help you transition from concept to finished retail-ready packaging.",
      whyImage: "https://res.cloudinary.com/dkenmez3t/image/upload/v1788338238/imprenta/products/jnkbh63fzgw5wyoph7vq.png",

      formEnabled: true,
      formTitle: "Book a Meeting",
      formSubtitle: "Secure your time slot with our team in Chicago at Booth No. W39062.",
      formSubmitButtonText: "Submit Request",
      formSuccessMessage:
        "Thank you! Your meeting request has been submitted. Our team will contact you shortly to confirm your time slot in Chicago.",
      formFields: [
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
            "Other / General",
          ],
          order: 5,
          active: true,
        },
        { fieldId: "preferredMeetingDate", label: "Preferred Meeting Date", placeholder: "Select Date", type: "date", required: true, order: 6, active: true },
        { fieldId: "message", label: "Message / Specific Needs", placeholder: "Tell us about your requirements...", type: "textarea", required: false, order: 7, active: true },
      ],

      seoTitle: "Imprenta at PACK EXPO International 2026 | Chicago",
      seoDescription: "Meet Imprenta in Chicago at PACK EXPO International 2026. Discover our multi-format packaging capabilities and premium printing.",
      ogImage: "https://res.cloudinary.com/dkenmez3t/image/upload/v1788338383/imprenta/products/yop399ugb8snu2ye5i4s.png",

      status: "published",
      publishedAt: new Date(),
    });

    console.log("Successfully seeded Pack Expo Chicago 2026! ID:", packExpo._id);
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedInitialExpo();
