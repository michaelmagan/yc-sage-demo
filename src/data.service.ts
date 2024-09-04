import { ChartData } from "@/model/hydra"

export async function generateFakeChartData(
  numPoints: number = 5,
  dataKeys: string[] = ["desktop", "mobile"],
  groupBy: "month" | "week" | "day" = "month"
): Promise<ChartData> {
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

  const config: Record<string, { label: string; color: string }> = {}
  dataKeys.forEach((key) => {
    config[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: `var(--color-${key})`,
    }
  })

  return {
    header: "Fake Data",
    subheader: "This is a fake data",
    data,
    config,
  }
}
