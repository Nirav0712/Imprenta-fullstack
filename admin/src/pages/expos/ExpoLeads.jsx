import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  FiUsers,
  FiSearch,
  FiDownload,
  FiFilter,
  FiCalendar,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiFileText,
  FiCheckCircle,
  FiX,
  FiTag,
  FiTrash2,
  FiSave,
} from "react-icons/fi";
import { expoLeadService } from "../../services/expoLeadService";
import { expoService } from "../../services/expoService";

const STATUS_COLORS = {
  New: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  Contacted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Qualified: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  "Meeting Scheduled": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Converted: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Closed: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  Spam: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Qualified",
  "Meeting Scheduled",
  "Converted",
  "Closed",
  "Spam",
];

const ExpoLeads = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialExpoId = searchParams.get("expoId") || "all";

  const [leads, setLeads] = useState([]);
  const [exposList, setExposList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  // Filter States
  const [selectedExpo, setSelectedExpo] = useState(initialExpoId);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Selected Lead for Details Drawer/Modal
  const [activeLead, setActiveLead] = useState(null);
  const [leadStatusUpdate, setLeadStatusUpdate] = useState("");
  const [leadNotesUpdate, setLeadNotesUpdate] = useState("");
  const [savingLead, setSavingLead] = useState(false);

  // Fetch all expos for dropdown
  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await expoService.getExpos();
        setExposList(res.expos || []);
      } catch (error) {
        console.error("Failed to load expos for filter:", error);
      }
    };
    fetchExpos();
  }, []);

  // Load leads based on filters
  const loadLeads = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedExpo !== "all") params.expoId = selectedExpo;
      if (selectedStatus !== "all") params.status = selectedStatus;
      if (searchQuery) params.search = searchQuery;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const res = await expoLeadService.getLeads(params);
      setLeads(res.leads || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch expo leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [selectedExpo, selectedStatus]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadLeads();
  };

  // Open Lead Drawer
  const openLeadDrawer = (lead) => {
    setActiveLead(lead);
    setLeadStatusUpdate(lead.status);
    setLeadNotesUpdate(lead.notes || "");
  };

  // Update Lead Status & Notes
  const handleSaveLeadDetails = async () => {
    if (!activeLead) return;
    try {
      setSavingLead(true);
      const res = await expoLeadService.updateLead(activeLead._id, {
        status: leadStatusUpdate,
        notes: leadNotesUpdate,
      });

      // Update in local list
      setLeads((prev) =>
        prev.map((l) => (l._id === activeLead._id ? res.lead : l))
      );
      setActiveLead(res.lead);
      alert("Lead updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update lead.");
    } finally {
      setSavingLead(false);
    }
  };

  // Delete Lead
  const handleDeleteLead = async (id) => {
    if (window.confirm("Are you sure you want to remove this lead record?")) {
      try {
        await expoLeadService.deleteLead(id);
        setLeads((prev) => prev.filter((l) => l._id !== id));
        if (activeLead?._id === id) setActiveLead(null);
        alert("Lead removed.");
      } catch (error) {
        console.error(error);
        alert("Failed to delete lead.");
      }
    }
  };

  // CSV Export
  const handleExportCSV = async () => {
    try {
      setExporting(true);
      const params = {};
      if (selectedExpo !== "all") params.expoId = selectedExpo;
      if (selectedStatus !== "all") params.status = selectedStatus;
      if (searchQuery) params.search = searchQuery;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      await expoLeadService.exportCSV(params);
    } catch (error) {
      console.error(error);
      alert("Failed to export leads to CSV.");
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (dateVal) => {
    if (!dateVal) return "N/A";
    const d = new Date(dateVal);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <FiUsers className="text-sky-400" /> Expo Leads & Meeting Requests
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            View, filter, qualify, and export leads captured from dynamic Expo landing pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            disabled={exporting || leads.length === 0}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-500 transition shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50"
          >
            <FiDownload /> {exporting ? "Exporting CSV..." : "Export Leads (CSV)"}
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="rounded-2xl border border-white/10 bg-[#101B2D] p-5 space-y-4 shadow-xl">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {/* Expo Filter */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-400">Filter by Expo</label>
            <select
              value={selectedExpo}
              onChange={(e) => setSelectedExpo(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#08111F] px-3.5 py-2.5 text-xs text-white outline-none focus:border-sky-500"
            >
              <option value="all">All Expos (Combined)</option>
              {exposList.map((exp) => (
                <option key={exp._id} value={exp._id}>
                  {exp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-400">Filter by Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#08111F] px-3.5 py-2.5 text-xs text-white outline-none focus:border-sky-500"
            >
              <option value="all">All Statuses</option>
              {LEAD_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-400">From Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#08111F] px-3.5 py-2.5 text-xs text-white outline-none focus:border-sky-500"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-400">To Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#08111F] px-3.5 py-2.5 text-xs text-white outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 pt-2 border-t border-white/5">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by lead name, company, email, phone, requirement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#08111F] pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-sky-500"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-400 transition"
          >
            Apply Search
          </button>

          {(searchQuery || startDate || endDate || selectedExpo !== "all" || selectedStatus !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSelectedExpo("all");
                setSelectedStatus("all");
                setSearchQuery("");
                setStartDate("");
                setEndDate("");
              }}
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              Reset
            </button>
          )}
        </form>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl border border-white/10 bg-[#101B2D] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#08111F] text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Lead Contact</th>
                <th className="px-6 py-4">Expo Attribution</th>
                <th className="px-6 py-4">Packaging Requirement</th>
                <th className="px-6 py-4">Preferred Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Submitted At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-400 animate-pulse">
                    Loading Expo leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                    No leads found matching current filter criteria.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead._id}
                    onClick={() => openLeadDrawer(lead)}
                    className="hover:bg-white/[0.03] transition cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-bold text-white text-base">{lead.fullName}</div>
                        <div className="text-xs text-sky-400 font-medium">{lead.companyName}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{lead.email}</div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200">
                        <FiTag size={12} className="text-sky-400" />
                        {lead.expoName}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-200">
                        {lead.packagingRequirement || "General Inquiry"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-slate-300">
                        {lead.preferredMeetingDate || "Not specified"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                          STATUS_COLORS[lead.status] || "bg-slate-500/20 text-slate-400 border-slate-500/30"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-400">
                      {formatDate(lead.submittedAt || lead.createdAt)}
                    </td>

                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openLeadDrawer(lead)}
                          className="rounded-lg bg-sky-500/10 border border-sky-400/20 px-3 py-1.5 text-xs font-bold text-sky-400 hover:bg-sky-500/20 transition"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead._id)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition"
                          title="Delete Lead"
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
      </div>

      {/* Lead Details Modal / Drawer */}
      {activeLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#101B2D] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Lead Details & Attribution
                </span>
                <h3 className="text-2xl font-black text-white mt-1">{activeLead.fullName}</h3>
                <p className="text-sm text-slate-400">{activeLead.companyName}</p>
              </div>

              <button
                onClick={() => setActiveLead(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-white/5 bg-[#08111F] p-4 text-sm">
              <div>
                <span className="text-xs text-slate-400 block mb-0.5">Email Address</span>
                <a href={`mailto:${activeLead.email}`} className="text-sky-400 font-medium hover:underline">
                  {activeLead.email}
                </a>
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-0.5">Phone Number</span>
                <a href={`tel:${activeLead.phone}`} className="text-white font-medium hover:text-sky-400">
                  {activeLead.phone || "Not Provided"}
                </a>
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-0.5">Attributed Expo</span>
                <span className="text-white font-bold">{activeLead.expoName}</span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-0.5">Preferred Meeting Date</span>
                <span className="text-slate-200 font-mono">{activeLead.preferredMeetingDate || "Not Specified"}</span>
              </div>

              <div className="sm:col-span-2">
                <span className="text-xs text-slate-400 block mb-0.5">Packaging Requirement</span>
                <span className="text-slate-200 font-semibold">{activeLead.packagingRequirement}</span>
              </div>

              {activeLead.message && (
                <div className="sm:col-span-2">
                  <span className="text-xs text-slate-400 block mb-0.5">Visitor Message</span>
                  <p className="text-slate-300 whitespace-pre-line leading-relaxed">{activeLead.message}</p>
                </div>
              )}
            </div>

            {/* Attribution & UTM Metadata */}
            <div className="rounded-2xl border border-white/5 bg-[#08111F] p-4 text-xs space-y-2">
              <h4 className="font-bold text-slate-300 text-sm">Attribution & Source Metadata</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-400">
                <div>Source Page: <span className="text-slate-200 font-mono">{activeLead.sourcePage}</span></div>
                <div>UTM Source: <span className="text-slate-200">{activeLead.utmSource || "None"}</span></div>
                <div>UTM Medium: <span className="text-slate-200">{activeLead.utmMedium || "None"}</span></div>
                <div>UTM Campaign: <span className="text-slate-200">{activeLead.utmCampaign || "None"}</span></div>
                <div>Submitted At: <span className="text-slate-200">{formatDate(activeLead.submittedAt)}</span></div>
                <div>IP Address: <span className="text-slate-200 font-mono">{activeLead.ipAddress || "N/A"}</span></div>
              </div>
            </div>

            {/* Status & Internal CRM Notes */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Update Lead Status</label>
                  <select
                    value={leadStatusUpdate}
                    onChange={(e) => setLeadStatusUpdate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-2.5 text-xs font-bold text-white outline-none focus:border-sky-500"
                  >
                    {LEAD_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Internal CRM Notes</label>
                <textarea
                  rows="3"
                  value={leadNotesUpdate}
                  onChange={(e) => setLeadNotesUpdate(e.target.value)}
                  placeholder="Add internal followup notes, meeting time slot confirmation, team assignments..."
                  className="w-full rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 text-xs text-white outline-none focus:border-sky-500 leading-relaxed"
                ></textarea>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => handleDeleteLead(activeLead._id)}
                className="text-red-400 hover:text-red-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <FiTrash2 /> Remove Lead Record
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveLead(null)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  type="button"
                  disabled={savingLead}
                  onClick={handleSaveLeadDetails}
                  className="flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-2.5 text-xs font-bold text-white hover:bg-sky-400 transition shadow-[0_0_15px_rgba(56,189,248,0.3)] disabled:opacity-50"
                >
                  <FiSave /> {savingLead ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpoLeads;
