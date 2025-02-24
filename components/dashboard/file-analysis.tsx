import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentFiles = [
  { name: "document.pdf", type: "PDF", size: "2.5 MB", analyzed: "2 hours ago" },
  { name: "image.jpg", type: "Image", size: "1.8 MB", analyzed: "3 hours ago" },
  { name: "data.csv", type: "CSV", size: "500 KB", analyzed: "5 hours ago" },
  { name: "presentation.pptx", type: "PowerPoint", size: "4.2 MB", analyzed: "1 day ago" },
  { name: "code.py", type: "Python", size: "10 KB", analyzed: "1 day ago" },
]

export function FileAnalysis() {
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
            {recentFiles.map((file) => (
              <TableRow key={file.name}>
                <TableCell className="font-medium">{file.name}</TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>{file.analyzed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

