import type { Message } from "@/types/message.ts"

interface MessageBubbleProps {
	message: Message
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
	const isUser = message.role === "user"

	return (
		<div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
			<div
				className={`max-w-[80%] px-4 py-2.5 rounded-2xl  ${
					isUser
						? "bg-blue-600 text-white rounded-br-md shadow-white shadow-sm"
						: "bg-gray-200 text-gray-800 rounded-bl-md shadow-blue-600 shadow-lg"
				}`}
			>
				<p className="whitespace-pre-wrap break-words">{message.text}</p>
			</div>
		</div>
	)
}
