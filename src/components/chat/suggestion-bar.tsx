import React, { useEffect } from "react"
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
  setRandomSuggestions: (suggestions: Suggestion[]) => void
  setIsLoading: (isLoading: boolean) => void
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
  setRandomSuggestions: (randomSuggestions) => set({ randomSuggestions }),
  setIsLoading: (isLoading) => set({ isLoading }),
}))

export function SuggestionBar() {
  const { setMessage, inputRef } = useChatInputStore()
  const {
    suggestions,
    randomSuggestions,
    isLoading,
    setRandomSuggestions,
    setIsLoading,
  } = useSuggestionStore()

  useEffect(() => {
    const getRandomSuggestions = () => {
      const shuffled = [...suggestions].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 4)
    }

    setIsLoading(true)
    setRandomSuggestions(getRandomSuggestions())
    setIsLoading(false)
  }, [suggestions, setRandomSuggestions, setIsLoading])

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion)
    if (inputRef.current) {
      inputRef.current.textArea.focus()
    }
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
    <div className="max-w-screen-8xl z-10 mx-auto flex w-full flex-col items-center gap-4 px-2 py-4">
      <div className="flex w-full items-center gap-4 overflow-x-auto">
        {randomSuggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => handleSuggestionClick(suggestion.query)}
          >
            {suggestion.title}
          </Button>
        ))}
      </div>
    </div>
  )
}
