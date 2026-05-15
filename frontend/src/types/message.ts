export interface ChatRequest {
    message: string;
}

export interface ChatResponse {
    reply?: string
    error?: string
}

export interface Message {
    role: "user" | "assistant"
    text: string
}