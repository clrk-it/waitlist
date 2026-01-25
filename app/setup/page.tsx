"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { MivroLogo } from "@/components/ui/mivro-logo";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SetupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
    );

    const handleSignUp = async () => {
        setLoading(true);
        setMessage("");
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) setMessage("Error: " + error.message);
        else setMessage("Success! Check your email to confirm sign up.");
        setLoading(false);
    };

    const handleReset = async () => {
        setLoading(true);
        setMessage("");
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/update-password`,
        });
        if (error) setMessage("Error: " + error.message);
        else setMessage("Password reset email sent! Check your inbox.");
        setLoading(false);
    };

    return (
        <MarketingShell maxWidth="md">
            <GlassCard contentClassName="p-8 sm:p-10">
                <MivroLogo className="text-3xl sm:text-4xl mx-auto mb-4" />
                <h1 className="text-xl sm:text-2xl font-bold text-center mb-6 text-white font-display tracking-tight">
                    Admin Setup
                </h1>

                <div className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-lg"
                    />
                    <Input
                        type="password"
                        placeholder="New Password (for Sign Up)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-lg"
                    />

                    <div className="flex gap-2">
                        <Button
                            onClick={handleSignUp}
                            disabled={loading}
                            className="flex-1 font-bold"
                        >
                            Create Account
                        </Button>
                        <Button
                            onClick={handleReset}
                            disabled={loading}
                            variant="outline"
                            className="flex-1 font-bold"
                        >
                            Reset Password
                        </Button>
                    </div>

                    {message && (
                        <p className="text-center text-sm p-3 bg-white/5 rounded-lg border border-white/10 text-white/70 mt-4">
                            {message}
                        </p>
                    )}
                </div>
            </GlassCard>
        </MarketingShell>
    );
}
