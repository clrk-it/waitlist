import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";

export default function AuthErrorPage() {
    return (
        <div className="relative min-h-dvh w-full flex flex-col items-center justify-center overflow-hidden overflow-x-hidden bg-neutral-950 font-sans">
            <BackgroundBeams className="opacity-40" />
            <div className="z-10 text-center space-y-6 p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl max-w-md mx-4">
                <h1 className="text-3xl font-bold text-red-500">Authentication Failed</h1>
                <p className="text-white/70">
                    The sign-in link is invalid or has expired. Please try requesting a new one.
                </p>
                <div className="pt-4">
                    <Link href="/login" className="inline-block px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
