"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type FilesAnalyzed = {
  date: string
  amount: number
}

export function FileAnalysisChart({filesAnalyzed}:{filesAnalyzed: FilesAnalyzed[]}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Files Analyzed (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filesAnalyzed}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" label={"Date"} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

