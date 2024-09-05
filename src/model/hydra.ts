import { z } from "zod"

export const ChartDataSchema = z.object({
  header: z.string().describe("The header of the chart."),
  subheader: z.string().describe("The subheader of the chart."),
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
      color: z
        .string()
        .describe(
          "The hex color code for the data point in hexcode i.e. #2563eb, #60a5fa, #34d399, etc."
        ),
    })
  ),
})

export type ChartData = z.infer<typeof ChartDataSchema>
