import apiClient from "./api.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AdminLoginDTO } from "../types/types";

export const adminService = {
  /**
   * Admin login
   * POST /api/admin/login
   * Returns token as string
   */
  login: async (username: string, password: string): Promise<string> => {
    try {
      const requestData: AdminLoginDTO = { username, password };
      const response = await apiClient.post<string>(
        "/api/admin/login",
        requestData
      );

      // Store token in AsyncStorage
      if (response.data) {
        await AsyncStorage.setItem("admin_token", response.data);
      }

      return response.data;
    } catch (error) {
      console.error("Admin login error:", error);
      throw error;
    }
  },

  /**
   * Admin logout - clear stored token
   */
  logout: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("admin_token");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  /**
   * Check if admin is authenticated
   */
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem("admin_token");
      return !!token;
    } catch (error) {
      console.error("Auth check error:", error);
      return false;
    }
  },
};
