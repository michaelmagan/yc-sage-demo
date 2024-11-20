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
    hydraApiKey: process.env.NEXT_PUBLIC_HYDRAAI_API_KEY,
  })
  return hydra
}

// Tool definition for retrieving YC company data from Pinecone vector database
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
  try {
    await Promise.all([
      // Register HydraCarousel component - Used to display YC company cards in a carousel format
      // The component can fetch relevant company data using the getYCDataTool
      hydra.registerComponent({
        name: "HydraCarousel",
        description:
          "A carousel of cards component for displaying multiple YC companies that match a given query...",
        component: HydraCarousel,
        propsDefinition: {
          HydraCarousel: zodToJsonSchema(HydraCarouselSchema),
        },
        contextTools: [getYCDataTool], // Allows the component to fetch YC data
      }),

      // Register HydraText component - Used for generating and formatting text content
      // This component can create structured text with sharing capabilities
      hydra.registerComponent({
        name: "HydraText",
        description:
          "A text component for creating and generating text content...",
        component: HydraText,
        propsDefinition: { HydraText: zodToJsonSchema(HydraTextSchema) },
      }),

      // Register Chart component - Used for data visualization
      // This component creates charts when numerical data analysis is requested
      hydra.registerComponent({
        name: "Chart",
        description: "A chart component for visualizing quantitative data...",
        component: Chart,
        propsDefinition: { Chart: zodToJsonSchema(HydraChartSchema) },
      }),

      // Register ProfileForm component - Used to collect and store user information
      // This component manages user profile data that can be used to personalize responses
      hydra.registerComponent({
        name: "ProfileForm",
        description: "A form component to save information on the user...",
        component: ProfileForm,
        propsDefinition: { ProfileForm: zodToJsonSchema(ProfilePropsSchema) },
      }),
    ])
  } catch (error) {
    console.error("Error registering components:", error)
  }
}
