"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getClientStripeSecret(price_id: string) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("token")?.value;
  const discord_id = cookieStore.get("discord_user_id")?.value;
  const { API_URL } = process.env;

  return fetch(`${API_URL}/create-checkout-session?price_id=${price_id}&discord_id=${discord_id}`, {
    method: "POST",
    headers: { 'Authorization': `Bearer ${access_token}` },
  })
    .then((res) => res.json())
    .then((data) => data.clientSecret)
    .catch(() => redirect('/dashboard/profile'));
}

export async function getSessionStatus(sessionId: string | null) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("token")?.value;
  const { API_URL } = process.env;
  return fetch(`${API_URL}/session-status?session_id=${sessionId}`, {
    headers: { 'Authorization': `Bearer ${access_token}` },
  }).then((res) => res.json());
}