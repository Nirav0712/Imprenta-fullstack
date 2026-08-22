import { productApi } from "../api/productApi";

export const productService = {

  getProducts(params = {}) {
    return productApi.getAll(params);
  },

  getProduct(id) {
    return productApi.getById(id);
  },

  createProduct(data) {
    return productApi.create(data);
  },

  updateProduct(id, data) {
    return productApi.update(id, data);
  },

  deleteProduct(id) {
    return productApi.delete(id);
  },

};