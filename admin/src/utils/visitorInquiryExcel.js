import * as XLSX from "xlsx";
import { format } from "date-fns";

/**
 * Export a list of Visitor Inquiries to an Excel (.xlsx) spreadsheet
 * @param {Array} inquiriesList - Array of visitor inquiries to export
 * @param {string} customFileName - Optional file name
 */
export const exportVisitorInquiriesToExcel = (inquiriesList = [], customFileName = "") => {
  if (!inquiriesList || inquiriesList.length === 0) {
    alert("No visitor inquiries selected to export.");
    return;
  }

  // Format the data into structured tabular rows
  const formattedRows = inquiriesList.map((inq, index) => {
    // Process requirements array into readable multiline string
    let requirementsText = "N/A";
    if (inq.requirements && Array.isArray(inq.requirements) && inq.requirements.length > 0) {
      requirementsText = inq.requirements.map((r, i) => `${i + 1}. ${r}`).join("\n");
    }

    const formattedDate = inq.createdAt
      ? format(new Date(inq.createdAt), "dd-MM-yyyy hh:mm a")
      : "N/A";

    return {
      "S.No": index + 1,
      "Inquiry ID": (inq._id || "").slice(-8).toUpperCase(),
      "Date & Time": formattedDate,
      "Visitor Name": inq.name || "",
      "Designation": inq.designation || "",
      "Company Name": inq.companyName || "",
      "Contact Number": inq.contactNo || "",
      "Email Address": inq.email || "",
      "Office / Factory Address": inq.address || "",
      "City": inq.city || "",
      "State": inq.state || "",
      "Country": inq.country || "India",
      "Pincode": inq.pincode || "",
      "Requirements": requirementsText,
      "Remarks / Notes": inq.notes || "",
      "Visiting Card Attachment": inq.visitingCardImage || "None",
      "Status": inq.status || "New",
    };
  });

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(formattedRows);

  // Set explicit column widths for beautiful spreadsheet viewing
  worksheet["!cols"] = [
    { wch: 6 },  // S.No
    { wch: 12 }, // Inquiry ID
    { wch: 20 }, // Date & Time
    { wch: 22 }, // Visitor Name
    { wch: 24 }, // Designation
    { wch: 28 }, // Company Name
    { wch: 18 }, // Contact Number
    { wch: 28 }, // Email Address
    { wch: 35 }, // Office Address
    { wch: 16 }, // City
    { wch: 16 }, // State
    { wch: 16 }, // Country
    { wch: 12 }, // Pincode
    { wch: 45 }, // Requirements
    { wch: 35 }, // Remarks
    { wch: 35 }, // Visiting Card
    { wch: 14 }, // Status
  ];

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Visitor Inquiries");

  // Generate file name with date & count
  const countStr = `${inquiriesList.length}_Inquiries`;
  const dateStr = format(new Date(), "dd-MMM-yyyy");
  const fileName = customFileName || `Imprenta_Visitor_Inquiries_${countStr}_${dateStr}.xlsx`;

  // Write and trigger download
  XLSX.writeFile(workbook, fileName);
};
