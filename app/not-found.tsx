import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import IntellicordLogo from "@/public/intellicord_logo.png"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-background to-muted px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-primary/10 p-3 rounded-full">
          <Image
                src={IntellicordLogo}
                alt="Intellicord Logo"
                className="w-12 h-12 text-primary"/>
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">404</h1>
        <h2 className="text-2xl font-semibold text-muted-foreground">Page not found</h2>

        <p className="text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved to another location.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

