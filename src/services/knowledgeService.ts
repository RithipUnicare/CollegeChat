import apiClient from "./api.config";
import { KnowledgeDTO } from "../types/types";

export const knowledgeService = {
  /**
   * Search knowledge base
   * GET /api/knowledge/search?question={question}
   */
  searchKnowledge: async (question: string): Promise<KnowledgeDTO> => {
    try {
      const response = await apiClient.get<KnowledgeDTO>(
        "/api/knowledge/search",
        {
          params: { question },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Knowledge search error:", error);
      throw error;
    }
  },
};
