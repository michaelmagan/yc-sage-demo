import React from "react"
import { PhoneDataProps } from "@/model/hydra"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const PhoneData: React.FC<PhoneDataProps> = ({ phoneData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {phoneData
            ? "Phone Validation Data"
            : "No Phone Validation Data Available"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {phoneData ? (
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Phone Number:</strong> {phoneData.phone_number}
            </p>
            <p className="text-gray-700">
              <strong>Valid:</strong> {phoneData.is_valid ? "✅ Yes" : "❌ No"}
            </p>
            <p className="text-gray-700">
              <strong>Activity Score:</strong> {phoneData.activity_score}
            </p>
            <p className="text-gray-700">
              <strong>Country Calling Code:</strong>{" "}
              {phoneData.country_calling_code}
            </p>
            <p className="text-gray-700">
              <strong>Country Code:</strong> {phoneData.country_code}
            </p>
            <p className="text-gray-700">
              <strong>Country Name:</strong> {phoneData.country_name}
            </p>
            <p className="text-gray-700">
              <strong>Line Type:</strong> {phoneData.line_type}
            </p>
            <p className="text-gray-700">
              <strong>Carrier:</strong> {phoneData.carrier}
            </p>
            <p className="text-gray-700">
              <strong>Is Prepaid:</strong>{" "}
              {phoneData.is_prepaid ? "✅ Yes" : "❌ No"}
            </p>
            {phoneData.error && (
              <p className="text-red-500">
                <strong>Error:</strong> {JSON.stringify(phoneData.error)}
              </p>
            )}
            {phoneData.warnings && phoneData.warnings.length > 0 && (
              <p className="text-yellow-500">
                <strong>Warnings:</strong> {phoneData.warnings.join(", ")}
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">
            Please provide a valid phone number to see the validation data.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default PhoneData
