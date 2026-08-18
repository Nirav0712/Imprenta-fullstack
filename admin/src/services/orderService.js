import axiosInstance from "../config/axios";

export const orderService = {
    getOrders: async () => {
        const response = await axiosInstance.get("/orders");
        return response.data;
    },
    getOrderById: async (id) => {
        const response = await axiosInstance.get(`/orders/${id}`);
        return response.data;
    },
    updateOrderStatus: async (id, status) => {
        const response = await axiosInstance.put(`/orders/${id}/status`, { status });
        return response.data;
    },
};
