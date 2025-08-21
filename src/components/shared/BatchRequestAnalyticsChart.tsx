"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { month: "Jan", "2021-2025": 4, "2022-2026": 3, "2023-2027": 2 },
  { month: "Feb", "2021-2025": 5, "2022-2026": 4, "2023-2027": 3 },
  { month: "Mar", "2021-2025": 3, "2022-2026": 6, "2023-2027": 4 },
  { month: "Apr", "2021-2025": 6, "2022-2026": 5, "2023-2027": 5 },
  { month: "May", "2021-2025": 4, "2022-2026": 7, "2023-2027": 6 },
  { month: "Jun", "2021-2025": 8, "2022-2026": 6, "2023-2027": 7 },
]

const chartConfig = {
  "2021-2025": {
    label: "2021-2025",
    color: "hsl(var(--chart-1))",
  },
  "2022-2026": {
    label: "2022-2026",
    color: "hsl(var(--chart-2))",
  },
  "2023-2027": {
    label: "2023-2027",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

const BatchRequestAnalyticsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Analytics by Batch</CardTitle>
        <CardDescription>
          Total requests per batch over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            {Object.keys(chartConfig).map((batchName) => (
              <Bar
                key={batchName}
                dataKey={batchName}
                fill={`var(--color-${batchName})`}
                radius={4}
                stackId="a"
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BatchRequestAnalyticsChart