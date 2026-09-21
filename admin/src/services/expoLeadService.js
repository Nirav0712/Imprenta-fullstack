import api from "../config/axios";

export const expoLeadService = {
  // Get leads with filters
  getLeads: async (params = {}) => {
    const res = await api.get("/expo-leads", { params });
    return res.data;
  },

  // Get single lead
  getLeadById: async (id) => {
    const res = await api.get(`/expo-leads/${id}`);
    return res.data;
  },

  // Update lead status or notes
  updateLead: async (id, data) => {
    const res = await api.put(`/expo-leads/${id}`, data);
    return res.data;
  },

  // Delete lead
  deleteLead: async (id) => {
    const res = await api.delete(`/expo-leads/${id}`);
    return res.data;
  },

  // Export CSV
  exportCSV: async (params = {}) => {
    const res = await api.get("/expo-leads/export/csv", {
      params,
      responseType: "blob",
    });

    // Create download link
    const blob = new Blob([res.data], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `imprenta-expo-leads-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    return true;
  },
};
