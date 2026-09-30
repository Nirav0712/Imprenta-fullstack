import React, { useState } from "react";
import {
  FiX,
  FiUser,
  FiBriefcase,
  FiHome,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiFileText,
  FiImage,
  FiTrash2,
  FiPrinter,
  FiCopy,
  FiCheck,
  FiExternalLink,
} from "react-icons/fi";
import { format } from "date-fns";

const STATUS_OPTIONS = ["New", "Contacted", "In Progress", "Completed", "Cancelled"];

const VisitorInquiryDetailModal = ({
  inquiry,
  isOpen,
  onClose,
  onUpdateStatus,
  onDelete,
  updatingStatus,
}) => {
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!isOpen || !inquiry) return null;

  const handleCopy = () => {
    const fullAddress = [
      inquiry.address,
      inquiry.city,
      inquiry.state,
      inquiry.pincode ? `- ${inquiry.pincode}` : "",
    ]
      .filter(Boolean)
      .join(", ");

    const text = `VISITOR INQUIRY DETAILS
Name: ${inquiry.name}
Designation: ${inquiry.designation || "N/A"}
Company: ${inquiry.companyName}
Phone: ${inquiry.contactNo}
Email: ${inquiry.email}
Address: ${fullAddress || "N/A"}
Date: ${inquiry.createdAt ? format(new Date(inquiry.createdAt), "dd MMM yyyy, hh:mm a") : "N/A"}
Requirements:
${inquiry.requirements && inquiry.requirements.length > 0 ? inquiry.requirements.map((r, i) => `${i + 1}. ${r}`).join("\n") : "None specified"}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
        <div
          className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0F1B2D] text-slate-200 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Accent Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-600"></div>

          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 p-5 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <FiFileText size={20} />
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">Visitor Inquiry Details</h3>
                <p className="text-xs text-slate-400">
                  Received {inquiry.createdAt ? format(new Date(inquiry.createdAt), "dd MMM yyyy, hh:mm a") : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition"
                title="Copy details to clipboard"
              >
                {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 transition"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-8 space-y-6">
            {/* Status & Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-[#08111F] p-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Status:</span>
                <select
                  value={inquiry.status || "New"}
                  disabled={updatingStatus}
                  onChange={(e) => onUpdateStatus(inquiry._id, e.target.value)}
                  className="rounded-xl border border-white/10 bg-[#101B2D] px-3.5 py-1.5 text-xs font-bold text-white outline-none focus:border-sky-500 cursor-pointer"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onDelete(inquiry._id, inquiry.name)}
                  className="flex items-center gap-1.5 rounded-xl bg-red-500/10 border border-red-500/20 px-3.5 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500/20 transition"
                >
                  <FiTrash2 size={13} /> Delete Inquiry
                </button>
              </div>
            </div>

            {/* PHYSICAL SLIP CONTAINER (Branded Sheet Design) */}
            <div className="rounded-2xl border-2 border-white/10 bg-[#070E18] overflow-hidden shadow-inner">
              {/* Slip Header */}
              <div className="bg-[#0A1626] border-b border-white/10 p-4 text-center">
                <p className="text-[11px] font-mono uppercase tracking-widest text-sky-400 font-bold">
                  IMPRENTA PACKAGING & COMMERCIAL PRINTING
                </p>
                <h4 className="text-base sm:text-lg font-black uppercase text-white tracking-wider mt-0.5">
                  VISITOR INQUIRY FORM SLIP
                </h4>
              </div>

              {/* Slip Body */}
              <div className="p-5 sm:p-6 space-y-6">
                {/* 1. Visitor Details Table */}
                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider mb-1">
                        Visitor Name
                      </span>
                      <span className="text-white font-bold text-base">{inquiry.name}</span>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider mb-1">
                        Designation
                      </span>
                      <span className="text-slate-200 font-medium">
                        {inquiry.designation || "Not Specified"}
                      </span>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 sm:col-span-2">
                      <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider mb-1">
                        Company Name
                      </span>
                      <span className="text-white font-bold">{inquiry.companyName}</span>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider mb-1">
                        Contact Number
                      </span>
                      <a
                        href={`tel:${inquiry.contactNo}`}
                        className="text-sky-400 font-bold hover:underline inline-flex items-center gap-1.5"
                      >
                        <FiPhone size={13} /> {inquiry.contactNo}
                      </a>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider mb-1">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="text-sky-400 font-medium hover:underline inline-flex items-center gap-1.5 break-all"
                      >
                        <FiMail size={13} /> {inquiry.email}
                      </a>
                    </div>

                    {(inquiry.address || inquiry.city || inquiry.state || inquiry.pincode) && (
                      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 sm:col-span-2 space-y-1.5">
                        <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">
                          Address Details
                        </span>
                        {inquiry.address && (
                          <span className="text-slate-200 text-sm flex items-start gap-1.5">
                            <FiMapPin size={14} className="text-sky-400 shrink-0 mt-0.5" />
                            {inquiry.address}
                          </span>
                        )}
                        {(inquiry.city || inquiry.state || inquiry.pincode) && (
                          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                            {inquiry.city && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300">
                                <span className="text-slate-500 font-semibold">City:</span> {inquiry.city}
                              </span>
                            )}
                            {inquiry.state && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300">
                                <span className="text-slate-500 font-semibold">State:</span> {inquiry.state}
                              </span>
                            )}
                            {inquiry.pincode && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300">
                                <span className="text-slate-500 font-semibold">Pincode:</span> {inquiry.pincode}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Requirements Details (Numbered list) */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                      <FiFileText size={14} /> Requirements Details
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {inquiry.requirements?.length || 0} line items
                    </span>
                  </div>

                  {inquiry.requirements && inquiry.requirements.length > 0 ? (
                    <div className="space-y-2 rounded-xl border border-white/5 bg-black/20 p-4">
                      {inquiry.requirements.map((req, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 text-sm text-slate-200 border-b border-white/5 pb-2 last:border-0 last:pb-0"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-400 font-bold text-xs border border-sky-500/20">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed font-medium pt-0.5">{req}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-white/5 bg-black/10 p-4 text-center text-xs text-slate-500">
                      No specific requirement line items mentioned.
                    </div>
                  )}
                </div>

                {/* 3. Visiting Card Section */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                    <FiImage size={14} /> Visiting Card Attachment
                  </span>

                  {inquiry.visitingCardImage ? (
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 flex flex-col sm:flex-row items-center gap-5">
                      <div
                        onClick={() => setLightboxOpen(true)}
                        className="relative w-48 h-32 rounded-xl overflow-hidden bg-black/60 border border-white/10 shrink-0 cursor-pointer group shadow-lg"
                      >
                        <img
                          src={inquiry.visitingCardImage}
                          alt="Visiting Card"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold gap-1 transition">
                          <FiExternalLink /> Click to View
                        </div>
                      </div>

                      <div className="space-y-2 text-center sm:text-left">
                        <p className="text-sm font-bold text-white">Visiting / Business Card</p>
                        <p className="text-xs text-slate-400">
                          Uploaded photo of the visitor's card.
                        </p>
                        <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                          <a
                            href={inquiry.visitingCardImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-xl bg-sky-500/10 border border-sky-500/20 px-3.5 py-1.5 text-xs font-bold text-sky-400 hover:bg-sky-500/20 transition"
                          >
                            <FiExternalLink size={12} /> Open Full Size
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-white/5 bg-black/10 p-5 text-center text-xs text-slate-500">
                      No visiting card image was attached with this inquiry.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex items-center justify-end border-t border-white/10 p-5 sm:px-8 bg-[#0A1220]/50">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-white/5 border border-white/10 px-6 py-2.5 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox for visiting card */}
      {lightboxOpen && inquiry.visitingCardImage && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-black border border-white/20 p-2">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition"
            >
              <FiX size={20} />
            </button>
            <img
              src={inquiry.visitingCardImage}
              alt="Visiting Card Full Size"
              className="max-h-[85vh] max-w-full object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VisitorInquiryDetailModal;
