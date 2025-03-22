"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Clipboard,
  ExternalLink,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { FileInfo } from "./dashboard-content";
import Link from "next/link";

export function FileAnalysis({ recentFiles }: { recentFiles: FileInfo[] }) {
  const { toast } = useToast();

  function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${(bytes / Math.pow(k, i)).toFixed(decimals)} ${sizes[i]}`;
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: `User ID has been copied`,
        duration: 2000,
      });
    });
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
        <TooltipProvider>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Analyzed</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Server</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentFiles?.map((file, idx) => (
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
                          onClick={() =>
                            copyToClipboard(`<@${file.uploader_id}>`)
                          }
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
                            <Link
                              href={`https://discord.com/channels/${file.discord_server_id}`}
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">
                                Open Discord server
                              </span>
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
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
