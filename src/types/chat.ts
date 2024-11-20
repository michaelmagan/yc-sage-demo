import { ReactElement } from "react"

import { GenerateComponentResponse } from "./generate-component"

export interface ChatMessage {
  sender: "bot" | "user"
  message: string
  progress?: GenerateComponentResponse
  component?: ReactElement
}

export interface ChatState {
  messages: ChatMessage[]
  addMessage: (message: ChatMessage) => void
  clearMessages: () => void
}
