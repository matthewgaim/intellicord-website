import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"
import { DashboardHeader } from "./dashboard-header"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
            <MobileSidebar />
            <div className="flex-1">
              <DashboardHeader />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  )
}

