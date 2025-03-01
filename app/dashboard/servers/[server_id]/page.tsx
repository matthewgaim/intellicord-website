import { getServerInfo } from "@/app/actions/servers-info"
import { ChannelSelector } from "@/components/channel-selector"

export default async function ServerInfoPage({
  params,
}: {
  params: Promise<{ server_id: string }>
}) {
  const server_id = (await params).server_id
  const server_info = await getServerInfo(server_id)

  if (server_info.error) return <h1>Error loading server info</h1>

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Server ID: {server_id}</h1>
        <p className="text-muted-foreground">Select the channels you want to view</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Channels</h2>
        <ChannelSelector channels={server_info.server || []} />
      </div>
    </div>
  )
}

export const runtime = "edge";
