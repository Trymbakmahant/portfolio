import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const isAuthenticated = getAdminSession(request);

  if (isAuthenticated) {
    return NextResponse.json({ authenticated: true });
  } else {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
