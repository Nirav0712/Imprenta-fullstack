import API from "../config/axios";

export const productApi = {
  // Get All Products
  getAll: async (params = {}) => {
    const { data } = await API.get("/products", { params });
    return data;
  },

  // Get Single Product
  getById: async (id) => {
    const { data } = await API.get(`/products/${id}`);
    return data;
  },

  // Create Product
  create: async (product) => {
    const { data } = await API.post("/products", product);
    return data;
  },

  // Update Product
  update: async (id, product) => {
    const { data } = await API.put(`/products/${id}`, product);
    return data;
  },

  // Delete Product
  delete: async (id) => {
    const { data } = await API.delete(`/products/${id}`);
    return data;
  },
};