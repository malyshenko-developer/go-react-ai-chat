package main

import (
	"log"

	"github.com/malyshenko-developer/go-react-ai-chat-backend/config"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatal("config error:", err)
	}

	_ = cfg
	log.Println("Configuration loaded, port:", cfg.Port)
}
