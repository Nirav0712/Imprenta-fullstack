import VisitorInquiry from "../models/VisitorInquiry.js";
import { createNotification } from "./notificationController.js";

// @desc    Submit new Visitor Inquiry (Public)
// @route   POST /api/visitor-inquiries
// @access  Public
export const createVisitorInquiry = async (req, res) => {
  try {
    const {
      name,
      designation,
      companyName,
      address,
      city,
      state,
      pincode,
      contactNo,
      email,
      requirements,
      notes,
      visitingCardImage,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Visitor Name is required." });
    }
    if (!companyName || !companyName.trim()) {
      return res.status(400).json({ success: false, message: "Company Name is required." });
    }
    if (!contactNo || !contactNo.trim()) {
      return res.status(400).json({ success: false, message: "Contact Number is required." });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: "Email Address is required." });
    }

    // Process requirements array/strings
    let processedReqs = [];
    if (Array.isArray(requirements)) {
      processedReqs = requirements.map((r) => (typeof r === "string" ? r.trim() : "")).filter(Boolean);
    } else if (typeof requirements === "string" && requirements.trim()) {
      processedReqs = requirements.split("\n").map((r) => r.trim()).filter(Boolean);
    }

    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const userAgent = req.headers["user-agent"] || "";

    const visitorInquiry = await VisitorInquiry.create({
      name: name.trim(),
      designation: (designation || "").trim(),
      companyName: companyName.trim(),
      address: (address || "").trim(),
      city: (city || "").trim(),
      state: (state || "").trim(),
      pincode: (pincode || "").trim(),
      contactNo: contactNo.trim(),
      email: email.trim().toLowerCase(),
      requirements: processedReqs,
      notes: (notes || "").trim(),
      visitingCardImage: visitingCardImage || "",
      status: "New",
      ipAddress,
      userAgent,
    });

    // Send real-time notification to admin
    await createNotification({
      type: "visitor_inquiry",
      title: "New Visitor Inquiry",
      message: `${name.trim()} (${companyName.trim()}) submitted a visitor inquiry.`,
      entityId: visitorInquiry._id,
      entityType: "visitor_inquiry",
      customerName: name.trim(),
      priority: "high",
    });

    res.status(201).json({
      success: true,
      message: "Visitor inquiry submitted successfully! Our team will get in touch soon.",
      data: visitorInquiry,
    });
  } catch (error) {
    console.error("createVisitorInquiry error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to submit visitor inquiry." });
  }
};

// @desc    Get all Visitor Inquiries (Admin)
// @route   GET /api/visitor-inquiries
// @access  Private/Admin
export const getVisitorInquiries = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (status && status !== "All") {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { designation: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { contactNo: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { state: { $regex: search, $options: "i" } },
        { pincode: { $regex: search, $options: "i" } },
        { requirements: { $regex: search, $options: "i" } },
        { notes: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await VisitorInquiry.countDocuments(filter);
    const inquiries = await VisitorInquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: inquiries.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: inquiries,
    });
  } catch (error) {
    console.error("getVisitorInquiries error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single Visitor Inquiry by ID (Admin)
// @route   GET /api/visitor-inquiries/:id
// @access  Private/Admin
export const getVisitorInquiryById = async (req, res) => {
  try {
    const inquiry = await VisitorInquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Visitor inquiry not found." });
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    console.error("getVisitorInquiryById error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Visitor Inquiry Status & Notes (Admin)
// @route   PUT /api/visitor-inquiries/:id
// @access  Private/Admin
export const updateVisitorInquiryStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const inquiry = await VisitorInquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Visitor inquiry not found." });
    }

    if (status) inquiry.status = status;
    if (adminNotes !== undefined) inquiry.adminNotes = adminNotes;

    await inquiry.save();

    res.status(200).json({
      success: true,
      message: "Visitor inquiry updated successfully.",
      data: inquiry,
    });
  } catch (error) {
    console.error("updateVisitorInquiryStatus error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete Visitor Inquiry (Admin)
// @route   DELETE /api/visitor-inquiries/:id
// @access  Private/Admin
export const deleteVisitorInquiry = async (req, res) => {
  try {
    const inquiry = await VisitorInquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Visitor inquiry not found." });
    }

    await VisitorInquiry.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Visitor inquiry deleted successfully.",
    });
  } catch (error) {
    console.error("deleteVisitorInquiry error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
