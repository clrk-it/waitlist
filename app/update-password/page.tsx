"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useRouter } from "next/navigation";

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
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-neutral-950 font-sans text-white">
            <BackgroundBeams className="opacity-40" />
            <div className="z-10 w-full max-w-md p-8 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl">
                <h1 className="text-xl font-bold text-center mb-6">Set New Password</h1>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 mb-4"
                />
                <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-600 py-2 rounded font-bold text-black"
                >
                    Update Password
                </button>
                {message && <p className="mt-4 text-center text-sm">{message}</p>}
            </div>
        </div>
    );
}
