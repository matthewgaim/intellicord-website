"use server";

import { cookies } from "next/headers";

export async function getBotInviteUrl() {
  const { DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI } = process.env;

  if (!DISCORD_CLIENT_ID || !DISCORD_REDIRECT_URI) {
    throw new Error("Missing environment variables");
  }

  const permissions = "8"; // Admin
  const scopes = "bot applications.commands identify email guilds connections guilds.join";

  return `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=${permissions}&scope=${encodeURIComponent(scopes)}&response_type=code&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}`;
}

export async function getJoinedServers(){
  const { API_URL } = process.env;
  const cookieStore = await cookies();
  const access_token = cookieStore.get("token")?.value;
  const user_id = cookieStore.get("discord_user_id")?.value;
  const userInfoResponse = await fetch(`${API_URL}/get-joined-servers?user_id=${user_id}`, {
      method: "GET",
      headers: {'Authorization': `Bearer ${access_token}`}
  });
  const userInfo = await userInfoResponse.json();
  return userInfo
}

export async function getDashboardInfo(){
  const { API_URL } = process.env;
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("token")?.value;
    const user_id = cookieStore.get("discord_user_id")?.value;
    const res = await fetch(`${API_URL}/analytics/files-all-servers?user_id=${user_id}`, {
        method: "GET",
        headers: {'Authorization': `Bearer ${access_token}`}
    });
    const userInfo = await res.json();
    return {info: userInfo, error: null}
  } catch (error) {
    if (error instanceof Error) {
      return {info: null, error: error.message}
    } else {
      return {info: null, error: "Unknown error"}
    }
  }
}

export async function getDiscordProfileInfo(){
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const discord_user_id = cookieStore.get("discord_user_id")?.value;
  if (!token) {
    return { user: null, error: 'Unauthorized' };
  }
  if(!discord_user_id) {
    return {user: null, error: "discord_user_id not in cookies"}
  }

  try {
    const response = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log(await response.text())
      throw new Error('Failed to fetch user information');
    }

    const resp = await response.json();
    return {user: resp, error: null}
  } catch (error) {
    return { user: null, error: error };
  }
}

interface DBUserInfo {
  price_id: string;
  plan: string;
  joined_at: Date;
}
export async function getDBUserInfo(){
  const { API_URL } = process.env;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const discord_user_id = cookieStore.get("discord_user_id")?.value;
  if (!token) {
    return { user: null, error: 'Unauthorized' };
  }
  if(!discord_user_id) {
    return {user: null, error: "discord_user_id not in cookies"}
  }

  try {
    const response = await fetch(`${API_URL}/get-user-info?user_id=${discord_user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log(await response.text())
      throw new Error('Failed to fetch user information');
    }

    const resp: DBUserInfo = await response.json();
    return {user: resp, error: null}
  } catch (error) {
    return { user: null, error: error };
  }
}