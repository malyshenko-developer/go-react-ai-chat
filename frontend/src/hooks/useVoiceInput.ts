import { useCallback } from "react"
import SpeechRecognition, {
	useSpeechRecognition as useBaseSpeechRecognition
} from "react-speech-recognition"

export function useVoiceInput() {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
		isMicrophoneAvailable
	} = useBaseSpeechRecognition()

	const startListening = useCallback(() => {
		resetTranscript()
		SpeechRecognition.startListening({
			language: "ru-RU",
			continuous: true
		})
	}, [resetTranscript])

	const stopListening = useCallback(() => {
		SpeechRecognition.stopListening()
	}, [])

	const handleMicToggle = useCallback(() => {
		if (listening) {
			stopListening()
			return transcript
		} else {
			startListening()
			return null
		}
	}, [listening, startListening, stopListening, transcript])

	const micAvailable = browserSupportsSpeechRecognition && isMicrophoneAvailable

	return {
		listening,
		handleMicToggle,
		micAvailable
	}
}
