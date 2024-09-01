import { z } from "zod"

export const HydraButtonSchema = z.object({
  text: z.string(),
  variant: z
    .enum(["default", "destructive", "outline", "secondary", "ghost", "link"])
    .optional(),
  size: z.enum(["default", "sm", "lg", "icon"]).optional(),
  href: z.string(),
  className: z.string().optional(),
})

export const HydraCardSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  header: z.string().optional(),
  content: z.string(),
  buttons: z.array(HydraButtonSchema),
  footer: z.string().optional(),
  className: z.string().optional(),
})

export const HydraCarouselSchema = z.object({
  cards: z.array(HydraCardSchema),
  className: z.string().optional(),
})

export type HydraCard = z.infer<typeof HydraCardSchema>
export type HydraButton = z.infer<typeof HydraButtonSchema>
export type HydraCarousel = z.infer<typeof HydraCarouselSchema>
