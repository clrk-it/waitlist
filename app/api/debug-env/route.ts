import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json({
        supabaseUrlConfigured: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKeyConfigured: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        resendKeyConfigured: !!process.env.RESEND_API_KEY,
        nodeEnv: process.env.NODE_ENV,
        // Do not return actual values for security
    });
}
