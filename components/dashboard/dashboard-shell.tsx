import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"
import { DashboardHeader } from "./dashboard-header"
import { cookies } from "next/headers"
export async function DashboardShell({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const discord_avatar_cookie = cookieStore.get("discord_avatar")?.value;
  const discord_avatar = discord_avatar_cookie ? decodeURI(discord_avatar_cookie) : "test.png"
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
            <MobileSidebar />
            <div className="flex-1">
              <DashboardHeader avatar={discord_avatar}/>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  )
}

