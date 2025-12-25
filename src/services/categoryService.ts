import apiClient from "./api.config";
import { CategoryDTO } from "../types/types";

export const categoryService = {
  /**
   * Get all categories
   * GET /api/categories
   */
  getAllCategories: async (): Promise<CategoryDTO[]> => {
    try {
      const response = await apiClient.get<CategoryDTO[]>("/api/categories");
      return response.data;
    } catch (error) {
      console.error("Category service error:", error);
      throw error;
    }
  },
};
