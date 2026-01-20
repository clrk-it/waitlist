"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { MivroLogo } from "@/components/ui/mivro-logo";
import { Loader2 } from "lucide-react";

export default function SetupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-neutral-950 font-sans text-white">
            <BackgroundBeams className="opacity-40" />
            <div className="z-10 w-full max-w-md p-8 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl">
                <MivroLogo className="text-4xl mx-auto mb-6" />
                <h1 className="text-xl font-bold text-center mb-6">Admin Setup</h1>

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-2"
                    />
                    <input
                        type="password"
                        placeholder="New Password (for Sign Up)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-2"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={handleSignUp}
                            disabled={loading}
                            className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded font-bold"
                        >
                            Create Account
                        </button>
                        <button
                            onClick={handleReset}
                            disabled={loading}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded font-bold"
                        >
                            Reset Password
                        </button>
                    </div>

                    {message && (
                        <p className="text-center text-sm p-2 bg-white/10 rounded border border-white/20 mt-4">
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
