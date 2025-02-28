import { NextRequest, NextResponse } from "next/server";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const code = req.nextUrl.searchParams.get("code");
  const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI, API_URL } = process.env;
  console.log(code)
  if (!code) {
    return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 });
  }
  if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET || !DISCORD_REDIRECT_URI || !API_URL) {
    return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
  }

  try {
    const formData = new URLSearchParams();
    formData.append("client_id", DISCORD_CLIENT_ID);
    formData.append("client_secret", DISCORD_CLIENT_SECRET);
    formData.append("grant_type", "authorization_code");
    formData.append("code", code);
    formData.append("redirect_uri", DISCORD_REDIRECT_URI);

    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const responseText = await tokenResponse.text();
    if (!tokenResponse.ok) {
      const errorData = JSON.parse(responseText);
      return NextResponse.json({ 
        error: "Failed to fetch access token",
        details: errorData
      }, { status: 500 });
    }

    const { access_token } = JSON.parse(responseText);
    const userInfoResponse = await fetch("https://discord.com/api/oauth2/@me", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    const userInfo = await userInfoResponse.json();
    const uid: string = userInfo.user.id;
    const name: string = userInfo.user.global_name;
    const avatarHash: string = userInfo.user.avatar;
    const profilePic = getDiscordAvatarUrl(uid, avatarHash);
    console.log(`${name} logged in (${uid})`)
    // Add to DB
    await fetch(`${API_URL}/adduser`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          user_id: uid
      })
    })
    
    cookieStore.set("token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    cookieStore.set("discord_user_id", uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    cookieStore.set("discord_avatar", profilePic, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
  } catch (error) {
    console.error("Error during Discord OAuth2 callback:", error);
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  } finally {
    const dashboardUrl = new URL('/dashboard', req.url);
    redirect(dashboardUrl.toString());
  }
}

function getDiscordAvatarUrl(userId: string, avatarHash: string): string {
  const isAnimated = avatarHash.startsWith("a_");
  const extension = isAnimated ? "gif" : "png";
  return encodeURI(`https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${extension}`);
}

export const runtime = 'edge';