// API DTO Types based on OpenAPI schema

export interface ChatRequestDTO {
  message: string;
}

export interface ChatResponseDTO {
  reply: string;
  source: string;
}

export interface AdminLoginDTO {
  username: string;
  password: string;
}

export interface KnowledgeDTO {
  title: string;
  description: string;
}

export interface CategoryDTO {
  id: number;
  name: string;
}

// Additional UI Types
export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  source?: string;
  timestamp: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}
