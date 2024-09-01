import { HydraCarouselSchema } from "@/model/hydra"
import { queryPineconeForDocuments } from "@/yc.service"
import { HydraClient } from "hydra-ai"
import { zodToJsonSchema } from "zod-to-json-schema"

import { HydraCarousel } from "@/components/hydra/carousel"

export const getHydraClient = (): HydraClient => {
  const hydra = new HydraClient()
  return hydra
}

const getYCDataTool = {
  getComponentContext: queryPineconeForDocuments,
  definition: {
    name: "getYCData",
    description: "Get relevant YC data based on the given query.",
    parameters: [
      {
        name: "query",
        type: "string",
        description:
          "The search query for YC data. Make the query a detailed string.",
        isRequired: true,
      },
    ],
  },
}

export const registerHydraComponents = async (hydra: HydraClient) => {
  await Promise.all([
    hydra.registerComponent(
      "HydraCarousel",
      "A carousel of cards component for displaying multiple cards in a carousel format. Make sure to inlcude links as buttons.",
      HydraCarousel,
      {
        HydraCarousel: zodToJsonSchema(HydraCarouselSchema),
      },
      [getYCDataTool]
    ),
  ])
}
