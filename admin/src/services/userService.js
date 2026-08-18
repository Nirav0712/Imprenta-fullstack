import axiosInstance from "../config/axios";

export const userService = {
    getUsers: async () => {
        const response = await axiosInstance.get("/auth/users");
        return response.data;
    },
    updateUserRole: async (id, data) => {
        const response = await axiosInstance.put(`/auth/users/${id}`, data);
        return response.data;
    },
    deleteUser: async (id) => {
        const response = await axiosInstance.delete(`/auth/users/${id}`);
        return response.data;
    },
};
