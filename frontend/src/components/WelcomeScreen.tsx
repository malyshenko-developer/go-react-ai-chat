export const WelcomeScreen = () => {
	return (
		<div className="flex flex-col mb-8">
			<div className="text-xl h-12 w-12 bg-[#1E4C9B] flex items-center justify-center rounded-xl mb-8">
				💬
			</div>
			<h2 className="text-3xl text-white font-semibold mb-6">Hi there!</h2>
			<h1 className="text-4xl text-white font-bold mb-4">
				What would you like to know?
			</h1>
			<p className="text-gray-400 text-xl/[2rem] max-w-md">
				Use one of the most common prompts below or ask your own question
			</p>
		</div>
	)
}
