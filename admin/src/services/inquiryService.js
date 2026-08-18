import axiosInstance from "../config/axios";

export const inquiryService = {
    getInquiries: async () => {
        const response = await axiosInstance.get("/inquiries");
        return response.data;
    },
    updateInquiryStatus: async (id, status) => {
        const response = await axiosInstance.put(`/inquiries/${id}/status`, { status });
        return response.data;
    },
    deleteInquiry: async (id) => {
        const response = await axiosInstance.delete(`/inquiries/${id}`);
        return response.data;
    },
};
