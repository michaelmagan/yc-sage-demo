import React, { useState } from "react"
import { HydraForm } from "@/model/hydra"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"

export const HydraQueryConstructor: React.FC<HydraForm> = ({
  title,
  fields,
  className,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialData: Record<string, string> = {}
    fields.forEach((field) => {
      initialData[`${field.id}_text`] = field.label || ""
    })
    return initialData
  })

  const handleInputChange = (label: string, value: string) => {
    setFormData((prev) => ({ ...prev, [label]: value }))
  }

  return (
    <Card className={className}>
      <CardHeader>{title && <CardTitle>{title}</CardTitle>}</CardHeader>
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
                value={formData[field.id] || field.text}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className={field.className}
              />
            ) : field.type === "textarea" ? (
              <Textarea
                id={field.id}
                value={formData[field.id] || field.text}
                rows={field.rows}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className={field.className}
              />
            ) : field.type === "slider" ? (
              <Slider
                id={field.id}
                value={[Number(formData[field.id] || 0)]}
                onValueChange={(value) =>
                  handleInputChange(field.id, value[0].toString())
                }
                className={field.className}
              />
            ) : field.type === "select" ? (
              <Select
                onValueChange={(value) =>
                  handleInputChange(`${field.id}_text`, value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.label} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option, optionIndex) => (
                    <SelectItem key={optionIndex} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === "radio-group" ? (
              <RadioGroup
                value={formData[field.id]}
                onValueChange={(value) => handleInputChange(field.id, value)}
              >
                {field.options.map((option, optionIndex) => (
                  <RadioGroupItem key={optionIndex} value={option.value}>
                    {option.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            ) : null}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => console.log(formData)}>Submit</Button>
      </CardFooter>
    </Card>
  )
}
