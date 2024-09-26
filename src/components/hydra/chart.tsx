import React, { useEffect, useState } from "react"
import { HydraChart } from "@/model/hydra"
import { groupBy } from "@/yc.service"
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Chart: React.FC<HydraChart> = ({
  type,
  select,
  groupBy: groupByProps,
  where,
  orderBy,
  limit,
  dataKey,
  nameKey = "name",
  colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#0088FE",
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
  ],
}) => {
  const [chartType, setChartType] = useState<"line" | "bar">(type)
  const [data, setData] = useState<any[]>([])
  const [key, setKey] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const result = await groupBy({
        select,
        groupBy: groupByProps,
        where,
        orderBy,
        limit,
      })
      setData(result)
    }

    fetchData()
  }, [select, groupByProps, where, orderBy, limit])

  useEffect(() => {
    // Force re-render when data changes
    setKey((prevKey) => prevKey + 1)
  }, [data])

  const getMaxValue = (data: any[], key: string) => {
    return Math.max(...data.map((item) => item[key]))
  }

  const getYAxisDomain = (data: any[], key: string) => {
    const maxValue = getMaxValue(data, key)
    return [0, Math.ceil(maxValue * 1.1)] // 10% larger than the max value, rounded up
  }

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toFixed(0)
  }

  const renderChart = () => {
    if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} key={key}>
            <XAxis dataKey={nameKey} />
            <YAxis
              domain={getYAxisDomain(data, dataKey)}
              tickFormatter={formatYAxis}
              width={60}
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )
    } else if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} key={key}>
            <XAxis dataKey={nameKey} />
            <YAxis
              domain={getYAxisDomain(data, dataKey)}
              tickFormatter={formatYAxis}
              width={60}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )
    }

    return null
  }

  return (
    <div>
      <Select
        defaultValue={type}
        onValueChange={(value: "line" | "bar") => setChartType(value)}
      >
        <SelectTrigger className="mb-4 w-[180px]">
          <SelectValue placeholder="Select chart type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="line">Line Chart</SelectItem>
          <SelectItem value="bar">Bar Chart</SelectItem>
        </SelectContent>
      </Select>
      {renderChart()}
    </div>
  )
}

export default Chart
