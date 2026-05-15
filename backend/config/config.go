package config

import (
	"fmt"
	"os"
)

const (
	EnvPort          = "PORT"
	EnvAPIKey        = "API_KEY"
	EnvAPIURL        = "API_URL"
	EnvAllowedOrigin = "ALLOWED_ORIGIN"
)

const (
	DefaultPort          = "8080"
	DefaultAPIURL        = "https://openrouter.ai/api/v1/chat/completions"
	DefaultAllowedOrigin = "http://localhost:5173"
)

type Config struct {
	Port          string
	APIKey        string
	APIURL        string
	AllowedOrigin string
}

func Load() (*Config, error) {
	cfg := &Config{
		Port:          getEnv(EnvPort, DefaultPort),
		APIURL:        getEnv(EnvAPIURL, DefaultAPIURL),
		AllowedOrigin: getEnv(EnvAllowedOrigin, DefaultAllowedOrigin),
	}

	cfg.APIKey = os.Getenv(EnvAPIKey)
	if cfg.APIKey == "" {
		return nil, fmt.Errorf("environment variable %s must be set", EnvAPIKey)
	}

	return cfg, nil
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
