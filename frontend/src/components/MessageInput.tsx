import type { KeyboardEvent } from "react"

import { Icon } from "@/assets/icons/Icon.ts"

interface MessageInputProps {
	value: string
	onChange: (value: string) => void
	onSend: () => void
	disabled?: boolean
	placeholder?: string
}

export const MessageInput = ({
	value,
	onChange,
	onSend,
	disabled,
	placeholder = "Ask whatever you want"
}: MessageInputProps) => {
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault()
			onSend()
		}
	}

	return (
		<div className="fixed bottom-0 left-1/2 -translate-1/2 w-full max-w-3xl bg-[#072E6A]">
			<button
				type="button"
				disabled={disabled}
				className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2356A8] hover:text-blue-500 disabled:opacity-50 cursor-pointer"
				onClick={() => alert("Voice input coming soon")}
			>
				<Icon.Microphone width={22} height={22} />
			</button>

			<input
				type="text"
				value={value}
				onChange={e => onChange(e.target.value)}
				onKeyDown={handleKeyDown}
				disabled={disabled}
				placeholder={placeholder}
				className="w-full rounded-2xl border-2 border-[#2356A8] px-5 py-4 pl-12 pr-16 text-white placeholder-gray-400 shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-700"
			/>

			<button
				type="button"
				disabled={disabled || !value.trim()}
				onClick={onSend}
				className="absolute inset-y-0.5 right-0.5 rounded-[14px] w-[56px] h-[56px] bg-[#1D4C9B] text-white hover:bg-blue-600 disabled:cursor-not-allowed shadow-md transition flex items-center justify-center"
			>
				<Icon.ArrowRight width={36} height={36} />
			</button>
		</div>
	)
}
