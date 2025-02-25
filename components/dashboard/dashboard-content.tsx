import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileAnalysis } from "@/components/dashboard/file-analysis"
import { FileAnalysisChart } from "@/components/dashboard/file-analysis-chart"

type AnalyzedFile = {
  name: string
  type: string
  size: string
  analyzed_date: string
}

export function DashboardContent({files_analyzed, recentFiles}: {files_analyzed: number, recentFiles: AnalyzedFile[]}) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files Analyzed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{files_analyzed}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Queries Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">REPLACE_ME</div>
            <p className="text-xs text-muted-foreground">+15.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">REPLACE_ME</div>
            <p className="text-xs text-muted-foreground">+7.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">REPLACE_ME</div>
            <p className="text-xs text-muted-foreground">-0.1s from last month</p>
          </CardContent>
        </Card>
      </div>
      <FileAnalysisChart filesAnalyzed={files_analyzed}/>
      <FileAnalysis recentFiles={recentFiles}/>
    </div>
  )
}

