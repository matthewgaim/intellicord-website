"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", files: 12 },
  { name: "Tue", files: 19 },
  { name: "Wed", files: 3 },
  { name: "Thu", files: 5 },
  { name: "Fri", files: 2 },
  { name: "Sat", files: 3 },
  { name: "Sun", files: 10 },
]

export function FileAnalysisChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Files Analyzed (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="files" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

