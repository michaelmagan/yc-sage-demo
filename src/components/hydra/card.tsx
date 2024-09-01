import React from "react"
import { HydraCard as HydraCardType } from "@/model/hydra"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { HydraButton } from "./button"

type HydraCardProps = HydraCardType

export const HydraCard: React.FC<HydraCardProps> = ({
  title,
  description,
  header,
  content,
  buttons,
  footer,
  className,
}) => {
  console.log("HydraCard buttons:", buttons)
  return (
    <Card className={className}>
      {(title || description || header) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {header && <div>{header}</div>}
        </CardHeader>
      )}
      <CardContent>
        <div>{content}</div>
      </CardContent>
      {buttons && buttons.length > 0 && (
        <div className="flex flex-wrap justify-end gap-2 p-4">
          {buttons.map((button, index) => (
            <HydraButton key={index} {...button} className="w-full sm:w-auto" />
          ))}
        </div>
      )}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
