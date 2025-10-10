import { NextRequest, NextResponse } from "next/server";

export function verifyAdminCredentials(
  username: string,
  password: string
): boolean {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  return username === adminUsername && password === adminPassword;
}

export function getAdminSession(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get("admin-session");
  return sessionCookie?.value === "authenticated";
}

export function setAdminSession(response: NextResponse): void {
  response.cookies.set("admin-session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export function clearAdminSession(response: NextResponse): void {
  response.cookies.set("admin-session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
  });
}
