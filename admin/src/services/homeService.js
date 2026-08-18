import axiosInstance from "../config/axios";

export const homeService = {
    getHomePageData: async () => {
        const response = await axiosInstance.get("/homepage");
        return response.data;
    },
    updateHomePageData: async (data) => {
        const response = await axiosInstance.put("/homepage", data);
        return response.data;
    },
};
