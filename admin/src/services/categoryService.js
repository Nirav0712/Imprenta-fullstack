import { categoryApi } from "../api/categoryApi";

export const categoryService = {
  getCategories() {
    return categoryApi.getAll();
  },

  getCategory(id) {
    return categoryApi.getById(id);
  },

  createCategory(data) {
    return categoryApi.create(data);
  },

  updateCategory(id, data) {
    return categoryApi.update(id, data);
  },

  deleteCategory(id) {
    return categoryApi.delete(id);
  },

  reorderCategory(categoryId, newOrder) {
    return categoryApi.reorder(categoryId, newOrder);
  },
};