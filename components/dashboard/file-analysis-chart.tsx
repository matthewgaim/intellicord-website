"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { FileText, ChartNoAxesColumnIncreasing } from "lucide-react"

type FilesAnalyzed = {
  date: string
  amount: number
}

export function FileAnalysisChart({ filesAnalyzed }: { filesAnalyzed: FilesAnalyzed[] }) {
  const formattedData = filesAnalyzed.map((item) => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartNoAxesColumnIncreasing className="h-5 w-5 text-primary" />
          Files Analyzed (Last 7 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            files: {
              label: "Files",
              color: "purple",
              icon: FileText,
            },
          }}
          className="h-[300px] w-full"
        >
          <LineChart
            data={formattedData}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="black" vertical={false} />
            <XAxis
              dataKey="formattedDate"
              tickLine={true}
              axisLine={false}
              tickMargin={10}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent indicator="line" />
              }
            />
            <Line
              type="natural"
              dataKey="amount"
              name="files"
              stroke="var(--color-files)"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "var(--color-files)",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 6,
                fill: "var(--color-files)",
                stroke: "hsl(var(--background))",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

