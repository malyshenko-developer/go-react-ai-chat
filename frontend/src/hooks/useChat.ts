import { useCallback, useState } from "react"

import type { Message } from "@/types/message.ts"

import { sendMessage } from "@/api/sendMessage.ts"

export const useChat = () => {
	const [messages, setMessages] = useState<Message[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const send = useCallback(async (text: string) => {
		if (!text.trim()) return

		const userMessage: Message = { role: "user", text }
		setMessages(prev => [...prev, userMessage])
		setIsLoading(true)
		setError(null)

		try {
			const response = await sendMessage(text)
			if (response.error) {
				setError(formatErrorMessage(response.error))
			} else if (response.reply) {
				const assistantMessage: Message = {
					role: "assistant",
					text: response.reply
				}
				setMessages(prev => [...prev, assistantMessage])
			}
		} catch (e) {
			const rawMessage = e instanceof Error ? e.message : "Unexpected error"
			setError(formatErrorMessage(rawMessage))
		} finally {
			setIsLoading(false)
		}
	}, [])

	const clearError = useCallback(() => setError(null), [])

	return { messages, isLoading, error, send, clearError }
}

function formatErrorMessage(rawError: string): string {
	const jsonStart = rawError.indexOf("{")
	if (jsonStart !== -1) {
		try {
			const jsonStr = rawError.slice(jsonStart)
			const parsed = JSON.parse(jsonStr)

			if (parsed?.error?.code === 429) {
				return "Too many requests. Please wait a moment and try again."
			}
			if (parsed?.error?.message) {
				return parsed.error.message
			}
			if (parsed?.message) {
				return parsed.message
			}
		} catch {}
	}
	return rawError
}
