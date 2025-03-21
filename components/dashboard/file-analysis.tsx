import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText } from "lucide-react"

type AnalyzedFile = {
  name: string
  type: string
  size: number
  analyzed_date: string
}

export function FileAnalysis({recentFiles}: {recentFiles:AnalyzedFile[]}) {
  function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${(bytes / Math.pow(k, i)).toFixed(decimals)} ${sizes[i]}`;
  }
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Recent Files Uploaded
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Analyzed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentFiles?.map((file, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{file.name}</TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell>{formatBytes(file.size)}</TableCell>
                <TableCell>{file.analyzed_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

