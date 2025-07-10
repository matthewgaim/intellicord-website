# Intellicord Website

The official website for the Intellicord Discord bot.

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:
```bash
git clone https://github.com/matthewgaim/intellicord-website.git
cd intellicord-website
```

2. Install dependencies:
```bash
npm install
```

3. Environment Variables

| Variable | Description |
|----------|-------------|
| `DISCORD_CLIENT_ID` | Your Discord application's client ID |
| `DISCORD_CLIENT_SECRET` | Your Discord application's client secret |
| `DISCORD_REDIRECT_URI` | OAuth2 redirect URI for Discord authentication |
| `DISCORD_BOT_TOKEN` | Token for your Discord bot |
| `API_URL` | URL to where your [Intellicord Discord bot](https://github.com/matthewgaim/intellicord) is hosted |

## Development

To start the development server:
```bash
npm run dev
```

## Deployment

To build and deploy the website:
```bash
npm run deploy
```