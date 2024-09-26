import React, { useEffect, useState } from "react"
import { Profile } from "@/model/hydra"
import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const ProfileForm: React.FC<Profile> = ({
  title,
  fields,
  className,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialData: Record<string, string> = {}
    fields.forEach((field) => {
      initialData[field.id] = field.value || ""
    })
    return initialData
  })
  const [isSaved, setIsSaved] = useState(false)
  const [buttonText, setButtonText] = useState("Save Profile")

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      setFormData((prev) => ({
        ...prev,
        ...JSON.parse(savedProfile),
      }))
      setButtonText("Update Profile")
    }
  }, [])

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
    setIsSaved(false)
    setButtonText("Save Profile")
  }

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(formData))
    setIsSaved(true)
    setButtonText("Saving...")
    setTimeout(() => {
      setButtonText("Update Profile")
      setIsSaved(false)
    }, 1000)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {fields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            {field.type === "input" ? (
              <Input
                id={field.id}
                type={field.inputType || "text"}
                value={formData[field.id]}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className={field.className}
              />
            ) : (
              <Textarea
                id={field.id}
                value={formData[field.id]}
                rows={field.rows}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className={field.className}
              />
            )}
            <Button
              variant="link"
              onClick={() => handleCopy(formData[field.id])}
              className="mt-2"
            >
              <CopyIcon className="mr-1" /> Copy
            </Button>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="w-full" disabled={isSaved}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
