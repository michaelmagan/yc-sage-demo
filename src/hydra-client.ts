import { generateFakeChartData } from "@/data.service"
import { ChartDataSchema } from "@/model/hydra"
import { HydraClient } from "hydra-ai"
import { zodToJsonSchema } from "zod-to-json-schema"

import Chart from "@/components/hydra/chart"

export const getHydraClient = (): HydraClient => {
  const hydra = new HydraClient()
  return hydra
}

const getFakeDataTool = {
  getComponentContext: (
    numPoints: number,
    dataKeys: string[],
    groupBy: "month" | "week" | "day"
  ) => generateFakeChartData(numPoints, dataKeys, groupBy),
  definition: {
    name: "getFakeData",
    description: "Generate fake time series data based on the given query.",
    parameters: [
      {
        name: "numPoints",
        type: "number",
        description: "The number of data points to generate.",
        isRequired: true,
      },
      {
        name: "dataKeys",
        type: "array",
        description:
          "The keys for the data points (e.g., 'desktop', 'mobile').",
        isRequired: true,
        items: {
          type: "string",
        },
      },
      {
        name: "groupBy",
        type: "string",
        description:
          "The time grouping for the data (e.g., 'month', 'week', 'day').",
        isRequired: true,
        enum: ["month", "week", "day"],
      },
    ],
  },
}

export const registerHydraComponents = async (hydra: HydraClient) => {
  await Promise.all([
    hydra.registerComponent(
      "Chart",
      "A component for displaying any kind of data.",
      Chart,
      JSON.stringify(zodToJsonSchema(ChartDataSchema)),
      [getFakeDataTool]
    ),
  ])
}
