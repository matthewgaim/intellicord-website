"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clipboard, ExternalLink, FileText, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import type { FileInfo } from "./dashboard-content"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function FileAnalysis({ recentFiles }: { recentFiles: FileInfo[] }) {
  const { toast } = useToast()

  function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${(bytes / Math.pow(k, i)).toFixed(decimals)} ${sizes[i]}`
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: `User ID has been copied`,
        duration: 2000,
      })
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Recent Files Uploaded
        </CardTitle>
      </CardHeader>

      {/* Mobile card view */}
      <CardContent className="block md:hidden px-2 sm:px-4">
        <div className="space-y-4">
          {recentFiles?.length === 0 ? (
            <p className="text-center text-muted-foreground">No recent files</p>
          ) : (
            recentFiles?.map((file, idx) => (
              <Card key={idx} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium truncate flex-1 pr-2">{file.name}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => copyToClipboard(`<@${file.uploader_id}>`)}>
                          <Clipboard className="h-4 w-4 mr-2" />
                          Copy User ID
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`https://discord.com/channels/${file.discord_server_id}`}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open Discord Server
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="truncate">{file.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Size</p>
                      <p>{formatBytes(file.size)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p>{file.analyzed_date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>

      {/* Desktop table view */}
      <CardContent className="hidden md:block overflow-auto">
        <TooltipProvider>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Server</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentFiles?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No recent files
                  </TableCell>
                </TableRow>
              ) : (
                recentFiles?.map((file, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{file.name}</TableCell>
                    <TableCell>{file.type}</TableCell>
                    <TableCell>{formatBytes(file.size)}</TableCell>
                    <TableCell>{file.analyzed_date}</TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => copyToClipboard(`<@${file.uploader_id}>`)}
                          >
                            <Clipboard className="h-4 w-4" />
                            <span className="sr-only">Copy user ID</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy user ID to clipboard</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <div className="items-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                              <Link href={`https://discord.com/channels/${file.discord_server_id}`}>
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Open Discord server</span>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Open Discord server</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}