import {
  HydraCarouselSchema,
  HydraChartSchema,
  HydraTextSchema,
  ProfilePropsSchema,
} from "@/model/hydra"
import { queryPineconeForDocuments } from "@/yc.service"
import { HydraClient } from "hydra-ai"
import { zodToJsonSchema } from "zod-to-json-schema"

import { ProfileForm } from "@/components/chat/profile"
import { HydraCarousel } from "@/components/hydra/carousel"
import Chart from "@/components/hydra/chart"
import { HydraText } from "@/components/hydra/text"

export const getHydraClient = (): HydraClient => {
  const hydra = new HydraClient({
    hydraApiKey: process.env.HYDRAAI_API_KEY,
  })
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
          "The search query for YC data. It is crucial that the query is extremely detailed and comprehensive, including every aspect the user has asked for. The query MUST be a long, elaborate string containing at least 20-30 words to ensure all user requirements are captured. Shorter queries will not provide sufficient context for accurate results.",
        isRequired: true,
      },
    ],
  },
}

export const registerHydraComponents = async (hydra: HydraClient) => {
  await Promise.all([
    hydra.registerComponent(
      "HydraCarousel",
      "A carousel of cards component for displaying multiple YC companies that match a given query. Each card represents a company and should include as many relevant links as possible, represented as buttons. These links should be derived from the content and context of each company card, providing comprehensive navigation options for users. Ensure that every potential action or related information about the company has a corresponding button link.",
      HydraCarousel,
      {
        HydraCarousel: zodToJsonSchema(HydraCarouselSchema),
      },
      [getYCDataTool]
    ),
    hydra.registerComponent(
      "HydraText",
      "A text component for creating and generating text content. Generate text based on the context and the user's query. Each field should have a unique 'id' that corresponds to the data it represents. The 'share' property allows defining multiple sharing options, each with a custom URL template. In the URL template, use {fieldId} placeholders to insert field values when sharing.",
      HydraText,
      {
        HydraText: zodToJsonSchema(HydraTextSchema),
      }
    ),
    hydra.registerComponent(
      "Chart",
      "A chart component for visualizing quantitative data. It supports both line and bar charts, and should only be used when users specifically request counts, averages, or other numerical data that are clearly suited for graphical representation. This component is ideal for displaying trends, comparisons, and distributions of numerical data.",
      Chart,
      {
        Chart: zodToJsonSchema(HydraChartSchema),
      }
    ),
    hydra.registerComponent(
      "ProfileForm",
      "A form component to save information on the user. It allows users to input and store personal data, which can be retrieved and used in other parts of the application.",
      ProfileForm,
      {
        ProfileForm: zodToJsonSchema(ProfilePropsSchema),
      }
    ),
  ])
}
