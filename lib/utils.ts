import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDiscordAvatarUrl(userId: string, avatarHash?: string): string {
  if (!avatarHash) return "";
  const isAnimated = avatarHash?.startsWith("a_");
  const extension = isAnimated ? "gif" : "png";
  return encodeURI(`https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${extension}`);
}

export function getDiscordBannerURL(userId: string, bannerHash?: string): string {
  if (!bannerHash) return "";
  const isAnimated = bannerHash?.startsWith("a_");
  const extension = isAnimated ? "gif" : "png";
  return `https://cdn.discordapp.com/banners/${userId}/${bannerHash}.${extension}?size=1024`
}