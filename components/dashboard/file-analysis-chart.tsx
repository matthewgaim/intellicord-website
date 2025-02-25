"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function FileAnalysisChart({filesAnalyzed}:{filesAnalyzed: number}) {
  const data = [
    { name: "Mon", files: 0 },
    { name: "Tue", files: 0 },
    { name: "Wed", files: 0 },
    { name: "Thu", files: 0 },
    { name: "Fri", files: 0 },
    { name: "Sat", files: 0 },
    { name: "Sun", files: filesAnalyzed },
  ]

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

