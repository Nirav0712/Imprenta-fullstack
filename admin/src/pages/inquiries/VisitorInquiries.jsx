import React, { useState, useEffect, useMemo } from "react";
import {
  FiSearch,
  FiEye,
  FiTrash2,
  FiUserCheck,
  FiCalendar,
  FiPhone,
  FiMail,
  FiBriefcase,
  FiFileText,
  FiImage,
  FiRefreshCw,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";
import { formatDistanceToNow, format } from "date-fns";
import { visitorInquiryService } from "../../services/visitorInquiryService";
import VisitorInquiryDetailModal from "./VisitorInquiryDetailModal";

const STATUS_TABS = [
  { id: "All", label: "All Inquiries" },
  { id: "New", label: "New" },
  { id: "Contacted", label: "Contacted" },
  { id: "In Progress", label: "In Progress" },
  { id: "Completed", label: "Completed" },
  { id: "Cancelled", label: "Cancelled" },
];

const VisitorInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter !== "All") params.status = statusFilter;
      if (searchQuery.trim()) params.search = searchQuery.trim();

      const res = await visitorInquiryService.getVisitorInquiries(params);
      setInquiries(res.data || []);
    } catch (error) {
      console.error("Failed to load visitor inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadInquiries();
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setUpdatingStatusId(id);
      const res = await visitorInquiryService.updateVisitorInquiryStatus(id, { status: newStatus });
      if (res.success) {
        setInquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry && selectedInquiry._id === id) {
          setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update status.");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete visitor inquiry from "${name}"? This action cannot be undone.`)) {
      try {
        const res = await visitorInquiryService.deleteVisitorInquiry(id);
        if (res.success) {
          setInquiries((prev) => prev.filter((item) => item._id !== id));
          if (selectedInquiry && selectedInquiry._id === id) {
            setSelectedInquiry(null);
          }
        }
      } catch (error) {
        console.error(error);
        alert("Failed to delete inquiry.");
      }
    }
  };

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter((i) => i.status === "New").length;
    const inProgress = inquiries.filter((i) => i.status === "In Progress" || i.status === "Contacted").length;
    const completed = inquiries.filter((i) => i.status === "Completed").length;
    return { total, newCount, inProgress, completed };
  }, [inquiries]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "In Progress":
      case "Contacted":
        return "bg-sky-500/15 text-sky-400 border-sky-500/30";
      case "Cancelled":
        return "bg-red-500/15 text-red-400 border-red-500/30";
      default:
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <FiUserCheck size={22} />
            </span>
            Visitor Inquiries
          </h1>
          <p className="mt-1 text-slate-400 text-sm">
            Manage all physical slip and digital visitor inquiries, customer requirements & visiting cards.
          </p>
        </div>

        <button
          type="button"
          onClick={loadInquiries}
          className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition w-fit"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#101B2D] p-5 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Inquiries
          </span>
          <span className="text-2xl sm:text-3xl font-black text-white">{metrics.total}</span>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
            New Submissions
          </span>
          <span className="text-2xl sm:text-3xl font-black text-amber-300">{metrics.newCount}</span>
        </div>

        <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block mb-1">
            In Progress / Contacted
          </span>
          <span className="text-2xl sm:text-3xl font-black text-sky-300">{metrics.inProgress}</span>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            Completed
          </span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-300">{metrics.completed}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#101B2D] p-4">
        {/* Status Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-80">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by visitor, company, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#08111F] pl-10 pr-4 py-2 text-xs text-white outline-none focus:border-sky-500"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-white/10 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Visitor Inquiries Table */}
      <div className="rounded-2xl border border-white/10 bg-[#101B2D] overflow-hidden shadow-xl">
        <div className="hidden lg:block overflow-x-auto w-full">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#08111F] text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 w-20">Card</th>
                <th className="px-6 py-4">Visitor & Designation</th>
                <th className="px-6 py-4">Company & Contact</th>
                <th className="px-6 py-4">Requirements</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center text-slate-400 animate-pulse">
                    Loading Visitor Inquiries...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center text-slate-400">
                    No visitor inquiries found.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr
                    key={inq._id}
                    onClick={() => setSelectedInquiry(inq)}
                    className="hover:bg-white/[0.02] transition cursor-pointer group"
                  >
                    {/* Visiting Card Thumbnail */}
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      {inq.visitingCardImage ? (
                        <a
                          href={inq.visitingCardImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                          title="Open Card"
                        >
                          <img
                            src={inq.visitingCardImage}
                            alt="Visiting Card"
                            className="h-12 w-16 rounded-xl object-cover bg-black/40 border border-white/10 hover:scale-105 transition"
                          />
                        </a>
                      ) : (
                        <div className="h-12 w-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-600">
                          <FiImage size={18} />
                        </div>
                      )}
                    </td>

                    {/* Visitor Name & Designation */}
                    <td className="px-6 py-4">
                      <div>
                        <span className="font-bold text-white text-base group-hover:text-sky-400 transition">
                          {inq.name}
                        </span>
                        {inq.designation && (
                          <span className="block text-xs text-slate-400 mt-0.5 font-medium">
                            {inq.designation}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Company & Contact */}
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-xs">
                        <span className="font-bold text-slate-200 block text-sm">
                          {inq.companyName}
                        </span>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <FiPhone size={12} className="text-sky-400" />
                          <span>{inq.contactNo}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <FiMail size={12} className="text-cyan-400" />
                          <span>{inq.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Requirements */}
                    <td className="px-6 py-4 max-w-xs">
                      {inq.requirements && inq.requirements.length > 0 ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-md">
                            {inq.requirements.length} item(s)
                          </span>
                          <p className="text-xs text-slate-300 truncate" title={inq.requirements.join(", ")}>
                            {inq.requirements[0]}
                          </p>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 italic">None</span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">
                      {inq.createdAt ? (
                        <div>
                          <span className="text-slate-200 font-medium block">
                            {format(new Date(inq.createdAt), "dd MMM yyyy")}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {formatDistanceToNow(new Date(inq.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadge(
                          inq.status
                        )}`}
                      >
                        {inq.status || "New"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedInquiry(inq)}
                          className="rounded-xl bg-slate-800 p-2.5 text-slate-300 hover:text-white hover:bg-sky-500 transition"
                          title="View Details"
                        >
                          <FiEye size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(inq._id, inq.name)}
                          className="rounded-xl bg-red-500/10 p-2.5 text-red-400 hover:bg-red-500 hover:text-white transition"
                          title="Delete Inquiry"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="grid grid-cols-1 gap-4 p-4 lg:hidden">
          {loading ? (
            <div className="p-10 text-center text-slate-400">Loading Visitor Inquiries...</div>
          ) : inquiries.length === 0 ? (
            <div className="p-10 text-center text-slate-400">No visitor inquiries found.</div>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq._id}
                onClick={() => setSelectedInquiry(inq)}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm space-y-4 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {inq.visitingCardImage ? (
                      <img
                        src={inq.visitingCardImage}
                        alt="Card"
                        className="h-12 w-14 rounded-xl object-cover bg-black/40 border border-white/10 shrink-0"
                      />
                    ) : (
                      <div className="h-12 w-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-600 shrink-0">
                        <FiImage size={18} />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-white text-base leading-snug">{inq.name}</h4>
                      <p className="text-xs text-slate-400">{inq.designation || inq.companyName}</p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(
                      inq.status
                    )}`}
                  >
                    {inq.status || "New"}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300 border-t border-white/5 pt-3">
                  <p className="font-bold text-white">{inq.companyName}</p>
                  <p className="text-slate-400">{inq.contactNo} • {inq.email}</p>
                  {inq.requirements && inq.requirements.length > 0 && (
                    <p className="text-sky-400 pt-1">
                      {inq.requirements.length} requirement line(s) specified
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3" onClick={(e) => e.stopPropagation()}>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    {inq.createdAt ? format(new Date(inq.createdAt), "dd MMM yyyy, hh:mm a") : ""}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedInquiry(inq)}
                      className="rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-bold text-sky-400 hover:bg-sky-500 hover:text-white transition"
                    >
                      View Slip
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(inq._id, inq.name)}
                      className="rounded-xl bg-red-500/10 p-2 text-red-400 hover:bg-red-500 hover:text-white transition"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detailed Modal Slip */}
      <VisitorInquiryDetailModal
        inquiry={selectedInquiry}
        isOpen={Boolean(selectedInquiry)}
        onClose={() => setSelectedInquiry(null)}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDelete}
        updatingStatus={Boolean(updatingStatusId)}
      />
    </div>
  );
};

export default VisitorInquiries;
