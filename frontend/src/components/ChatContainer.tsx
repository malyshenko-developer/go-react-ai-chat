import { useState } from "react"

import { useChat } from "@/hooks/useChat.ts"

import { WelcomeScreen } from "@/components/WelcomeScreen.tsx"

export const ChatContainer = () => {
	const { messages, isLoading, error, send, clearError } = useChat()
	const [inputValue, setInputValue] = useState("")

	const handleSend = () => {
		if (inputValue.trim() && !isLoading) {
			send(inputValue.trim())
			setInputValue("")
		}
	}

	return (
		<div className={"text-white w-full max-w-3xl mx-auto px-4 py-8"}>
			{messages.length === 0 && <WelcomeScreen />}

			{messages.length > 0 && (
				<div className="text-white">Messages will be here</div>
			)}

			{isLoading && <div className="text-white">Loading...</div>}

			{error && (
				<div className="bg-red-100 text-red-700 p-2 rounded mb-2">{error}</div>
			)}
		</div>
	)
}
