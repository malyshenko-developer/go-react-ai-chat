interface ErrorMessageProps {
	message: string
	onClose: () => void
}

const ErrorMessage = ({ message, onClose }: ErrorMessageProps) => {
	return (
		<div className="bg-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center justify-between mb-4 shadow-red-400 shadow-md">
			<p className="text-sm">{message}</p>
			<button
				onClick={onClose}
				className="text-red-400 hover:text-red-600 ml-3 text-lg leading-none cursor-pointer"
			>
				×
			</button>
		</div>
	)
}

export default ErrorMessage
