import axiosInstance from "../config/axios";

export const heroSlideService = {
    getHeroSlides: async () => {
        const response = await axiosInstance.get("/hero-slides");
        return response.data;
    },
    createHeroSlide: async (data) => {
        const response = await axiosInstance.post("/hero-slides", data);
        return response.data;
    },
    updateHeroSlide: async (id, data) => {
        const response = await axiosInstance.put(`/hero-slides/${id}`, data);
        return response.data;
    },
    deleteHeroSlide: async (id) => {
        const response = await axiosInstance.delete(`/hero-slides/${id}`);
        return response.data;
    }
};
