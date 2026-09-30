import { jsPDF } from "jspdf";
import { format } from "date-fns";

/**
 * Helper to fetch image as base64 data URL with CORS support
 */
const getImageDataUrl = async (url) => {
  if (!url) return null;
  try {
    const res = await fetch(url, { mode: "cors" });
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn("Could not convert image to DataURL:", e);
    return null;
  }
};

/**
 * Generate a beautifully structured and branded PDF for a single Visitor Inquiry
 */
export const exportVisitorInquiryPDF = async (inquiry) => {
  if (!inquiry) return;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // 1. Top Decorative Brand Bar
  doc.setFillColor(2, 132, 199); // sky-600
  doc.rect(0, 0, pageWidth, 5, "F");

  // Secondary cyan accent stripe
  doc.setFillColor(56, 189, 248); // sky-400
  doc.rect(0, 5, pageWidth, 1.5, "F");

  // 2. Header Box (Navy Dark #0A1628)
  const headerY = 10;
  const headerHeight = 32;
  doc.setFillColor(10, 22, 40);
  doc.roundedRect(margin, headerY, contentWidth, headerHeight, 3, 3, "F");

  // Header Border
  doc.setDrawColor(56, 189, 248);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, headerY, contentWidth, headerHeight, 3, 3, "D");

  // Brand Name
  doc.setTextColor(56, 189, 248);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("IMPRENTA PVT. LTD.", margin + 6, headerY + 8);

  // Form Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.text("VISITOR INQUIRY SLIP / RECORD", margin + 6, headerY + 16);

  // Subtitle
  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(
    "Official Record of Visitor Contact & Custom Packaging Requirements",
    margin + 6,
    headerY + 22
  );

  // Date & Status on Right side of Header
  const dateStr = inquiry.createdAt
    ? format(new Date(inquiry.createdAt), "dd MMM yyyy, hh:mm a")
    : format(new Date(), "dd MMM yyyy, hh:mm a");

  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text(`Date: ${dateStr}`, pageWidth - margin - 6, headerY + 8, { align: "right" });

  doc.text(
    `Inquiry ID: #${(inquiry._id || "").slice(-8).toUpperCase()}`,
    pageWidth - margin - 6,
    headerY + 14,
    { align: "right" }
  );

  // Status Badge in Header
  const status = inquiry.status || "New";
  doc.setFillColor(status === "Completed" ? 16 : status === "Cancelled" ? 220 : 2, status === "Completed" ? 185 : status === "Cancelled" ? 38 : 132, status === "Completed" ? 129 : status === "Cancelled" ? 38 : 199);
  doc.roundedRect(pageWidth - margin - 32, headerY + 19, 26, 6, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(status.toUpperCase(), pageWidth - margin - 19, headerY + 23.5, { align: "center" });

  let currentY = headerY + headerHeight + 6;

  // SECTION 1: VISITOR DETAILS BOX
  const section1Height = 56;
  doc.setFillColor(248, 250, 252); // slate-50 background
  doc.roundedRect(margin, currentY, contentWidth, section1Height, 2.5, 2.5, "F");
  doc.setDrawColor(226, 232, 240); // slate-200 border
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY, contentWidth, section1Height, 2.5, 2.5, "D");

  // Section 1 Header
  doc.setFillColor(15, 23, 42); // slate-900
  doc.roundedRect(margin, currentY, contentWidth, 7.5, 2.5, 2.5, "F");
  doc.rect(margin, currentY + 4, contentWidth, 3.5, "F"); // flatten bottom corners
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("1. VISITOR & COMPANY DETAILS", margin + 5, currentY + 5.2);

  // Grid Data inside Section 1
  const col1X = margin + 5;
  const col2X = margin + contentWidth / 2 + 3;
  let rowY = currentY + 14;

  const drawField = (label, val, x, y, isBold = false) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(label.toUpperCase(), x, y);

    doc.setFont("helvetica", isBold ? "bold" : "normal");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42); // slate-900
    const cleanVal = (val || "").toString().trim() || "N/A";
    doc.text(cleanVal, x, y + 4.5);
  };

  drawField("Full Name", inquiry.name, col1X, rowY, true);
  drawField("Designation", inquiry.designation || "N/A", col2X, rowY);

  rowY += 11;
  drawField("Company Name", inquiry.companyName, col1X, rowY, true);
  drawField("Contact Number", inquiry.contactNo, col2X, rowY, true);

  rowY += 11;
  drawField("Email Address", inquiry.email, col1X, rowY);

  // Address line & city/state/country/pincode
  const fullLoc = [
    inquiry.address,
    inquiry.city,
    inquiry.state,
    inquiry.country,
    inquiry.pincode ? `PIN: ${inquiry.pincode}` : "",
  ]
    .filter(Boolean)
    .join(", ");

  drawField("Location / Address", fullLoc || "N/A", col2X, rowY);

  currentY += section1Height + 6;

  // SECTION 2: REQUIREMENTS DETAILS (Numbered List)
  const reqs = inquiry.requirements && inquiry.requirements.length > 0 ? inquiry.requirements : [];
  const minReqHeight = Math.max(34, 14 + (reqs.length || 1) * 7.5);

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, currentY, contentWidth, minReqHeight, 2.5, 2.5, "F");
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY, contentWidth, minReqHeight, 2.5, 2.5, "D");

  // Section 2 Header
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, currentY, contentWidth, 7.5, 2.5, 2.5, "F");
  doc.rect(margin, currentY + 4, contentWidth, 3.5, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("2. PROJECT REQUIREMENTS DETAILS", margin + 5, currentY + 5.2);

  // Requirements List Items
  let reqY = currentY + 13;
  if (reqs.length === 0) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(148, 163, 184);
    doc.text("No specific requirement line items mentioned.", margin + 6, reqY);
    reqY += 8;
  } else {
    reqs.forEach((item, idx) => {
      // Number bubble
      doc.setFillColor(2, 132, 199);
      doc.roundedRect(margin + 5, reqY - 3.2, 5, 4.5, 1, 1, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.text(`${idx + 1}`, margin + 7.5, reqY, { align: "center" });

      // Requirement text
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      const splitText = doc.splitTextToSize(item, contentWidth - 18);
      doc.text(splitText, margin + 13, reqY);
      reqY += splitText.length * 5.2 + 2;
    });
  }

  currentY += minReqHeight + 6;

  // SECTION 3: REMARKS / ADDITIONAL NOTES
  const notesHeight = 24;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, currentY, contentWidth, notesHeight, 2.5, 2.5, "F");
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY, contentWidth, notesHeight, 2.5, 2.5, "D");

  // Section 3 Header
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, currentY, contentWidth, 7.5, 2.5, 2.5, "F");
  doc.rect(margin, currentY + 4, contentWidth, 3.5, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("3. REMARKS & SPECIAL INSTRUCTIONS", margin + 5, currentY + 5.2);

  doc.setFont("helvetica", inquiry.notes ? "normal" : "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(inquiry.notes ? 30 : 148, inquiry.notes ? 41 : 163, inquiry.notes ? 59 : 184);
  const noteLines = doc.splitTextToSize(
    inquiry.notes || "No additional remarks or notes provided.",
    contentWidth - 10
  );
  doc.text(noteLines, margin + 5, currentY + 14);

  currentY += notesHeight + 6;

  // SECTION 4: VISITING CARD ATTACHMENT (If available)
  if (inquiry.visitingCardImage) {
    try {
      const cardDataUrl = await getImageDataUrl(inquiry.visitingCardImage);
      if (cardDataUrl) {
        const cardSectionHeight = 58;
        // Check if fits on current page or needs new page
        if (currentY + cardSectionHeight > pageHeight - 20) {
          doc.addPage();
          currentY = 15;
        }

        doc.setFillColor(248, 250, 252);
        doc.roundedRect(margin, currentY, contentWidth, cardSectionHeight, 2.5, 2.5, "F");
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.roundedRect(margin, currentY, contentWidth, cardSectionHeight, 2.5, 2.5, "D");

        // Section 4 Header
        doc.setFillColor(15, 23, 42);
        doc.roundedRect(margin, currentY, contentWidth, 7.5, 2.5, 2.5, "F");
        doc.rect(margin, currentY + 4, contentWidth, 3.5, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text("4. VISITING / BUSINESS CARD ATTACHMENT", margin + 5, currentY + 5.2);

        // Render Card Image
        doc.addImage(cardDataUrl, "JPEG", margin + 6, currentY + 11, 75, 42, undefined, "FAST");

        // Text beside image
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        doc.text("Visitor Card Verified & Attached", margin + 86, currentY + 18);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text("Submitted via digital visitor form upload.", margin + 86, currentY + 24);
        doc.text(`Company: ${inquiry.companyName}`, margin + 86, currentY + 30);
        doc.text(`Contact: ${inquiry.contactNo}`, margin + 86, currentY + 36);

        currentY += cardSectionHeight + 6;
      }
    } catch (err) {
      console.warn("Card image embedding error:", err);
    }
  }

  // Footer Section
  const footerY = pageHeight - 12;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text("Imprenta Pvt. Ltd. | Packaging & Commercial Printing Solutions", margin, footerY + 1);
  doc.text(
    `Generated on: ${format(new Date(), "dd-MM-yyyy HH:mm")}`,
    pageWidth - margin,
    footerY + 1,
    { align: "right" }
  );

  // File Download
  const cleanName = (inquiry.name || "Visitor").replace(/[^a-zA-Z0-9_-]/g, "_");
  const cleanCompany = (inquiry.companyName || "Company").replace(/[^a-zA-Z0-9_-]/g, "_");
  const fileName = `Visitor_Inquiry_${cleanName}_${cleanCompany}.pdf`;

  doc.save(fileName);
};
