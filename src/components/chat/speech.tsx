import "regenerator-runtime/runtime"

import React, { useCallback, useEffect, useState } from "react"
import { Mic, MicOff } from "lucide-react"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"

import { Button } from "@/components/ui/button"

import { useChatInputStore } from "./input"

export const SpeechToText: React.FC = () => {
  const [isListening, setIsListening] = useState(false)
  const [microphoneAccess, setMicrophoneAccess] = useState<boolean | null>(null)
  const { setMessage, shouldResetSpeech, setShouldResetSpeech } =
    useChatInputStore()
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition()

  useEffect(() => {
    // Check microphone access on component mount
    checkMicrophoneAccess()
  }, [])

  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening({ continuous: true })
    } else {
      SpeechRecognition.stopListening()
    }
  }, [isListening])

  useEffect(() => {
    setMessage(transcript)
  }, [transcript, setMessage])

  const resetSpeechState = useCallback(() => {
    setIsListening(false)
    SpeechRecognition.stopListening()
    resetTranscript()
    setShouldResetSpeech(false)
  }, [setShouldResetSpeech, resetTranscript])

  useEffect(() => {
    if (shouldResetSpeech) {
      resetSpeechState()
    }
  }, [shouldResetSpeech, resetSpeechState])

  const checkMicrophoneAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      setMicrophoneAccess(true)
    } catch (err) {
      console.error("Error accessing microphone:", err)
      setMicrophoneAccess(false)
    }
  }

  if (!browserSupportsSpeechRecognition) {
    return <div>Browser doesn&apos;t support speech recognition.</div>
  }

  if (microphoneAccess === false) {
    return (
      <div>
        <p>Microphone access is required for this feature.</p>
        <Button onClick={checkMicrophoneAccess}>Grant Microphone Access</Button>
      </div>
    )
  }

  const handleToggleListening = () => {
    setIsListening(!isListening)
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleToggleListening}
        variant={isListening ? "destructive" : "default"}
        size="icon"
        className="rounded-full"
      >
        {isListening ? <MicOff /> : <Mic />}
      </Button>
    </div>
  )
}

export default SpeechToText
