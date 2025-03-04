"use client"

import { Home, Server } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import IntellicordLogo from "@/public/intellicord_logo.png"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Avatar } from './ui/avatar'

export function AppSidebar({profile_pic, username}: {profile_pic?: string, username: string}) {
  // Navigation items with icons
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Servers",
      href: "/dashboard/servers",
      icon: Server,
    }
  ]

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="px-4 py-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <Image
              src={IntellicordLogo}
              alt="Intellicord Logo"
              width={24}
              height={24}
              className="text-primary"
            />
          </div>
          <span className="text-xl font-semibold tracking-tight">Intellicord</span>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="gap-3 px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                  >
                    <Link href={item.href} className="flex items-center">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
            <Avatar className="h-5 w-5">
              <AvatarImage src={profile_pic} />
              <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{username}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}