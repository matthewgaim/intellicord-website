import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileAnalysis } from "@/components/dashboard/file-analysis"
import { FileAnalysisChart } from "@/components/dashboard/file-analysis-chart"
import AnimatedCounter from "@/components/animated-counter"

type FileInfo = {
  name: string
  type: string
  size: number
  analyzed_date: string
}

type FilesAnalyzed = {
  date: string
  amount: number
}

export function DashboardContent({files_analyzed, recentFiles, totalMessagesCount}: {files_analyzed: FilesAnalyzed[], recentFiles: FileInfo[], totalMessagesCount: number}) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files Analyzed</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatedCounter value={recentFiles?.length} duration={250}/>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Replies Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatedCounter value={totalMessagesCount} duration={500}/>
          </CardContent>
        </Card>
      </div>
      <FileAnalysisChart filesAnalyzed={files_analyzed}/>
      <FileAnalysis recentFiles={recentFiles}/>
    </div>
  )
}

