import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiPlus,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiCopy,
  FiExternalLink,
  FiUsers,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";
import { expoService } from "../../services/expoService";

const Expos = () => {
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const loadExpos = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter !== "all") params.status = statusFilter;
      if (searchQuery) params.search = searchQuery;

      const res = await expoService.getExpos(params);
      setExpos(res.expos || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load Expos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpos();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadExpos();
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        await expoService.deleteExpo(id);
        alert("Expo deleted successfully.");
        loadExpos();
      } catch (error) {
        console.error(error);
        alert("Failed to delete Expo.");
      }
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const res = await expoService.duplicateExpo(id);
      alert(res.message || "Expo cloned successfully as Draft!");
      loadExpos();
    } catch (error) {
      console.error(error);
      alert("Failed to duplicate Expo.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Expo Landing Pages</h1>
          <p className="text-slate-400 mt-1 text-sm">
            Manage dynamic event landing pages, configure custom forms, and track expo-specific leads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/expo-leads"
            className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition"
          >
            <FiUsers /> View All Leads
          </Link>

          <Link
            to="/expos/add"
            className="flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white hover:bg-sky-400 transition shadow-[0_0_20px_rgba(56,189,248,0.3)]"
          >
            <FiPlus /> Create New Expo
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#101B2D] p-4">
        {/* Status Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {[
            { id: "all", label: "All Expos" },
            { id: "published", label: "Published" },
            { id: "draft", label: "Drafts" },
            { id: "archived", label: "Archived" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setStatusFilter(item.id)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                statusFilter === item.id
                  ? "bg-sky-500 text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-80">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, city, venue..."
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

      {/* Expos Table */}
      <div className="rounded-2xl border border-white/10 bg-[#101B2D] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#08111F] text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Expo / Event Details</th>
                <th className="px-6 py-4">Date & Venue</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Leads Captured</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400 animate-pulse">
                    Loading Expo pages...
                  </td>
                </tr>
              ) : expos.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                    No Expos found. Click "Create New Expo" to build your first dynamic landing page.
                  </td>
                </tr>
              ) : (
                expos.map((expo) => (
                  <tr key={expo._id} className="hover:bg-white/[0.02] transition">
                    <td className="px-6 py-4">
                      <div>
                        <Link
                          to={`/expos/edit/${expo._id}`}
                          className="font-bold text-white hover:text-sky-400 transition text-base"
                        >
                          {expo.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1 font-mono text-xs text-slate-400">
                          <span>/expo/{expo.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                          <FiCalendar className="text-sky-400" />
                          {expo.eventDate || "Date TBD"}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <FiMapPin />
                          {expo.city ? `${expo.city}, ` : ""}
                          {expo.venue || "Venue TBD"}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          expo.status === "published"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : expo.status === "archived"
                            ? "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {expo.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        to={`/expo-leads?expoId=${expo._id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-sky-500/10 border border-sky-400/20 px-3 py-1.5 text-xs font-bold text-sky-400 hover:bg-sky-500/20 transition"
                      >
                        <FiUsers size={14} />
                        {expo.leadCount || 0} Leads
                      </Link>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Live Page Preview */}
                        {expo.slug && (
                          <a
                            href={`http://localhost:5173/expo/${expo.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-sky-400 transition"
                            title="Preview Public Page"
                          >
                            <FiExternalLink size={16} />
                          </a>
                        )}

                        {/* Duplicate */}
                        <button
                          onClick={() => handleDuplicate(expo._id)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-amber-400 transition"
                          title="Duplicate as Draft"
                        >
                          <FiCopy size={16} />
                        </button>

                        {/* Edit */}
                        <Link
                          to={`/expos/edit/${expo._id}`}
                          className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
                          title="Edit Expo"
                        >
                          <FiEdit size={16} />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(expo._id, expo.name)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition"
                          title="Delete Expo"
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
    </div>
  );
};

export default Expos;
