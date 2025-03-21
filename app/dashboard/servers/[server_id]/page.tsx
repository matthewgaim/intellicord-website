import {
  getAllowedChannels,
  getAllChannelsOfServer,
  saveChannelSelections,
} from "@/app/actions/servers-info";
import { ChannelSelector } from "@/components/channel-selector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ServerInfoPage({
  params,
}: {
  params: Promise<{ server_id: string }>;
}) {
  const server_id = (await params).server_id;
  const all_channels_of_server = await getAllChannelsOfServer(server_id);
  const allChannels =
    all_channels_of_server.all_channels?.map((channel) => ({
      id: channel.id,
      name: channel.name,
    })) || [];

  const allowedChannelsAndServerInfo = await getAllowedChannels(server_id);
  const server_info = allowedChannelsAndServerInfo.server_info;
  const allowedChannelIds = new Set(
    allowedChannelsAndServerInfo.allowed_channels
  );
  const preAllowedChannels = allChannels.filter((channel) =>
    allowedChannelIds.has(channel.id)
  );

  if (all_channels_of_server.error) {
    return (
      <div className="container py-10">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Failed to load server information. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-8 md:px-16 w-auto">
      <div className="flex items-center gap-2 pb-4">
        <Avatar className="h-16 w-16 rounded-full flex items-center justify-center">
          <AvatarImage
            src={`https://cdn.discordapp.com/icons/${server_id}/${server_info.icon}.webp`}
          />
          <AvatarFallback>{server_info.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{server_info.name}</h2>
          <p className="text-sm text-muted-foreground">
            {all_channels_of_server.all_channels?.length || 0} channels
            available
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Allowed Channels</CardTitle>
          <CardDescription>
            Select which channels you want the bot to reside in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChannelSelector
            channels={allChannels}
            preSelected={preAllowedChannels.map((channel) => channel.id)}
            serverId={server_id}
            saveAction={saveChannelSelections}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export const runtime = "edge";
