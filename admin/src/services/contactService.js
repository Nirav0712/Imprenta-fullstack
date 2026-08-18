import axiosInstance from "../config/axios";

export const contactService = {
    getContacts: async () => {
        const response = await axiosInstance.get("/contact");
        return response.data;
    },
    updateContactStatus: async (id, status) => {
        const response = await axiosInstance.put(`/contact/${id}/status`, { status });
        return response.data;
    },
    deleteContact: async (id) => {
        const response = await axiosInstance.delete(`/contact/${id}`);
        return response.data;
    },
};
