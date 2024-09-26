"use server"

import OpenAI from "openai"
import { zodResponseFormat } from "openai/helpers/zod"
import { ChatCompletionMessageParam } from "openai/resources/chat/completions"
import { z } from "zod"

const openai = new OpenAI()

const SuggestionSchema = z.object({
  title: z.string(),
  query: z.string(),
})

const SuggestionsSchema = z.object({
  suggestions: z.array(SuggestionSchema),
})

export const getSuggestions = async (
  messageHistory: ChatCompletionMessageParam[]
): Promise<z.infer<typeof SuggestionsSchema>["suggestions"]> => {
  const prompt = `
  Suggest 2-3 interesting queries about YC companies, each with a title and detailed query.

  If its a graph suggest other ways they could filter or groupby based on batch, founder_count, type.

  If it's showing a list of yc comapnies suggest emailing or tweeting about one of the companies.

  Keep the title 2-3 words.
  Keep the query 4-5 words.

  Example suggestions:
  {
    title: "Yearly Startup Trends",
    query: "Chart YC companies founded per year"
  },
  {
    title: "Batch Comparison",
    query: "Compare YC batch sizes over time"
  },
  {
    title: "Founders by Batch",
    query: "Count of founders by batch size"
  },
  {
    title: "AI Startups",
    query: "Show AI startups in YC portfolio"
  },
  {
    title: "Space Ventures",
    query: "List YC companies in space technology"
  },
  {
    title: "Founder Email",
    query: "Draft email to YC founder"
  },
  {
    title: "YC Tweet",
    query: "Generate tweet about YC startup"
  }

  Make sure the suggestions are relevant to the latest message.

  `

  const messages: ChatCompletionMessageParam[] = [
    ...messageHistory,
    { role: "system", content: prompt },
  ]

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini-2024-07-18",
    messages,
    temperature: 0.3,
    max_tokens: 300,
    response_format: zodResponseFormat(SuggestionsSchema, "suggestions"),
  })

  return completion.choices[0].message.parsed?.suggestions ?? []
}
