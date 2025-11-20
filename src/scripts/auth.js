const production = window.location.hostname !== "localhost";
const hostname = production
    ? "https://intellicord.senarado.com"
    : "http://localhost:5500/dist";
const API_URL = production
    ? 'https://intellicord-api.senarado.com'
    : 'http://localhost:8080';

async function handleDiscordCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) {
        window.location.href = "/";
        return;
    }
    
    try {
        const res = await fetch(`${API_URL}/adduser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
            credentials: "include"
        });

        if (!res.ok) throw new Error("Login failed");
        const data = await res.json();

        console.log("Logged in as:", data);
        window.location.href = `${hostname}/dashboard.html`;
    } catch (err) {
        console.error(err);
        window.location.href = `${hostname}/`;
    }
}

handleDiscordCallback();
