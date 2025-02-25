"use server";

import { cookies } from "next/headers";

export async function getBotInviteUrl() {
  const { DISCORD_CLIENT_ID } = process.env;

  if (!DISCORD_CLIENT_ID) {
    throw new Error("Missing DISCORD_CLIENT_ID in environment variables");
  }

  const permissions = "8"; // Admin
  const scopes = "bot applications.commands identify email guilds connections guilds.join";

  return `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=${permissions}&scope=${encodeURIComponent(scopes)}`;
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