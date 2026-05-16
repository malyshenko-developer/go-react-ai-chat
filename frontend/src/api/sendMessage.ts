import type { ChatRequest, ChatResponse } from "@/types/message.ts"

const API_BASE = import.meta.env.PROD
	? import.meta.env.VITE_API_BASE_URL || "/api"
	: "/api"

export async function sendMessage(message: string): Promise<ChatResponse> {
	const body: ChatRequest = { message }

	const response = await fetch(`${API_BASE}/chat`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	})

	if (!response.ok) {
		let errorText = `Server error (${response.status})`
		try {
			const data = (await response.json()) as ChatResponse
			if (data.error) errorText = data.error
		} catch (_) {}
		throw new Error(errorText)
	}

	return await response.json()
}
