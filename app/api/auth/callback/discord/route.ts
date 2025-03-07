import { NextRequest } from "next/server";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const code = req.nextUrl.searchParams.get("code");
  const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI, API_URL } = process.env;
  let redirectTo = "/dashboard";
  try {
    if (!code) {
      throw new Error("Authorization code is missing");
    }
    if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET || !DISCORD_REDIRECT_URI || !API_URL) {
      throw new Error("Missing environment variables")
    }
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
      throw new Error(errorData)
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
    const full_discord_username: string = `${userInfo.user.username}#${userInfo.user.discriminator}`
    const profilePic = getDiscordAvatarUrl(uid, avatarHash);
    console.log(`${name} logged in (${uid})`)
    // Add to DB
    await fetch(`${API_URL}/adduser`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({
          user_id: uid,
          username: full_discord_username
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
    cookieStore.set("discord_username", name, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
  } catch (error) {
    console.error("Error: ",error instanceof Error ? error.message : String(error));
    redirectTo = "/";
  }
  redirect(redirectTo)
}

function getDiscordAvatarUrl(userId: string, avatarHash: string): string {
  const isAnimated = avatarHash.startsWith("a_");
  const extension = isAnimated ? "gif" : "png";
  return encodeURI(`https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${extension}`);
}

export const runtime = 'edge';