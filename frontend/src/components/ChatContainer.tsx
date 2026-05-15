import { useState } from "react"

import { useChat } from "@/hooks/useChat.ts"

import ErrorMessage from "@/components/ErrorMessage.tsx"
import { LoadingIndicator } from "@/components/LoadingIndicator.tsx"
import { MessageList } from "@/components/MessageList.tsx"
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

			{messages.length > 0 && <MessageList messages={messages} />}

			{isLoading && <LoadingIndicator />}
			<LoadingIndicator />

			{error && <ErrorMessage message={error} onClose={clearError} />}
			<ErrorMessage message={"Ошибка =("} onClose={clearError} />
		</div>
	)
}
