import { Suspense } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { PlusCircle, Server, Users, Settings, Activity } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getBotInviteUrl, getJoinedServers } from "@/app/actions/dashboard-info"
import ServerSkeleton from "./skeleton"

type ServerInfo = {
  id: number
  discord_server_id: string
  joined_at: string
  name: string
  member_count: number
  icon: string
}

export default async function ServersPage() {
  const servers = await getJoinedServers()

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Your Servers</h2>
          <AddServerButton />
        </div>
        <p className="text-muted-foreground">Manage your Discord servers where Intellicord is active</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Suspense fallback={<SkeletonGrid />}>
          {servers?.map((server: ServerInfo) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </Suspense>
      </div>
    </div>
  )
}

function ServerCard({ server }: { server: ServerInfo }) {
  const joinedDate = new Date(server.joined_at)
  const timeAgo = formatDistanceToNow(joinedDate, { addSuffix: true })

  // Determine if server was joined recently (within last 7 days)
  const isRecent = Date.now() - joinedDate.getTime() < 7 * 24 * 60 * 60 * 1000

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md">
      {/* Server banner/header with gradient */}
      <div className="relative h-24 bg-gradient-to-r from-blue-300 to-blue-400">
        {/* Server icon */}
        <div className="absolute -bottom-8 left-4">
          <Avatar className="h-16 w-16 rounded-full border-4 border-background shadow-md">
            <AvatarImage src={server.icon} alt={server.name} />
            <AvatarFallback className="bg-primary text-xl font-semibold text-primary-foreground">
              {server.name[0] || "S"}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Status badge */}
        <div className="absolute right-3 top-3">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500" />
            Active
          </Badge>
        </div>
      </div>

      {/* Server info */}
      <div className="p-4 pt-10">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold truncate pr-2">{server.name}</h3>
            {isRecent && (
              <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-500 border-blue-500/20">
                New
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Joined {timeAgo}</p>
        </div>

        {/* Server stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 rounded-md bg-muted p-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Members</p>
              <p className="font-medium">{server.member_count.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-muted p-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Commands</p>
              <p className="font-medium">247</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button variant="default" size="sm" className="flex-1">
            <Settings className="mr-2 h-4 w-4" />
            Manage
          </Button>
          <Button variant="outline" size="sm" className="px-2">
            <Server className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

async function AddServerButton() {
  const url = await getBotInviteUrl()

  return (
    <Link href={url} target="_blank">
      <Button className="gap-2">
        <PlusCircle className="h-4 w-4" />
        Add to Server
      </Button>
    </Link>
  )
}

function SkeletonGrid() {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <ServerSkeleton key={i} />
      ))}
    </>
  )
}

export const runtime = "edge"

