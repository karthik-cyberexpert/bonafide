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
import { Batch, Department } from "@/lib/types"

const chartConfig = {
  requests: {
    label: "Requests",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

// Define a type for the data returned by this specific Supabase query
interface StudentChartData {
  id: string;
  batches: { // batches is a single batch object
    departments: { // departments is a single object within the batch object
      name: string;
    };
  } | null; // batches can be null
}

const DepartmentRequestChart = () => {
  const [chartData, setChartData] = useState<Array<{ department: string; requests: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      const { data: requestsData, error: requestsError } = await supabase
        .from('requests')
        .select('student_id');

      if (requestsError) {
        showError("Error fetching requests for chart: " + requestsError.message);
        setLoading(false);
        return;
      }

      const studentIds = requestsData.map(r => r.student_id);

      if (studentIds.length === 0) {
        setChartData([]);
        setLoading(false);
        return;
      }

      const { data: studentsRawData, error: studentsError } = await supabase
        .from('students')
        .select(`
          id,
          batches(departments(name))
        `)
        .in('id', studentIds); // Keep .in filter for efficiency

      if (studentsError) {
        showError("Error fetching student data for chart: " + studentsError.message);
        setLoading(false);
        return;
      }

      // Explicitly cast the raw data to our defined interface
      const studentsData: StudentChartData[] = studentsRawData || [];

      const requestsWithDept = requestsData.map(request => {
        const student = studentsData.find(s => s.id === request.student_id);
        // Access the nested department name, now expecting departments to be a single object
        const departmentName = student?.batches?.departments?.name;
        return {
          ...request,
          department_name: departmentName
        };
      });

      const deptCounts = requestsWithDept.reduce((acc, request) => {
        if (request.department_name) {
          acc[request.department_name] = (acc[request.department_name] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      setChartData(Object.entries(deptCounts).map(([department, requests]) => ({
        department,
        requests,
      })));
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
        <CardTitle>Monthly Requests by Department</CardTitle>
        <CardDescription>Total requests submitted by students from each department this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="department"
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

export default DepartmentRequestChart