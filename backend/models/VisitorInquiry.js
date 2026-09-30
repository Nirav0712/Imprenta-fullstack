import mongoose from "mongoose";

const visitorInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Visitor name is required"],
      trim: true,
    },
    designation: {
      type: String,
      default: "",
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    city: {
      type: String,
      default: "",
      trim: true,
    },
    state: {
      type: String,
      default: "",
      trim: true,
    },
    pincode: {
      type: String,
      default: "",
      trim: true,
    },
    contactNo: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
    },
    requirements: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
    visitingCardImage: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Completed", "Cancelled"],
      default: "New",
      index: true,
    },
    adminNotes: {
      type: String,
      default: "",
    },
    ipAddress: {
      type: String,
      default: "",
    },
    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

visitorInquirySchema.index({ createdAt: -1 });
visitorInquirySchema.index({ status: 1 });

const VisitorInquiry = mongoose.model("VisitorInquiry", visitorInquirySchema);

export default VisitorInquiry;
