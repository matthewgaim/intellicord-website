"use server";
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

export async function getServerInfo(server_id: string){
    const {DISCORD_BOT_TOKEN} = process.env;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return { server: null, error: 'Unauthorized' };
  }
  if(!server_id) {
    return {server: null, error: "discord_user_id not in cookies"}
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
    return {server: filtered, error: null}
  } catch (error) {
    return { server: null, error: error };
  }
}