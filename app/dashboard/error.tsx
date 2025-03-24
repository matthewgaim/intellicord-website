"use client" // Error boundaries must be Client Components

import { useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard error:", error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <Card className="w-full max-w-md border-muted shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-xl font-medium">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            We encountered an issue while loading your Intellicord dashboard. This is likely a temporary problem.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
            Go back
          </Button>
          <Button onClick={() => reset()}>Try again</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

