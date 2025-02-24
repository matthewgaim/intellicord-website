'use client'
import Link from "next/link"
import { Home, FileText, BarChart, Settings, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'

export const sidebarItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Servers", icon: FileText, href: "/dashboard/servers" },
  { name: "Analytics", icon: BarChart, href: "/dashboard/analytics" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export function Sidebar() {
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <span className="text-lg">Intellicord</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <SidebarItems />
        </div>
        <div className="mt-auto p-4">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/help">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export function SidebarItems() {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <nav className="grid items-start px-4 text-sm font-medium">
      {sidebarItems.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
            item.href === pathname && "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50",
          )}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        </Button>
      ))}
    </nav>
  )
}

