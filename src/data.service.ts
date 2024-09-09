import { PhoneValidationResponse } from "@/model/hydra"

export async function generateFakePhoneValidationData(
  phoneNumber: string,
  countryHint: string = "US"
): Promise<PhoneValidationResponse> {
  const isValid = Math.random() > 0.2 // 80% chance of being valid
  const activityScore = Math.floor(Math.random() * 101) // Activity score between 0 and 100
  const lineTypes = [
    "Landline",
    "Mobile",
    "FixedVOIP",
    "NonFixedVOIP",
    "Premium",
    "TollFree",
    "Voicemail",
    "Other",
  ]
  const carrierNames = ["Carrier A", "Carrier B", "Carrier C", "Carrier D"]

  const dataPoint: PhoneValidationResponse = {
    id: `phone-1`,
    phone_number: phoneNumber,
    is_valid: isValid,
    activity_score: activityScore,
    country_calling_code: "+1",
    country_code: countryHint,
    country_name: "United States",
    line_type: lineTypes[Math.floor(Math.random() * lineTypes.length)] as
      | "Landline"
      | "Mobile"
      | "FixedVOIP"
      | "NonFixedVOIP"
      | "Premium"
      | "TollFree"
      | "Voicemail"
      | "Other"
      | null,
    carrier: carrierNames[Math.floor(Math.random() * carrierNames.length)],
    is_prepaid: Math.random() > 0.5,
    error: undefined, // Changed from null to undefined
    warnings: [],
  }

  return dataPoint
}
