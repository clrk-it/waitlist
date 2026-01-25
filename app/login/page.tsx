import { MivroLogo } from "@/components/ui/mivro-logo";
import { login } from "./actions";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        <MarketingShell maxWidth="md">
            <GlassCard contentClassName="p-8 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-center mb-6">
                    <MivroLogo className="text-3xl sm:text-4xl" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6 font-display tracking-tight">
                    Admin Access
                </h1>

                <form action={login} className="space-y-4">
                    <div>
                        <label className="text-xs text-white/50 uppercase font-bold tracking-wider mb-2 block">
                            Email
                        </label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="admin@mivro.org"
                            required
                            className="rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-white/50 uppercase font-bold tracking-wider mb-2 block">
                            Password
                        </label>
                        <Input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            className="rounded-lg"
                        />
                    </div>

                    <Button type="submit" className="w-full font-bold mt-2">
                        Sign In
                    </Button>
                </form>

                {error && <ErrorMessage error={error} />}
            </GlassCard>
        </MarketingShell>
    );
}
