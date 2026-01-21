import { createClient } from "@/lib/supabase-server";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { MivroLogo } from "@/components/ui/mivro-logo";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user || user.email !== "hasnainmn7@gmail.com") {
        redirect("/");
    }

    const { data: entries } = await supabase
        .from("waitlist_entries")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="relative min-h-screen w-full bg-neutral-950 font-sans selection:bg-amber-500/30">
            <BackgroundBeams className="opacity-30 fixed inset-0" />

            <div className="relative z-10 container mx-auto px-4 py-12">
                <header className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <MivroLogo className="text-3xl" />
                        <span className="text-white/40 text-sm border-l border-white/20 pl-4 py-1">Admin Dashboard</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-white text-sm font-medium">{user.email}</p>
                            <p className="text-amber-500 text-xs">Admin</p>
                        </div>
                        <form action="/auth/signout" method="post">
                            <button className="bg-white/5 hover:bg-white/10 text-white text-xs px-3 py-2 rounded-lg border border-white/10 transition-colors">
                                Sign Out
                            </button>
                        </form>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-black/40 border border-white/10 p-6 rounded-xl backdrop-blur-md">
                        <h3 className="text-white/50 text-sm uppercase tracking-wider mb-2">Total Signups</h3>
                        <p className="text-4xl font-bold text-white">{entries?.length || 0}</p>
                    </div>
                    <div className="bg-black/40 border border-white/10 p-6 rounded-xl backdrop-blur-md">
                        <h3 className="text-white/50 text-sm uppercase tracking-wider mb-2">Club Owners</h3>
                        <p className="text-4xl font-bold text-amber-500">
                            {entries?.filter(e => e.user_type === 'club_owner').length || 0}
                        </p>
                    </div>
                    <div className="bg-black/40 border border-white/10 p-6 rounded-xl backdrop-blur-md">
                        <h3 className="text-white/50 text-sm uppercase tracking-wider mb-2">Ventures</h3>
                        <p className="text-4xl font-bold text-green-500">
                            {entries?.filter(e => e.user_type === 'venture_owner').length || 0}
                        </p>
                    </div>
                </div>

                <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 text-white/60 font-medium border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4">Rank</th>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Details</th>
                                    <th className="px-6 py-4">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {entries?.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 font-mono text-amber-500/80">#{entry.rank || '-'}</td>
                                        <td className="px-6 py-4 text-white">
                                            <div className="font-medium">{entry.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${entry.user_type === 'club_owner' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                    entry.user_type === 'venture_owner' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                        entry.user_type === 'journalist' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                            'bg-white/5 text-white/50 border border-white/10'
                                                }`}>
                                                {entry.user_type.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-white/60 max-w-xs truncate">
                                            {entry.club && <span className="block text-white/80"><span className="text-white/40">Club:</span> {entry.club}</span>}
                                            {entry.venture_name && <span className="block text-white/80"><span className="text-white/40">Venture:</span> {entry.venture_name}</span>}
                                            <span title={entry.interest} className="block truncate mt-1">{entry.interest}</span>
                                        </td>
                                        <td className="px-6 py-4 text-white/40 whitespace-nowrap">
                                            {new Date(entry.created_at).toLocaleDateString()} <span className="text-white/20">{new Date(entry.created_at).toLocaleTimeString()}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
