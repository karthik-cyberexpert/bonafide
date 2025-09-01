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
import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { showError } from "@/utils/toast"
import { BonafideRequest } from "@/lib/types"

const chartConfig = {
  requests: {
    label: "Requests",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const RequestAnalyticsChart = () => {
  const [chartData, setChartData] = useState<Array<{ month: string; requests: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      const { data: requestsData, error: requestsError } = await supabase
        .from('requests')
        .select('date');

      if (requestsError) {
        showError("Error fetching requests for chart: " + requestsError.message);
        setLoading(false);
        return;
      }

      const today = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(today.getMonth() - 5); // Go back 5 full months to include current month

      const monthlyCounts: Record<string, number> = {}; // Key: YYYY-MM

      // Initialize counts for the last 6 months
      for (let i = 0; i < 6; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        monthlyCounts[yearMonth] = 0;
      }

      requestsData.forEach((req: Pick<BonafideRequest, 'date'>) => {
        const requestDate = new Date(req.date);
        // Only count requests within the last 6 months (inclusive of current month)
        if (requestDate >= sixMonthsAgo && requestDate <= today) {
          const yearMonth = `${requestDate.getFullYear()}-${(requestDate.getMonth() + 1).toString().padStart(2, '0')}`;
          if (monthlyCounts[yearMonth] !== undefined) {
            monthlyCounts[yearMonth]++;
          }
        }
      });

      const formattedChartData = Object.keys(monthlyCounts)
        .sort() // Sort by date to ensure correct order
        .map(yearMonth => {
          const [year, monthNum] = yearMonth.split('-').map(Number);
          const monthName = new Date(year, monthNum - 1).toLocaleString('default', { month: 'short' }); // e.g., Jan, Feb
          return {
            month: monthName,
            requests: monthlyCounts[yearMonth],
          };
        });
      setChartData(formattedChartData);
      setLoading(false);
    };

    fetchChartData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Chart...</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please wait while we load the chart data.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Analytics</CardTitle>
        <CardDescription>Requests processed in the last 6 months</CardDescription>
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

export default RequestAnalyticsChart