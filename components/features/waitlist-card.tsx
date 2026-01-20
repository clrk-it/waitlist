"use client";

import { Button } from "@/components/ui/button";
import { Users, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useWaitlistCount } from "@/hooks/use-waitlist-count";
import { DecryptedText } from "@/components/ui/decrypted-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { MivroLogo } from "@/components/ui/mivro-logo";
import { motion } from "framer-motion";

export function WaitlistCard() {
  const { count, loading } = useWaitlistCount();

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

      {/* Main card with glassmorphism */}
      <div className="relative w-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 sm:p-10 md:p-14 overflow-hidden">
        {/* Border beam effect */}
        <BorderBeam size={250} duration={15} colorFrom="#fbbf24" colorTo="#c75b12" />

        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

        {/* Mivro Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <MivroLogo className="text-4xl sm:text-5xl" />
        </motion.div>

        {/* Early Access Badge - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center mb-8"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border border-amber-400/30 backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0.05) 100%)",
              color: "#fbbf24",
              boxShadow: "0 0 20px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            }}
          >
            <Sparkles className="h-4 w-4" />
            Early Access
          </div>
        </motion.div>

        {/* Headline with DecryptedText effect */}
        <h1 className="mb-6 text-center text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.1]">
          <DecryptedText
            text="The Campus Platform"
            speed={35}
            maxIterations={8}
            sequential={false}
            className="block"
          />
          <span
            className="block mt-2"
            style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            <DecryptedText
              text="UTD Deserves"
              speed={35}
              maxIterations={10}
              sequential={false}
              className="inline"
            />
          </span>
        </h1>

        {/* Subtext */}
        <p className="mb-12 text-center text-lg text-white/70 sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
          Mivro connects students, clubs, journalists, and student businesses in one unified platform.
        </p>

        {/* CTA Button - Enhanced with glow */}
        <div className="flex justify-center mb-8">
          <Link href="/form">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              {/* Button glow */}
              <div
                className="absolute -inset-1 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity"
                style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)" }}
              />
              <Button
                size="lg"
                className="relative px-10 py-7 text-xl font-bold rounded-xl border-0 transition-all"
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                  color: "#09090b",
                  boxShadow: "0 4px 20px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                }}
              >
                Express Your Interest
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* Features grid - horizontal row */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-8">
          {[
            { label: "Clubs" },
            { label: "News" },
            { label: "Ventures" },
          ].map((feature, i) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex flex-col items-center gap-2 px-5 py-4 rounded-xl bg-white/5 border border-white/10"
            >
              <span className="text-sm font-medium text-white/80">{feature.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Waitlist Counter */}
        {!loading && count > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-3 text-white/60"
          >
            <Users className="h-5 w-5 text-amber-400" />
            <span className="text-base font-medium">
              <span className="font-bold text-amber-400">
                {count.toLocaleString()}+
              </span>{" "}
              already joined
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
