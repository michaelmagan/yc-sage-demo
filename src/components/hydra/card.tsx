import React from "react"
import { HydraCard as HydraCardType } from "@/model/hydra"

import { Badge } from "@/components/ui/badge"
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
  badges,
  content,
  buttons,
  footer,
  className,
}) => {
  return (
    <Card className={`${className} p-2 sm:p-6`}>
      <CardHeader className="space-y-1 sm:space-y-3">
        {title && (
          <CardTitle className="text-base sm:text-xl">{title}</CardTitle>
        )}
        {description && (
          <CardDescription className="text-xs sm:text-base">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-4">
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`text-2xs rounded-full px-1.5 py-0.5 font-semibold sm:px-2 sm:py-1 sm:text-xs ${badge.className}`}
              >
                {badge.text}
              </Badge>
            ))}
          </div>
        )}
        {header && (
          <div className="text-sm font-medium sm:text-lg">{header}</div>
        )}
        <div className="text-xs sm:text-base">{content}</div>
      </CardContent>
      {buttons && buttons.length > 0 && (
        <div className="mt-2 flex flex-col justify-end gap-1 sm:mt-4 sm:flex-row sm:gap-2">
          {buttons.map((button, index) => (
            <HydraButton
              key={index}
              {...button}
              className="w-full text-xs sm:w-auto sm:text-base"
            />
          ))}
        </div>
      )}
      {footer && (
        <CardFooter className="mt-2 text-xs sm:mt-4 sm:text-base">
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}
