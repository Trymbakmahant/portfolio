import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials, setAdminSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    if (verifyAdminCredentials(username, password)) {
      const response = NextResponse.json({ success: true });
      setAdminSession(response);
      return response;
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
