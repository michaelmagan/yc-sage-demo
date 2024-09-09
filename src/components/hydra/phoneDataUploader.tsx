import React, { useState } from "react"
import { generateFakePhoneValidationData } from "@/data.service"

import { Button } from "@/components/ui/button" // Importing the Button component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const PhoneDataUploader: React.FC = () => {
  const [csvData, setCsvData] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState<string>("")

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const text = e.target?.result as string
        setCsvData(text)
        setError(null)
        setLoading(true)

        const phoneNumbers = text.split("\n").map((line) => line.split(",")[0])
        const phoneDataArray = await Promise.all(
          phoneNumbers.map(async (number) => {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            return generateFakePhoneValidationData(number)
          })
        )

        // Convert the phoneDataArray to CSV format
        const csvHeader =
          "ID,Phone Number,Is Valid,Activity Score,Country Calling Code,Country Code,Country Name,Line Type,Carrier,Is Prepaid\n"
        const csvRows = phoneDataArray
          .map(
            (data) =>
              `${data.id},${data.phone_number},${data.is_valid},${data.activity_score},${data.country_calling_code},${data.country_code},${data.country_name},${data.line_type},${data.carrier},${data.is_prepaid}`
          )
          .join("\n")

        setCsvData(csvHeader + csvRows)
        setLoading(false)
      }
      reader.onerror = () => {
        setError("Error reading file")
        setLoading(false)
      }
      reader.readAsText(file)
    }
  }

  const downloadCsv = () => {
    if (csvData) {
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "phone_data.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const downloadTemplate = () => {
    const template = "Phone Number\n+1234567890\n+0987654321\n" // Example template
    const blob = new Blob([template], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "phone_template.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phone Data Uploader</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
        <div>
          <Button onClick={downloadTemplate} variant="link">
            Download CSV Template
          </Button>
        </div>
        {loading && (
          <p className="text-blue-500">Loading data, please wait...</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {csvData && (
          <div>
            <Button onClick={downloadCsv} variant="outline">
              Download CSV
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { PhoneDataUploader }
