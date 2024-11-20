"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { getHydraClient, registerHydraComponents } from "@/hydra-client"
import { create } from "zustand"

import { ChatState } from "@/types/chat"
import { GenerateComponentResponse } from "@/types/generate-component"
import { JoinDiscordModal, TweetAboutUsModal } from "@/components/modals"

import { ScrollArea } from "../ui/scroll-area"
import { Chat } from "./chat"
import { ChatInput } from "./input"
import { SuggestionBar } from "./suggestion-bar"

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}))

export default function ChatBox() {
  const { messages, addMessage } = useChatStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isHydraReady, setIsHydraReady] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [profile, setProfile] = useState<Record<string, string>>({})
  const [showDiscordModal, setShowDiscordModal] = useState(false)
  const [showTweetModal, setShowTweetModal] = useState(false)
  const [resultText, setResultText] = useState<string | undefined>()

  const hydra = useMemo(() => getHydraClient(), [])

  useEffect(() => {
    if (!isHydraReady && !isRegistering) {
      setIsRegistering(true)
      registerHydraComponents(hydra).then(() => {
        setIsHydraReady(true)
        setIsRegistering(false)
      })
    }
  }, [hydra, isHydraReady, isRegistering])

  useEffect(() => {
    // Load profile data from localStorage
    const storedProfile = localStorage.getItem("userProfile")
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile))
    }
  }, [])

  useEffect(() => {
    const userMessageCount = messages.filter(
      (msg) => msg.sender === "user"
    ).length
    if (userMessageCount === 3) {
      setShowDiscordModal(true)
    } else if (userMessageCount === 6) {
      setShowTweetModal(true)
    }
  }, [messages])

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      addMessage({
        sender: "user",
        message: message.trim(),
      })
    }

    const profileInfo = Object.entries(profile)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")
    const enhancedMessage = `User Profile:\n${profileInfo}\n\nUser Message: ${message.trim()}`

    fetchResponse(enhancedMessage)
  }

  const handleProgressUpdate = (progress: GenerateComponentResponse) => {
    if (progress.message) {
      setResultText(progress.message)
    }
  }

  const fetchResponse = async (message: string) => {
    setIsLoading(true)
    try {
      const response = await hydra.generateComponent(
        message,
        handleProgressUpdate
      )
      console.log("Hydra client result:", response) // Added console log
      if (
        typeof response === "object" &&
        response.component &&
        response.message
      ) {
        addMessage({
          sender: "bot",
          message: response.message,
          component: response.component,
        })
      } else if (typeof response === "object" && response.message) {
        addMessage({
          sender: "bot",
          message: response.message,
        })
      } else if (typeof response === "string") {
        addMessage({
          sender: "bot",
          message: response,
        })
      } else {
        console.error("Unexpected response type:", response)
        addMessage({
          sender: "bot",
          message: "Sorry, I received an unexpected response type.",
        })
      }
    } catch (error) {
      console.error("Error fetching response:", error)
      addMessage({
        sender: "bot",
        message: "Sorry, I encountered an error while processing your request.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ScrollArea className="mt-[6rem] h-[calc(100vh-4rem)] w-full">
          <Chat
            messages={messages}
            isLoading={isLoading}
            resultMessage={resultText}
          />
        </ScrollArea>
      </Suspense>
      <SuggestionBar />
      <ChatInput onSendMessage={handleSendMessage} />
      {showDiscordModal && <JoinDiscordModal />}
      {showTweetModal && <TweetAboutUsModal />}
    </>
  )
}
