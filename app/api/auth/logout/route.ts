import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete("discord_avatar");
    cookieStore.delete("discord_user_id");
    cookieStore.delete("discord_username");
    redirect("/")
}

export const runtime = 'edge';