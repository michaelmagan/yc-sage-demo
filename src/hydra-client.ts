import { generateFakePhoneValidationData } from "@/data.service"
import { PhoneDataPropsSchema } from "@/model/hydra"
import { HydraClient } from "hydra-ai"
import { zodToJsonSchema } from "zod-to-json-schema"

import { PhoneDataUploader } from "@/components/hydra/phoneDataUploader"
import PhoneData from "@/components/hydra/showPhoneData"

export const getHydraClient = (): HydraClient => {
  const hydra = new HydraClient()
  return hydra
}

const getPhoneValidationTool = {
  getComponentContext: async (
    phoneNumber: string,
    countryHint: string = "US"
  ) => {
    const data = await generateFakePhoneValidationData(phoneNumber, countryHint)
    return data
  },
  definition: {
    name: "getPhoneValidationData",
    description: "Return a phone validation data.",
    parameters: [
      {
        name: "phoneNumber",
        type: "string",
        description: "The phone number to validate.",
        isRequired: true,
      },
      {
        name: "countryHint",
        type: "string",
        description: "The country code hint for validation.",
        isRequired: false,
      },
    ],
  },
}

export const registerHydraComponents = async (hydra: HydraClient) => {
  await Promise.all([
    hydra.registerComponent(
      "PhoneData",
      "A component for displaying phone validation data.",
      PhoneData,
      JSON.stringify(zodToJsonSchema(PhoneDataPropsSchema)),
      [getPhoneValidationTool]
    ),
    hydra.registerComponent(
      "VerifyPhoneNumbers",
      "A component for verifying phone numbers.",
      PhoneDataUploader,
      {},
      []
    ),
  ])
}
