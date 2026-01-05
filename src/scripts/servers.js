const production = window.location.hostname !== "localhost";
const hostname = production
    ? "https://intellicord.senarado.com"
    : "http://localhost:3000";
const DISCORD_CLIENT_ID = production
    ? '1339021294234239028'
    : '1343462968142200932';
const DISCORD_REDIRECT_URI = `${hostname}/auth`;
const API_URL = production
    ? 'https://intellicord-api.senarado.com'
    : 'http://localhost:8080';

const permissions = "8"; // Admin
const scopes = "bot applications.commands identify email guilds connections guilds.join";

const BOT_INVITE_URL = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=${permissions}&scope=${encodeURIComponent(scopes)}&response_type=code&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}`;

async function getServersInfo(){
    let servers_data = [];
    try {
        const res = await fetch(`${API_URL}/get-joined-servers`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        if (!res.ok) throw new Error("Login failed");
        servers_data = await res.json();
        console.log(servers_data);
    } catch (err) {
        console.error(err);
    }

    const serversContainer = document.getElementById('servers-container');
    const emptyState = document.getElementById('empty-state');

    serversContainer.innerHTML = '';

    if (!servers_data || servers_data.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }    
    emptyState.classList.add('hidden');

    let totalMembers = 0;
    let activeServers = 0;

    servers_data.forEach(server => {
        totalMembers += server.member_count;
        activeServers += 1;

        const server_icon = server.icon || './public/assets/images/intellicord_logo.png';
        const server_name = server.name;
        const server_member_count = server.member_count.toLocaleString();
        const server_online_count = server.online_count.toLocaleString();
        const server_joined_date = new Date(server.joined_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
        const server_link = `https://discord.com/channels/${server.discord_server_id}`;
        const bannerOrGradient = server.banner?.length > 0
            ? `bg-[url(${server.banner})] bg-cover bg-center`
            : "bg-amber-600";

        const newCard = document.createElement("div");
        newCard.setAttribute("class", "bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300");
        const cardContent = `
            <div class="${bannerOrGradient} h-16 flex items-center px-6">
                <img class="w-10 h-10 rounded-full mr-4 object-cover" src="${server_icon}" alt="Server Icon"/>
                <h3 class="text-xl font-bold text-white truncate">${server_name}</h3>
            </div>
            <div class="p-6">
                <div class="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                        <p class="text-gray-500">Members</p>
                        <p class="font-semibold text-gray-900">${server_member_count}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Online</p>
                        <p class="font-semibold text-gray-900">${server_online_count}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Joined Intellicord</p>
                        <p class="font-semibold text-gray-900">${server_joined_date}</p>
                    </div>
                </div>
            </div>
        `;
        newCard.innerHTML = cardContent;
        serversContainer.appendChild(newCard);
    });

    document.getElementById('total-servers').textContent = servers_data.length.toLocaleString();
    document.getElementById('total-members').textContent = totalMembers.toLocaleString();
}

window.addEventListener("DOMContentLoaded", () => {
    const inviteBotButton = document.getElementById("invite-bot-button");
    inviteBotButton.href = BOT_INVITE_URL;

    getServersInfo();
});