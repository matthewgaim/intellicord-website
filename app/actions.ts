"use server";

export async function getBotInviteUrl() {
  const { DISCORD_CLIENT_ID } = process.env;

  if (!DISCORD_CLIENT_ID) {
    throw new Error("Missing DISCORD_CLIENT_ID in environment variables");
  }

  const permissions = "8"; // Admin
  const scopes = "bot applications.commands identify email guilds connections guilds.join";

  return `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=${permissions}&scope=${encodeURIComponent(scopes)}`;
}
