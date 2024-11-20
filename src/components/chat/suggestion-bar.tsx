import React, { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { create } from "zustand"

import { Button } from "@/components/ui/button"
import { useChatInputStore } from "@/components/chat/input"

interface Suggestion {
  title: string
  query: string
}

interface SuggestionStore {
  suggestions: Suggestion[]
  randomSuggestions: Suggestion[]
  isLoading: boolean
  setRandomSuggestions: () => void
  setIsLoading: (isLoading: boolean) => void
}

const getRandomSuggestions = () => {
  const suggestions = [
    {
      title: "Find AI startups",
      query: "Show me YC companies working on artificial intelligence.",
    },
    {
      title: "Discover fintech",
      query: "List YC startups in the financial technology sector.",
    },
    {
      title: "Companies per batch",
      query: "Show the count of companies per batch.",
    },
    {
      title: "Average number of founders per type",
      query: "Show the average number of founders per type",
    },
  ]
  return suggestions.sort(() => 0.5 - Math.random()).slice(0, 4)
}

export const useSuggestionStore = create<SuggestionStore>((set) => ({
  suggestions: [
    {
      title: "Find AI startups",
      query: "Show me YC companies working on artificial intelligence.",
    },
    {
      title: "Discover fintech",
      query: "List YC startups in the financial technology sector.",
    },
    {
      title: "Companies per batch",
      query: "Show the count of companies per batch.",
    },
    {
      title: "Average number of founders per type",
      query: "Show the average number of founders per type",
    },
  ],
  randomSuggestions: [],
  isLoading: true,
  setRandomSuggestions: () =>
    set({ randomSuggestions: getRandomSuggestions() }),
  setIsLoading: (isLoading) => set({ isLoading }),
}))

export function SuggestionBar() {
  const { setMessage, inputRef } = useChatInputStore()
  const { randomSuggestions, isLoading, setRandomSuggestions, setIsLoading } =
    useSuggestionStore()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setRandomSuggestions()
    setIsLoading(false)
  }, [setRandomSuggestions, setIsLoading])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion)
    if (inputRef.current) {
      inputRef.current.textArea.focus()
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  if (isLoading) {
    return (
      <div className="max-w-screen-8xl z-10 mx-auto flex w-full flex-col items-start gap-4 px-2 py-4">
        <Button variant="outline" className="animate-pulse">
          Generating suggested actions...
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-screen-8xl z-10 mx-auto flex w-full flex-col items-center gap-2 px-2 py-2">
      <div
        onClick={toggleVisibility}
        className="flex w-full cursor-pointer items-center justify-end text-xs text-gray-400 md:hidden"
      >
        <span>{isVisible ? "Hide" : "Show"}</span>
        {isVisible ? (
          <ChevronUp className="ml-1 h-3 w-3" />
        ) : (
          <ChevronDown className="ml-1 h-3 w-3" />
        )}
      </div>
      {isVisible && (
        <div className="flex w-full items-center gap-2 overflow-x-auto">
          {randomSuggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleSuggestionClick(suggestion.query)}
            >
              {suggestion.title}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
