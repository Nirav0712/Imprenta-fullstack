import { uploadApi } from "../api/uploadApi";

export const uploadService = {
  uploadImage(file, slot = null) {
    const formData = new FormData();
    formData.append("image", file);
    if (slot) {
      formData.append("slot", slot);
    }
    return uploadApi.uploadImage(formData);
  },
};