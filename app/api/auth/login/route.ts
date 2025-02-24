import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET() {
  const { DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI } = process.env;

  if (!DISCORD_CLIENT_ID || !DISCORD_REDIRECT_URI) {
    return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
  }

  const scope = 'identify email guilds';
  const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${encodeURIComponent(DISCORD_CLIENT_ID)}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(scope)}`;

  redirect(authUrl);
}

export const runtime = 'edge';