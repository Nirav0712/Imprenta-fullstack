import mongoose from "mongoose";

const expoLeadSchema = new mongoose.Schema(
  {
    expoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expo",
      required: [true, "Expo ID is required"],
      index: true,
    },
    expoName: {
      type: String,
      required: true,
      trim: true,
    },
    expoSlug: {
      type: String,
      required: true,
      trim: true,
    },

    // Standard Lead Fields
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    packagingRequirement: {
      type: String,
      default: "",
      trim: true,
    },
    preferredMeetingDate: {
      type: String,
      default: "",
      trim: true,
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },

    // Dynamic / Custom Form Responses Map
    customResponses: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Tracking and Attribution Metadata
    sourcePage: {
      type: String,
      default: "",
      trim: true,
    },
    utmSource: {
      type: String,
      default: "",
      trim: true,
    },
    utmMedium: {
      type: String,
      default: "",
      trim: true,
    },
    utmCampaign: {
      type: String,
      default: "",
      trim: true,
    },
    utmTerm: {
      type: String,
      default: "",
      trim: true,
    },
    utmContent: {
      type: String,
      default: "",
      trim: true,
    },
    referrer: {
      type: String,
      default: "",
      trim: true,
    },
    ipAddress: {
      type: String,
      default: "",
    },
    userAgent: {
      type: String,
      default: "",
    },

    // Status and Internal CRM fields
    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Meeting Scheduled",
        "Converted",
        "Closed",
        "Spam",
      ],
      default: "New",
      index: true,
    },
    notes: {
      type: String,
      default: "",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const ExpoLead = mongoose.model("ExpoLead", expoLeadSchema);

export default ExpoLead;
