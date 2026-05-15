import type { Message } from "@/types/message.ts"

import { MessageBubble } from "@/components/MessageBubble.tsx"

interface MessageListProps {
	messages: Message[]
}

export const MessageList = ({ messages }: MessageListProps) => {
	return (
		<div className={"space-y-1"}>
			{messages.map((msg, index) => (
				<MessageBubble key={`message ${index}`} message={msg} />
			))}
		</div>
	)
}
