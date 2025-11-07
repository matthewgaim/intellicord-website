const hostname = window.location.hostname === "localhost"
    ? "http://localhost:5500"
    : "https://intellicord.senarado.com";
const DISCORD_CLIENT_ID = window.location.hostname === 'localhost'
    ? '1343462968142200932'
    : '1339021294234239028';
const DISCORD_REDIRECT_URI = `${hostname}/auth.html`;
const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5500'
    : 'https://intellicord-api.senarado.com';

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