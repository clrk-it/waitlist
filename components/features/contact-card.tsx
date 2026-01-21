"use client";

import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MivroLogo } from "@/components/ui/mivro-logo";
import { BorderBeam } from "@/components/ui/border-beam";

// Custom social icons as SVG components
const DiscordIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
);

const socialLinks = [
    { name: "Discord", icon: DiscordIcon, href: "https://discord.gg/rQ8mUD64j6", color: "#5865F2" },
    { name: "TikTok", icon: TikTokIcon, href: "https://tiktok.com/@utd_mivro", color: "#ff0050", label: "@utd_mivro" },
    { name: "Instagram", icon: InstagramIcon, href: "https://instagram.com/utd_mivro", color: "#E4405F", label: "@utd_mivro" },
    { name: "Email", icon: Mail, href: "mailto:support@mivro.org", color: "#fbbf24" },
];

export function ContactCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full"
        >
            {/* Glow effect behind card */}
            <div
                className="absolute -inset-1 rounded-3xl blur-xl opacity-30"
                style={{
                    background: "linear-gradient(135deg, #fbbf24 0%, #c75b12 50%, #008542 100%)"
                }}
            />

            {/* Main card */}
            <div className="relative w-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 sm:p-10 overflow-hidden">
                <BorderBeam size={200} duration={15} colorFrom="#fbbf24" colorTo="#c75b12" />

                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm">Back</span>
                </Link>

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <MivroLogo className="text-4xl sm:text-5xl" />
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2 font-display">
                    Get in Touch
                </h1>
                <p className="text-center text-white/60 mb-8">
                    Follow us on social media or drop us a message
                </p>

                {/* Social Links Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {socialLinks.map((social, i) => (
                        <motion.a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                            style={{
                                boxShadow: `0 0 0 0 ${social.color}00`
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = `0 0 20px ${social.color}40`;
                                e.currentTarget.style.borderColor = `${social.color}50`;
                                e.currentTarget.style.backgroundColor = `${social.color}10`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = `0 0 0 0 ${social.color}00`;
                                e.currentTarget.style.borderColor = `rgba(255,255,255,0.1)`;
                                e.currentTarget.style.backgroundColor = `rgba(255,255,255,0.05)`;
                            }}
                        >
                            <social.icon className="h-8 w-8 text-white/70 group-hover:text-white transition-colors" />
                            <div className="flex flex-col items-center">
                                <span className="text-xs font-bold text-white/80 group-hover:text-white transition-colors uppercase tracking-wider">
                                    {social.name}
                                </span>
                                {social.label && (
                                    <span className="text-[10px] text-white/40 mt-1">{social.label}</span>
                                )}
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Email CTA */}
                <motion.a
                    href="mailto:support@mivro.org"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-white font-bold text-lg transition-all border border-amber-500/50"
                    style={{
                        background: "linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(199, 91, 18, 0.2) 100%)",
                        boxShadow: "0 4px 20px rgba(251, 191, 36, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                    }}
                >
                    <Mail className="h-5 w-5" />
                    support@mivro.org
                </motion.a>
            </div>
        </motion.div>
    );
}
