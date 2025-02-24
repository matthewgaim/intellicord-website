import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const cookie_token = req.cookies.get("token");
    const access_token = cookie_token?.value;
    const userInfoResponse = await fetch("https://discord.com/api/oauth2/@me", {
        method: "GET",
        headers: {'Authorization': `Bearer ${access_token}`}
    });
    const userInfo = await userInfoResponse.json();
    NextResponse.json(userInfo);
}