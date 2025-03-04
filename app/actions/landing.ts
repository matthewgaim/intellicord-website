
export async function getAuthLink() {
    const { DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI } = process.env;

    if (!DISCORD_CLIENT_ID || !DISCORD_REDIRECT_URI) {
        return "BROKEN_LINK";
    }

    const scope = 'identify email guilds';
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${encodeURIComponent(DISCORD_CLIENT_ID)}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(scope)}`;
    return authUrl;
}