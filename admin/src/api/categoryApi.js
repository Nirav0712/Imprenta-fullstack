import API from "../config/axios";

export const categoryApi = {
  getAll: async () => {
    const { data } = await API.get("/categories");
    return data.categories || [];
  },

  getById: async (id) => {
    const { data } = await API.get(`/categories/${id}`);
    return data;
  },

  create: async (category) => {
    const { data } = await API.post("/categories", category);
    return data;
  },

  update: async (id, category) => {
    const { data } = await API.put(`/categories/${id}`, category);
    return data;
  },

  delete: async (id) => {
    const { data } = await API.delete(`/categories/${id}`);
    return data;
  },
};