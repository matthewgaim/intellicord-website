import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthLink } from "./app/actions/landing";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    const authLink = await getAuthLink();
    return NextResponse.redirect(new URL(authLink, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
