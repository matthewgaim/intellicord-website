"use client";
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "../ui/avatar";

export function DashboardHeader({avatar}: {avatar: string}) {
  const router = useRouter()
  const handleLogout = async () => {
    try {
        const response = await fetch("/api/auth/logout", {
            method: "GET",
            credentials: "include",
        });

        if (response.redirected) {
            router.push(response.url);
        }
    } catch (error) {
        console.error("Logout failed", error);
    }
};
  return (
    <div className="flex items-center gap-4">
      <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={avatar}
                  className="rounded-full border-2 hover:border-[#7e61ab] shadow-md"
                  />
              </Avatar>
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

