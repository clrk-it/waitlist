"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
    );

    const handleUpdate = async () => {
        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password });
        if (error) {
            setMessage("Error: " + error.message);
        } else {
            setMessage("Password updated! Redirecting to login...");
            setTimeout(() => router.push("/login"), 2000);
        }
        setLoading(false);
    };

    return (
        <MarketingShell maxWidth="md">
            <GlassCard contentClassName="p-8 sm:p-10">
                <h1 className="text-xl sm:text-2xl font-bold text-center mb-6 text-white font-display tracking-tight">
                    Set New Password
                </h1>
                <Input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-lg mb-4"
                />
                <Button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="w-full font-bold"
                >
                    Update Password
                </Button>
                {message && (
                    <p className="mt-4 text-center text-sm text-white/70">{message}</p>
                )}
            </GlassCard>
        </MarketingShell>
    );
}
