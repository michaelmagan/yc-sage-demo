import { z } from "zod"

export const ChartDataSchema = z.object({
  header: z.string(),
  subheader: z.string(),
  data: z.array(
    z
      .object({
        label: z.string(),
      })
      .and(z.record(z.string(), z.number()))
  ),
  config: z.record(
    z.string(),
    z.object({
      label: z.string(),
      color: z.string(),
    })
  ),
})

export type ChartData = z.infer<typeof ChartDataSchema>
