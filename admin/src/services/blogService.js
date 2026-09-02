import axiosInstance from "../config/axios";

export const blogService = {
    getAllBlogs: async () => {
        const response = await axiosInstance.get("/blogs");
        return response.data;
    },

    getBlogById: async (id) => {
        const response = await axiosInstance.get(`/blogs/${id}`);
        return response.data;
    },

    createBlog: async (data) => {
        const response = await axiosInstance.post("/blogs", data);
        return response.data;
    },

    updateBlog: async (id, data) => {
        const response = await axiosInstance.put(`/blogs/${id}`, data);
        return response.data;
    },

    deleteBlog: async (id) => {
        const response = await axiosInstance.delete(`/blogs/${id}`);
        return response.data;
    },
};
