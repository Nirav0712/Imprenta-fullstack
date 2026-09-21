import ExpoLead from "../models/ExpoLead.js";
import Expo from "../models/Expo.js";

// Helper function to safely escape CSV cell values
const escapeCsvValue = (val) => {
  if (val === null || val === undefined) return "";
  let str = String(val);
  // Check if string contains quotes, commas, newlines or carriage returns
  if (/[",\n\r]/.test(str)) {
    str = `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

// @desc Get all Expo Leads with filters (Admin)
// @route GET /api/expo-leads
export const getExpoLeads = async (req, res) => {
  try {
    const { expoId, status, search, startDate, endDate, page = 1, limit = 50 } = req.query;

    let filter = {};

    if (expoId && expoId !== "all") {
      filter.expoId = expoId;
    }

    if (status && status !== "all") {
      filter.status = status;
    }

    if (startDate || endDate) {
      filter.submittedAt = {};
      if (startDate) filter.submittedAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.submittedAt.$lte = end;
      }
    }

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { expoName: { $regex: search, $options: "i" } },
        { packagingRequirement: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await ExpoLead.countDocuments(filter);
    const leads = await ExpoLead.find(filter)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: leads.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      leads,
    });
  } catch (error) {
    console.error("getExpoLeads error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single lead details (Admin)
// @route GET /api/expo-leads/:id
export const getExpoLeadById = async (req, res) => {
  try {
    const lead = await ExpoLead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found." });
    }

    res.status(200).json({ success: true, lead });
  } catch (error) {
    console.error("getExpoLeadById error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update lead status & notes (Admin)
// @route PUT /api/expo-leads/:id
export const updateExpoLead = async (req, res) => {
  try {
    const { status, notes } = req.body;
    let lead = await ExpoLead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found." });
    }

    if (status) lead.status = status;
    if (notes !== undefined) lead.notes = notes;

    await lead.save();

    res.status(200).json({
      success: true,
      message: "Lead updated successfully!",
      lead,
    });
  } catch (error) {
    console.error("updateExpoLead error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete lead (Admin)
// @route DELETE /api/expo-leads/:id
export const deleteExpoLead = async (req, res) => {
  try {
    const lead = await ExpoLead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found." });
    }

    res.status(200).json({
      success: true,
      message: "Lead removed successfully!",
    });
  } catch (error) {
    console.error("deleteExpoLead error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Export leads to CSV (Admin)
// @route GET /api/expo-leads/export/csv
export const exportExpoLeadsCSV = async (req, res) => {
  try {
    const { expoId, status, search, startDate, endDate } = req.query;

    let filter = {};

    if (expoId && expoId !== "all") {
      filter.expoId = expoId;
    }

    if (status && status !== "all") {
      filter.status = status;
    }

    if (startDate || endDate) {
      filter.submittedAt = {};
      if (startDate) filter.submittedAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.submittedAt.$lte = end;
      }
    }

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { expoName: { $regex: search, $options: "i" } },
        { packagingRequirement: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await ExpoLead.find(filter).sort({ submittedAt: -1 });

    // Define CSV Headers
    const headers = [
      "Lead ID",
      "Expo ID",
      "Expo Name",
      "Full Name",
      "Company Name",
      "Email Address",
      "Phone Number",
      "Packaging Requirement",
      "Preferred Meeting Date",
      "Message",
      "Source Page",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "Lead Status",
      "Internal Notes",
      "Submission Date",
    ];

    const rows = leads.map((l) => [
      l._id.toString(),
      l.expoId.toString(),
      l.expoName,
      l.fullName,
      l.companyName,
      l.email,
      l.phone,
      l.packagingRequirement,
      l.preferredMeetingDate,
      l.message,
      l.sourcePage,
      l.utmSource,
      l.utmMedium,
      l.utmCampaign,
      l.status,
      l.notes,
      l.submittedAt ? l.submittedAt.toISOString() : "",
    ]);

    // Build CSV string
    const csvContent =
      headers.map(escapeCsvValue).join(",") +
      "\n" +
      rows.map((row) => row.map(escapeCsvValue).join(",")).join("\n");

    const fileName = `imprenta-expo-leads-${Date.now()}.csv`;

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.status(200).send(csvContent);
  } catch (error) {
    console.error("exportExpoLeadsCSV error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
