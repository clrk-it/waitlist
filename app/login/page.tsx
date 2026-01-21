import { BackgroundBeams } from "@/components/ui/background-beams";
import { MivroLogo } from "@/components/ui/mivro-logo";
import { login } from "./actions";

// Helper component to display error params
function ErrorMessage({ error }: { error: string }) {
    return (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center text-sm text-red-200">
            {decodeURIComponent(error)}
        </div>
    );
}

export default function LoginPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const error = typeof searchParams.error === "string" ? searchParams.error : undefined;

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-neutral-950 font-sans selection:bg-amber-500/30">
            <BackgroundBeams className="opacity-40" />

            <div className="z-10 w-full max-w-md px-8">
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-center mb-8">
                        <MivroLogo className="text-4xl" />
                    </div>

                    <h1 className="text-2xl font-bold text-center text-white mb-6">Admin Access</h1>

                    <form action={login} className="space-y-4">
                        <div>
                            <label className="text-xs text-white/50 uppercase font-bold tracking-wider mb-2 block">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="admin@mivro.org"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-xs text-white/50 uppercase font-bold tracking-wider mb-2 block">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition-colors"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
                        >
                            Sign In
                        </button>
                    </form>

                    {error && <ErrorMessage error={error} />}
                </div>
            </div>
        </div>
    );
}
