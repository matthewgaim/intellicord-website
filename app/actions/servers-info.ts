"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ChannelInfo = {
  id: string,
  type: number,
  last_message_id: string,
  flags: number,
  guild_id: string,
  name: string,
  parent_id: string,
  rate_limit_per_user: number,
  topic?: string,
  position?: number,
  permission_overwrites?: unknown[],
  nsfw: boolean
}

export async function getAllChannelsOfServer(server_id: string){
  const {DISCORD_BOT_TOKEN} = process.env;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return { all_channels: null, error: 'Unauthorized' };
  }
  if(!server_id) {
    return {all_channels: null, error: "discord_user_id not in cookies"}
  }

  try {
    const response = await fetch(`https://discord.com/api/guilds/${server_id}/channels`, {
        method: "GET",
        headers: {
            'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
        }
    });

    if (!response.ok) {
      console.log(await response.text())
      throw new Error('Failed to fetch user information');
    }

    const resp: ChannelInfo[] = await response.json();
    const filtered = resp.filter((val) => val.type === 0) // only text channels
    return {all_channels: filtered, error: null}
  } catch (error) {
    return { all_channels: null, error: error };
  }
}

export async function saveChannelSelections(serverId: string, channelIds: string[]){
    const { API_URL } = process.env;
    const cookieStore = await cookies();
    const user_id = cookieStore.get("discord_user_id")?.value;
    if (!user_id) return { success: false, message: "Cookies missing" }

    const postData = {
      user_id: user_id,
      server_id: serverId,
      channel_ids: channelIds
    }
    const res = await fetch(`${API_URL}/update-allowed-channels`, {
        method: "POST",
        body: JSON.stringify(postData)
    });
    if (!res.ok) return { success: false, message: "false" }
    revalidatePath(`/dashboard/servers/${serverId}`)
    return {success: true, message: "true"}
}

export async function getAllowedChannels(serverId: string) {
  const { API_URL } = process.env;
  const res = await fetch(`${API_URL}/get-allowed-channels?server_id=${serverId}`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
}