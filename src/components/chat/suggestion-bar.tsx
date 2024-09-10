import React, { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { useChatInputStore } from "@/components/chat/input"

interface Suggestion {
  title: string
  query: string
}

export function SuggestionBar() {
  const { setMessage, inputRef } = useChatInputStore()
  const [randomSuggestions, setRandomSuggestions] = useState<Suggestion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // Suggestions for getting YC companies based on semantic data
  const allSuggestions: Suggestion[] = [
    {
      title: "AI in Scientific Research",
      query:
        "Find research papers on the applications of artificial intelligence in scientific studies.",
    },
    {
      title: "Financial Technology Innovations",
      query:
        "List research papers exploring innovations in financial technology and their impact on the economy.",
    },
    {
      title: "Innovations in Healthcare Research",
      query:
        "What research exists on recent innovations and breakthroughs in healthcare?",
    },
    {
      title: "Climate Change Studies",
      query:
        "Identify research papers focused on the effects of climate change and potential solutions.",
    },
    {
      title: "Advancements in Renewable Energy",
      query:
        "Find research on advancements in renewable energy technologies and their implications.",
    },
  ]

  useEffect(() => {
    const getRandomSuggestions = () => {
      const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 4)
    }

    setIsLoading(true)
    setRandomSuggestions(getRandomSuggestions())
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
