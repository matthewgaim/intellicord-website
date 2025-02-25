import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type AnalyzedFile = {
  name: string
  type: string
  size: string
  analyzed_date: string
}

export function FileAnalysis({recentFiles}: {recentFiles:AnalyzedFile[]}) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent File Analysis</CardTitle>
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
            {recentFiles?.map((file) => (
              <TableRow key={file.name}>
                <TableCell className="font-medium">{file.name}</TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>{file.analyzed_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

