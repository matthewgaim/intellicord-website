console.log("We're looking at main.ts!");

const hostname = window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://intellicord.senarado.com";

const scope = 'identify email guilds';
const DISCORD_CLIENT_ID = window.location.hostname === 'localhost'
    ? '1343462968142200932'
    : '1339021294234239028';
const DISCORD_REDIRECT_URI = `${hostname}/auth.html`;
const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(scope)}`;

window.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login");
    const addToServerBtn = document.getElementById("add-to-server");

    if (addToServerBtn instanceof HTMLAnchorElement) {
        addToServerBtn.href = authUrl;
    }
    if (loginBtn instanceof HTMLAnchorElement) {
        loginBtn.href = authUrl;
    }
});

