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
		setMessages(prevMessages => [...prevMessages, userMessage])
		setIsLoading(true)
		setError(null)

		try {
			const response = await sendMessage(text)
			if (response.error) {
				setError(response.error)
			} else if (response.reply) {
				const assistantMessage: Message = {
					role: "assistant",
					text: response.reply
				}
				setMessages(prevMessages => [...prevMessages, assistantMessage])
			}
		} catch (e) {
			const message = e instanceof Error ? e.message : "Unexpected error"
			setError(message)
		} finally {
			setIsLoading(false)
		}
	}, [])

	const clearError = useCallback(() => setError(null), [])

	return { messages, isLoading, error, send, clearError }
}
