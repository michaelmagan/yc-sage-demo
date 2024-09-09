import { z } from "zod"

export const PhoneValidationSchema = z.object({
  id: z.string().nullable().describe("The persistent ID of the phone number."),
  phone_number: z
    .string()
    .nullable()
    .describe("The phone number in E.164 or local format."),
  is_valid: z
    .boolean()
    .nullable()
    .describe("True if the phone number is valid."),
  activity_score: z
    .number()
    .describe("Trestle's activity score ranging from 0 to 100."),
  country_calling_code: z
    .string()
    .nullable()
    .describe("The country code of the phone number."),
  country_code: z
    .string()
    .nullable()
    .describe("The ISO-3166 alpha-2 country code of the phone number."),
  country_name: z
    .string()
    .nullable()
    .describe("The country name associated with the phone number."),
  line_type: z
    .enum([
      "Landline",
      "Mobile",
      "FixedVOIP",
      "NonFixedVOIP",
      "Premium",
      "TollFree",
      "Voicemail",
      "Other",
    ])
    .nullable()
    .describe("The line type of the phone number."),
  carrier: z
    .string()
    .nullable()
    .describe("The company providing services for the phone number."),
  is_prepaid: z
    .boolean()
    .nullable()
    .describe("True if the phone is associated with a prepaid account."),
  error: z.object({}).optional(),
  warnings: z
    .array(z.string())
    .optional()
    .describe("Warnings returned as part of the response."),
})

export const PhoneDataPropsSchema = z.object({
  phoneData: PhoneValidationSchema,
})

export type PhoneDataProps = z.infer<typeof PhoneDataPropsSchema>
export type PhoneValidationResponse = z.infer<typeof PhoneValidationSchema>
