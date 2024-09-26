import { z } from "zod"

import { BadgeProps } from "@/components/ui/badge"

export const HydraButtonSchema = z.object({
  text: z.string(),
  variant: z
    .enum(["default", "destructive", "outline", "secondary", "ghost", "link"])
    .optional(),
  size: z.enum(["default", "sm", "lg", "icon"]).optional(),
  href: z.string(),
  className: z.string().optional(),
})

export const HydraBadgeSchema = z.object({
  text: z.string(),
  variant: z
    .enum(["default", "secondary", "destructive", "outline"])
    .optional(),
  className: z.string().optional(),
})

export const HydraCardSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  header: z.string().optional(),
  badges: z.array(HydraBadgeSchema),
  content: z.string(),
  buttons: z.array(HydraButtonSchema),
  footer: z.string().optional(),
  className: z.string().optional(),
})

export const HydraCarouselSchema = z.object({
  cards: z.array(HydraCardSchema),
  className: z.string().optional(),
})

export const HydraTextInputSchema = z.object({
  type: z.literal("input"),
  id: z.string(),
  label: z.string(),
  text: z.string(),
  inputType: z.enum(["text", "password", "email", "number"]),
  className: z.string().optional(),
})

export const HydraTextareaSchema = z.object({
  type: z.literal("textarea"),
  id: z.string(),
  label: z.string(),
  text: z.string(),
  rows: z.number().optional(),
  className: z.string().optional(),
})
export const HydraShareSchema = z.object({
  actionLabel: z.string(),
  urlTemplate: z
    .string()
    .describe(
      "URL template with placeholders for field values that match the input ids"
    ),
  encodeValues: z.boolean().default(true),
})

export const HydraTextSchema = z.object({
  title: z.string().optional(),
  fields: z.array(z.union([HydraTextInputSchema, HydraTextareaSchema])),
  className: z.string().optional(),
  share: z.array(HydraShareSchema).optional(),
})

export const HydraChartSchema = z.object({
  type: z
    .enum(["line", "bar"])
    .describe("The type of chart to display. Example: 'line'"),
  select: z
    .array(z.string())
    .describe(
      "Array of columns to select from the database. Example: ['batch', 'COUNT(*) as count']"
    ),
  groupBy: z
    .array(
      z.enum([
        "batch",
        "type",
        "founded",
        "location",
        "team_size",
        "founder_count",
      ])
    )
    .describe("Array of columns to group by. Example: ['batch']"),
  where: z
    .record(z.union([z.string(), z.number(), z.boolean()]))
    .optional()
    .describe(
      "Object specifying conditions for filtering data. Example: { type: 'B2B', founded: 2020 }"
    ),
  orderBy: z
    .record(z.enum(["ASC", "DESC"]))
    .optional()
    .describe(
      "Object specifying the order of results. Example: { batch: 'ASC' }"
    ),
  limit: z
    .number()
    .optional()
    .describe("Number of results to return. Example: 10"),
  dataKey: z
    .string()
    .describe(
      "The key in the data object to use for the y-axis values. Example: 'count'"
    ),
  nameKey: z
    .string()
    .optional()
    .describe(
      "The key in the data object to use for x-axis labels. Example: 'batch'"
    ),
  colors: z
    .array(z.string())
    .optional()
    .describe(
      "Array of colors to use for the chart. Example: ['#8884d8', '#82ca9d']"
    ),
})

export type HydraChart = z.infer<typeof HydraChartSchema>
export type HydraTextInput = z.infer<typeof HydraTextInputSchema>
export type HydraTextarea = z.infer<typeof HydraTextareaSchema>
export type HydraTextSchemaProps = z.infer<typeof HydraTextSchema>
export type HydraCard = z.infer<typeof HydraCardSchema>
export type HydraButton = z.infer<typeof HydraButtonSchema>
export type HydraBadge = z.infer<typeof HydraBadgeSchema>
export type HydraCarousel = z.infer<typeof HydraCarouselSchema>
export type HydraShareSchema = z.infer<typeof HydraShareSchema>
