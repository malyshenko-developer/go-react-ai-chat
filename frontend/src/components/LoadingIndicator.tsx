export const LoadingIndicator = () => {
	return (
		<div className="flex items-center gap-2 text-gray-300 p-3">
			<span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
			<span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.15s]" />
			<span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.3s]" />
		</div>
	)
}
