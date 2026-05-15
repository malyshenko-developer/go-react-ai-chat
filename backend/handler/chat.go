package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/malyshenko-developer/go-react-ai-chat-backend/config"
	"github.com/malyshenko-developer/go-react-ai-chat-backend/model"
	"github.com/malyshenko-developer/go-react-ai-chat-backend/service"
)

const maxMessageLength = 4000

func ChatHandler(cfg *config.Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			writeError(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var req model.ChatRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeError(w, "Invalid request body", http.StatusBadRequest)
			return
		}
		defer r.Body.Close()

		if req.Message == "" {
			writeError(w, "Message is empty", http.StatusBadRequest)
		}
		if len(req.Message) > maxMessageLength {
			writeError(w, "Message is too long", http.StatusBadRequest)
		}

		reply, err := service.SendMessage(cfg, req.Message)
		if err != nil {
			log.Printf("Service error: %v", err)
			writeError(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		writeJSON(w, http.StatusOK, model.ChatResponse{Reply: reply})
	}
}

func writeError(w http.ResponseWriter, msg string, code int) {
	writeJSON(w, code, model.ChatResponse{Error: msg})
}

func writeJSON(w http.ResponseWriter, code int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(v)
}
