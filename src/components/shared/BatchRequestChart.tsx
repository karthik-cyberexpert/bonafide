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
import { dummyRequests } from "@/data/dummyRequests"
import { dummyStudents } from "@/data/dummyData"

// Process data to get request count per batch
const processChartData = () => {
  const requestsWithBatch = dummyRequests.map(request => {
    const student = dummyStudents.find(s => s.registerNumber === request.studentId);
    return { ...request, batch: student?.batch };
  });

  const batchCounts = requestsWithBatch.reduce((acc, request) => {
    if (request.batch) {
      acc[request.batch] = (acc[request.batch] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(batchCounts).map(([batch, requests]) => ({
    batch,
    requests,
  }));
};

const chartData = processChartData();

const chartConfig = {
  requests: {
    label: "Requests",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const BatchRequestChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Request Analytics by Batch</CardTitle>
        <CardDescription>Total requests submitted by students from each batch this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="batch"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="requests"
              fill="var(--color-requests)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BatchRequestChart