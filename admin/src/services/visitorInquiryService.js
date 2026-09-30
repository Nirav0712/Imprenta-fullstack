import axiosInstance from "../config/axios";

export const visitorInquiryService = {
  // Get all visitor inquiries with optional filters
  getVisitorInquiries: async (params = {}) => {
    const res = await axiosInstance.get("/visitor-inquiries", { params });
    return res.data;
  },

  // Get single visitor inquiry by ID
  getVisitorInquiryById: async (id) => {
    const res = await axiosInstance.get(`/visitor-inquiries/${id}`);
    return res.data;
  },

  // Update status or notes
  updateVisitorInquiryStatus: async (id, data) => {
    const res = await axiosInstance.put(`/visitor-inquiries/${id}`, data);
    return res.data;
  },

  // Delete visitor inquiry
  deleteVisitorInquiry: async (id) => {
    const res = await axiosInstance.delete(`/visitor-inquiries/${id}`);
    return res.data;
  },
};
