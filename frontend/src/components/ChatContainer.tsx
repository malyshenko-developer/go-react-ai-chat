import { useCallback, useEffect, useRef, useState } from "react"

import { useChat } from "@/hooks/useChat.ts"
import { useVoiceInput } from "@/hooks/useVoiceInput.ts"

import { ErrorMessage } from "@/components/ErrorMessage.tsx"
import { LoadingIndicator } from "@/components/LoadingIndicator.tsx"
import { MessageInput } from "@/components/MessageInput.tsx"
import { MessageList } from "@/components/MessageList.tsx"
import { WelcomeScreen } from "@/components/WelcomeScreen.tsx"

export const ChatContainer = () => {
	const { messages, isLoading, error, send, clearError } = useChat()
	const [inputValue, setInputValue] = useState("")
	const bottomRef = useRef<HTMLDivElement>(null)

	const { listening, handleMicToggle, micAvailable } = useVoiceInput()

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	const onMicToggle = useCallback(() => {
		const finalTranscript = handleMicToggle()
		if (finalTranscript) {
			setInputValue(prev => (prev + " " + finalTranscript).trim())
		}
	}, [handleMicToggle])

	const handleSend = () => {
		if (inputValue.trim() && !isLoading) {
			send(inputValue.trim())
			setInputValue("")
		}
	}

	return (
		<div
			className={
				"text-white w-full max-w-3xl mx-auto px-4 pt-8 pb-24 flex-1 flex flex-col"
			}
		>
			<div
				className={`flex-1 overflow-y-auto flex flex-col ${
					messages.length === 0 ? "justify-center" : ""
				}`}
			>
				{messages.length === 0 && <WelcomeScreen />}
				{messages.length > 0 && (
					<>
						<MessageList messages={messages} />
						{isLoading && <LoadingIndicator />}
					</>
				)}
				{error && <ErrorMessage message={error} onClose={clearError} />}
				<div ref={bottomRef} />
			</div>

			<MessageInput
				value={inputValue}
				onChange={setInputValue}
				onSend={handleSend}
				disabled={isLoading || !micAvailable}
				placeholder="Ask whatever you want"
				listening={listening}
				onMicToggle={onMicToggle}
			/>
		</div>
	)
}
