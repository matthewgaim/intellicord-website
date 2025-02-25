import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getBotInviteUrl, getJoinedServers } from "@/app/actions";
import { Suspense } from "react";
import ServerSkeleton from "./skeleton";
import { formatDistanceToNow } from "date-fns"


type ServerInfo = {
  id: number;
  discord_server_id: string;
  joined_at: string;
  name: string;
  member_count: number;
  icon: string;
};
let servers: ServerInfo[] = [];

export default async function ServersPage() {
  const res = await getJoinedServers();
  servers = res;
  console.log(res);
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Servers</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<SkeletonGrid />}>
          {servers.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </Suspense>
        <AddServerCard />
      </div>
    </div>
  );
}

function ServerCard({ server }: { server: ServerInfo }) {
  function timeAgo(timestamp: string) {
    const date = new Date(timestamp)
    return `Joined ${formatDistanceToNow(date, { addSuffix: true })}`
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{server.name}</CardTitle>
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarImage src={server.icon} alt={server.name} />
          <AvatarFallback>{server.name[0] || "T"}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {server.member_count.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground">members</p>
        <h2 className="text-xs text-muted-foreground">{timeAgo(server.joined_at)}</h2>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Manage
        </Button>
      </CardFooter>
    </Card>
  );
}

async function AddServerCard() {
  const url = await getBotInviteUrl();
  return (
    <Card className="flex flex-col items-center justify-center">
      <CardHeader>
        <CardTitle className="text-center">Add New Server</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={url}>
          <Button
            variant="outline"
            size="lg"
            className="aspect-square h-20 w-20"
          >
            <PlusCircle className="h-10 w-10" />
            <span className="sr-only">Add Server</span>
          </Button>
        </Link>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Invite Intellicord to a new server
        </p>
      </CardFooter>
    </Card>
  );
}

function SkeletonGrid() {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <ServerSkeleton key={i} />
      ))}
    </>
  );
}

export const runtime = 'edge';