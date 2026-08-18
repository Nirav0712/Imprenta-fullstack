import axiosInstance from "../config/axios";

export const settingService = {
    getSettings: async () => {
        const response = await axiosInstance.get("/settings");
        return response.data;
    },
    updateSettings: async (data) => {
        const response = await axiosInstance.put("/settings", data);
        return response.data;
    },
};
