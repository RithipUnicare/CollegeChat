import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// API Base URL
export const API_BASE_URL =
  "http://app.undefineddevelopers.online/collegechatbot";

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("admin_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting token from storage:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error("API Error Response:", error.response.data);
      console.error("Status:", error.response.status);
    } else if (error.request) {
      // Request made but no response
      console.error("No response received:", error.request);
    } else {
      // Error in request setup
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
