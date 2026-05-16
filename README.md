# go-react-ai-chat

AI chat application with voice input support.

## Stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Go
- AI: OpenRouter (free models)
- Voice Input Web Speech API (react-speech-recognition)

### Key Frontend Dependencies
- `react-speech-recognition` – speech recognition
- `vite-plugin-svgr` – import SVG as React components
- `prettier` + `@trivago/prettier-plugin-sort-imports` – code formatting and import sorting

### Backend Dependencies (Go)
- `github.com/joho/godotenv` – load `.env` in development
- Standard library: `net/http`, `encoding/json`, `log`, `os`, `context`, `time`, `bytes`, `io`, `fmt`

## Local Development
### 1. Clone the repository
```bash
git clone https://github.com/your-username/go-react-ai-chat.git
cd go-react-ai-chat
```
### 2. Backend (Go)
```bash
cd backend
cp .env.example .env    # fill in API_KEY and other variables
go mod tidy
go run .
```
### 3. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
The app will open at http://localhost:5173.
API proxy is configured in vite.config.ts, requests go to localhost:8080.

## Environment Variables (backend)
| Variable         | Description                | Default                                                  |
|------------------|----------------------------|----------------------------------------------------------|
| `PORT`           | Server port                | `8080`                                                   |
| `API_KEY`        | OpenRouter API key         | **required**                                             |
| `API_URL`        | Chat Completions API URL   | `https://openrouter.ai/api/v1/chat/completions`          |
| `MODEL`          | Model name                 | `meta-llama/llama-3.3-70b-instruct:nitro`                |
| `ALLOWED_ORIGIN` | Allowed CORS origin        | `http://localhost:5173`                                  |

## API Endpoints

### `POST /api/chat`

Send a message and get an AI reply.

**Request**
```json
{
  "message": "Hello, how are you?"
}
```

**Response (success)**
```json
{
  "reply": "Hi! I'm doing great, thank you!"
}
```

**Response (error)**
```json
{
  "error": "Too many requests. Please wait a moment and try again."
}
```