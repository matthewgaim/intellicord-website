"use client"

import { AlertCircle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.log(error)
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-center mb-6">
              <AlertCircle className="h-12 w-12 text-amber-500 dark:text-amber-400" />
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-3">
              There was an error
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              We&apos;re experiencing some difficulties. Please try again later.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => reset()}
                className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors duration-200 focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

export const runtime = 'edge';