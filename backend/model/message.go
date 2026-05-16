package model

type ChatRequest struct {
	Message string `json:"message"`
}

type ChatResponse struct {
	Reply string `json:"reply,omitempty"`
	Error string `json:"error,omitempty"`
}

type Provider struct {
	Sort string `json:"sort,omitempty"`
}

type OpenrouterRequest struct {
	Model    string    `json:"model"`
	Messages []Message `json:"messages"`
	Provider *Provider `json:"provider,omitempty"`
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type OpenrouterResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}
