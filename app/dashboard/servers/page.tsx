import { Suspense } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { PlusCircle, Server, Users, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getBotInviteUrl,
  getJoinedServers,
} from "@/app/actions/dashboard-info";
import ServerSkeleton from "./skeleton";
import Image from "next/image";
import DiscordBoost from "@/public/DiscordBoost.png";
import * as motion from "motion/react-client";

type ServerInfo = {
  id: number;
  discord_server_id: string;
  joined_at: string;
  name: string;
  member_count: number;
  online_count?: number;
  icon: string;
  premium_tier?: number;
  banner: string;
};

export default async function ServersPage() {
  const servers = await getJoinedServers();

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Your Servers</h2>
          <AddServerButton />
        </div>
        <p className="text-muted-foreground">
          Manage your Discord servers where Intellicord is active
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Suspense fallback={<SkeletonGrid />}>
          {servers?.map((server: ServerInfo) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}

function ServerCard({ server }: { server: ServerInfo }) {
  const joinedDate = new Date(server.joined_at);
  const timeAgo = formatDistanceToNow(joinedDate, { addSuffix: true });

  const isRecent = Date.now() - joinedDate.getTime() < 7 * 24 * 60 * 60 * 1000;
  const isBoosted = server.premium_tier && server.premium_tier > 0;

  const onlineCount = server.online_count || 0;
  const bannerOrGradient =
    server.banner?.length > 0
      ? { backgroundImage: `url(${server.banner})`, backgroundSize: "cover" }
      : { backgroundImage: "linear-gradient(to right, #93c5fd, #60a5fa)" };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
    >
      <div className="relative h-24" style={bannerOrGradient}>
        <div className="absolute -bottom-8 left-4">
          <Avatar className="h-16 w-16 rounded-full border-4 border-background shadow-md">
            <AvatarImage src={server.icon} alt={server.name} />
            <AvatarFallback className="bg-primary text-xl font-semibold text-primary-foreground">
              {server.name[0] || "S"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute right-3 top-3">
          <Badge
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm"
          >
            <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500" />
            Active
          </Badge>
        </div>
        {isBoosted ? (
          <div className="absolute left-3 top-3">
            <Image
              src={DiscordBoost}
              className="h-8 w-8"
              alt="Discord Boosted"
            />
          </div>
        ) : null}
      </div>
      <div className="p-4 pt-10">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold truncate text-lg pr-2">
              {server.name}
            </h3>
            {isRecent && (
              <Badge
                variant="outline"
                className="text-xs bg-blue-500/10 text-blue-500 border-blue-500/20"
              >
                New
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Joined {timeAgo}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 rounded-md bg-muted p-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Online</p>
              <p className="font-medium">{onlineCount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            asChild
          >
            <Link href={`/dashboard/servers/${server.discord_server_id}`}>
              <Settings className="mr-2 h-4 w-4" />
              Manage
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-2 hover:border-blue-500"
          >
            <Link
              href={`https://discord.com/channels/${server.discord_server_id}`}
              target="_blank"
            >
              <Server className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

async function AddServerButton() {
  const url = await getBotInviteUrl();

  return (
    <Link href={url} target="_blank">
      <Button className="gap-2">
        <PlusCircle className="h-4 w-4" />
        Add to Server
      </Button>
    </Link>
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

export const runtime = "edge";
