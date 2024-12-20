"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ChatCompletionMessageParam } from "openai/resources/chat/completions"

import { ChatMessage } from "@/types/chat"
import { useSuggestionStore } from "@/components/chat/suggestion-bar"

interface ChatProps {
  messages: ChatMessage[]
  isLoading: boolean
  resultMessage?: string
}

export function Chat({ messages, isLoading, resultMessage }: ChatProps) {
  const shouldReduceMotion = useReducedMotion()
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const { setRandomSuggestions, setIsLoading } = useSuggestionStore()

  useEffect(() => {
    const showAllMessages = () => {
      setVisibleMessages(messages.length)
    }

    showAllMessages()
  }, [messages.length])

  useEffect(() => {
    const updateSuggestions = async () => {
      if (messages.length > 0) {
        const messageHistory: ChatCompletionMessageParam[] = messages.map(
          (msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.message,
          })
        )
        setIsLoading(true)
        setTimeout(() => {
          setRandomSuggestions()
          setIsLoading(false)
        }, 1000)
      }
    }

    updateSuggestions()
  }, [messages, setRandomSuggestions, setIsLoading])

  const getAnimationProps = (index: number) => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
      }
    }
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    }
  }

  const lastMessageRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isLoading])

  return (
    <div className="mx-auto flex h-full w-full flex-1 flex-col overflow-hidden">
      <div
        ref={chatContainerRef}
        className="flex-1 space-y-4 overflow-y-auto scroll-smooth p-4"
      >
        {messages.map((message, index) => (
          <motion.div
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            {...getAnimationProps(index)}
            className="w-full"
          >
            <div
              className={`flex items-start gap-3 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] ${
                  message.sender === "user" ? "ml-auto" : ""
                }`}
              >
                <motion.div
                  initial={{ scale: shouldReduceMotion ? 1 : 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    inline-block rounded-lg px-4 py-3
                    ${
                      message.sender === "user"
                        ? "float-right bg-primary text-primary-foreground"
                        : "float-left bg-muted"
                    }
                  `}
                >
                  {message.message.split("\n").map((line, i, arr) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </motion.div>
              </div>
            </div>
            {message.component && (
              <div
                className={`mt-2 max-w-[85%] sm:max-w-[75%] ${
                  message.sender === "user" ? "ml-auto" : "ml-10 mr-10"
                }`}
              >
                {message.component}
              </div>
            )}
          </motion.div>
        ))}
        {isLoading && (
          <motion.div
            ref={lastMessageRef}
            {...getAnimationProps(messages.length)}
            className="flex items-start justify-start gap-3"
          >
            <div className="max-w-[85%] sm:max-w-[75%]">
              <motion.div
                initial={{ scale: shouldReduceMotion ? 1 : 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex min-h-[40px] items-center justify-center rounded-lg bg-muted px-4 py-3"
              >
                {resultMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: 0,
                    }}
                    transition={{
                      opacity: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      y: {
                        duration: 0.4,
                      },
                    }}
                    className="text-sm text-muted-foreground"
                  >
                    {resultMessage}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
