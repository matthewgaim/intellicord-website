import { getAllowedChannels, getServerInfo, saveChannelSelections } from "@/app/actions/servers-info"
import { ChannelSelector } from "@/components/channel-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ServerInfoPage({
  params,
}: {
  params: Promise<{ server_id: string }>
}) {
  const server_id = (await params).server_id
  const server_info = await getServerInfo(server_id)
  const allChannels = server_info.server?.map(channel => ({
    id: channel.id,
    name: channel.name
  })) || [];
  
  const allowedChannelIds = new Set(await getAllowedChannels(server_id));
  const preAllowedChannels = allChannels.filter(channel => allowedChannelIds.has(channel.id));

  if (server_info.error) {
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
    )
  }

  return (
    <div className="container py-8 max-w-5xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Server Settings</CardTitle>
          <CardDescription>Configure which channels you want to view and interact with</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-semibold text-primary">{server_info.server?.[0]?.name?.[0] || "S"}</span>
            </div>
            <div>
              <h2 className="font-semibold">Server ID: {server_id}</h2>
              <p className="text-sm text-muted-foreground">{server_info.server?.length || 0} channels available</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Channel Management</CardTitle>
          <CardDescription>
            Select which channels you want to include. You can select multiple channels.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <ChannelSelector
          channels={allChannels}
          preSelected={preAllowedChannels.map(channel => channel.id)}
          serverId={server_id}
          saveAction={saveChannelSelections}
        />
        </CardContent>
      </Card>
    </div>
  )
}

