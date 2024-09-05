"use client"

import { ChartData } from "@/model/hydra"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type ChartProps = ChartData

const Chart: React.FC<ChartProps> = ({ header, subheader, data, config }) => {
  const dataKeys = Object.keys(config)

  console.log(dataKeys)
  return (
    <Card className="min-h-[200px] w-full min-w-[300px]">
      <CardHeader>
        <CardTitle>{header}</CardTitle>
        <CardDescription>{subheader}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config as ChartConfig}
          className="overflow-auto"
        >
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            {dataKeys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={config[key].color}
                radius={4}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default Chart
