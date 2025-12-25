import apiClient from "./api.config";
import { ChatRequestDTO, ChatResponseDTO } from "../types/types";

export const chatService = {
  /**
   * Send a chat message to the bot
   * POST /api/chat/query
   */
  processChat: async (message: string): Promise<ChatResponseDTO> => {
    try {
      const requestData: ChatRequestDTO = { message };
      const response = await apiClient.post<ChatResponseDTO>(
        "/api/chat/query",
        requestData
      );
      return response.data;
    } catch (error) {
      console.error("Chat service error:", error);
      throw error;
    }
  },
};
