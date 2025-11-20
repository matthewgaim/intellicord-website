const production = window.location.hostname !== "localhost";
const hostname = production
    ? "https://intellicord.senarado.com"
    : "http://localhost:5500/dist";
const DISCORD_CLIENT_ID = production
    ? '1339021294234239028'
    : '1343462968142200932';
const DISCORD_REDIRECT_URI = `${hostname}/auth.html`;
const API_URL = production
    ? 'https://intellicord-api.senarado.com'
    : 'http://localhost:8080';

const permissions = "8"; // Admin
const scopes = "bot applications.commands identify email guilds connections guilds.join";

const BOT_INVITE_URL = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=${permissions}&scope=${encodeURIComponent(scopes)}&response_type=code&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}`;

async function getServersInfo(){
    const res = await fetch(`${API_URL}/get-joined-servers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });

    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    console.log(data);
}

window.addEventListener("DOMContentLoaded", () => {
    const inviteBotButton = document.getElementById("invite-bot-button");
    inviteBotButton.href = BOT_INVITE_URL;

    getServersInfo();
});