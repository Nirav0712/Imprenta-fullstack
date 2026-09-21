import api from "../config/axios";

export const expoService = {
  // Get all expos with optional filter
  getExpos: async (params = {}) => {
    const res = await api.get("/expos", { params });
    return res.data;
  },

  // Get single expo by ID
  getExpoById: async (id) => {
    const res = await api.get(`/expos/${id}`);
    return res.data;
  },

  // Create new expo
  createExpo: async (data) => {
    const res = await api.post("/expos", data);
    return res.data;
  },

  // Update existing expo
  updateExpo: async (id, data) => {
    const res = await api.put(`/expos/${id}`, data);
    return res.data;
  },

  // Delete expo
  deleteExpo: async (id) => {
    const res = await api.delete(`/expos/${id}`);
    return res.data;
  },

  // Duplicate expo
  duplicateExpo: async (id) => {
    const res = await api.post(`/expos/${id}/duplicate`);
    return res.data;
  },
};
