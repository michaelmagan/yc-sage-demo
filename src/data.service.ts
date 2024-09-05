import { ChartData } from "@/model/hydra"

export async function generateFakeChartData(
  numPoints: number = 5,
  dataKeys: string[] = ["desktop", "mobile"],
  groupBy: "month" | "week" | "day" = "month"
): Promise<Omit<ChartData, "header" | "subheader">> {
  const data: Array<{ label: string } & Record<string, number>> = []

  const startDate = new Date()
  startDate.setDate(
    startDate.getDate() -
      (groupBy === "week"
        ? numPoints * 7
        : groupBy === "day"
          ? numPoints
          : numPoints * 30) +
      1
  )

  for (let i = 0; i < numPoints; i++) {
    let label: string
    if (groupBy === "month") {
      label = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + i,
        1
      ).toLocaleString("default", { month: "long" })
    } else if (groupBy === "week") {
      const weekStartDate = new Date(startDate)
      weekStartDate.setDate(startDate.getDate() + i * 7)
      label = `Week of ${weekStartDate.toLocaleDateString()}`
    } else {
      const dayDate = new Date(startDate)
      dayDate.setDate(startDate.getDate() + i)
      label = dayDate.toLocaleDateString()
    }

    const dataPoint: { label: string } & Record<string, number> = {
      label,
    } as { label: string } & Record<string, number>

    dataKeys.forEach((key) => {
      dataPoint[key] = Math.floor(Math.random() * 100)
    })

    data.push(dataPoint)
  }

  const colors = [
    "#2563eb", // blue
    "#4ade80", // green
    "#fbbf24", // yellow
    "#ef4444", // red
    "#e11d48", // pink
    "#ec4899", // purple
    "#f59e0b", // orange
    "#10b981", // emerald
    "#06b6d4", // sky
    "#3b82f6", // indigo
    "#84cc16", // lime
    "#f97316", // amber
    "#eab308", // yellow
  ]

  const config: Record<string, { label: string; color: string }> = {}
  dataKeys.forEach((key, index) => {
    config[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: colors[index % colors.length],
    }
  })

  return {
    data,
    config,
  }
}
