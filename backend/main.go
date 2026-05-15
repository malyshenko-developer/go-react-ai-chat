package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/malyshenko-developer/go-react-ai-chat-backend/config"
	"github.com/malyshenko-developer/go-react-ai-chat-backend/handler"
	"github.com/malyshenko-developer/go-react-ai-chat-backend/middleware"
)

func main() {
	_ = godotenv.Load()

	cfg, err := config.Load()
	if err != nil {
		log.Fatal("config error:", err)
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/api/chat", handler.ChatHandler(cfg))

	wrappedMux := middleware.CORS(cfg.AllowedOrigin)(mux)

	log.Printf("Server starting on port %s", cfg.Port)
	if err := http.ListenAndServe(":"+cfg.Port, wrappedMux); err != nil {
		log.Fatal("server error:", err)
	}
}
