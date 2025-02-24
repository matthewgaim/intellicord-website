"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarItems } from "@/components/dashboard/sidebar"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <div className="flex h-full flex-col">
          <div className="flex h-[60px] items-center border-b px-6">
            <span className="text-lg font-semibold">Intellicord</span>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <SidebarItems />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

