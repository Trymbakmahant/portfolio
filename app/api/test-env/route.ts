import { NextResponse } from "next/server";

export async function GET() {
  const envCheck = {
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    hasAdminUsername: !!process.env.ADMIN_USERNAME,
    hasAdminPassword: !!process.env.ADMIN_PASSWORD,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + "...",
  };

  return NextResponse.json(envCheck);
}
