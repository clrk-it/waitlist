"use client";

import { Button } from "@/components/ui/button";
import { Users, ArrowRight, Newspaper, Rocket } from "lucide-react";
import Link from "next/link";
import { useWaitlistCount } from "@/hooks/use-waitlist-count";
import DecryptedText from "@/components/ui/decrypted-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { MivroLogo } from "@/components/ui/mivro-logo";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, type ComponentType } from "react";
import SplitTexts from "@/components/SplitText";
import RotatingText from "@/components/RotatingText";

export function WaitlistCard() {
  const { count, loading } = useWaitlistCount();
  const [selectedFeature, setSelectedFeature] = useState<{
    label: string;
    icon: ComponentType<{ className?: string }>;
    desc: string;
  } | null>(null);

  return (
    <>
      <motion.div
        // Render immediately on first paint; avoid “loading late” feel.
        initial={false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-3xl mx-auto"
      >
        {/* Glow effect behind card */}
        <div
          className="absolute -inset-1 rounded-3xl blur-xl opacity-30"
          style={{
            background:
              "linear-gradient(135deg, #fbbf24 0%, #c75b12 50%, #008542 100%)",
          }}
        />

        {/* Main card with glassmorphism */}
        <div className="relative z-50 w-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-4 sm:p-8 overflow-hidden">
          {/* Border beam effect */}
          <BorderBeam
            size={250}
            duration={15}
            colorFrom="#fbbf24"
            colorTo="#c75b12"
          />

          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

          {/* Mivro Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-3 sm:mb-4"
          >
            <MivroLogo className="text-2xl sm:text-4xl" />
          </motion.div>

          {/* Countdown Timer - Launching Feb 1, 2026 at 12am CST */}
          <div className="mb-4 sm:mb-5">
            <CountdownTimer
              targetDate={new Date("2026-02-01T00:00:00-06:00")}
            />
          </div>

          {/* Headline with DecryptedText effect */}
          <h1 className="mb-3 sm:mb-4 text-center text-2xl font-black tracking-tight text-white sm:text-4xl md:text-5xl font-display leading-[1.1]">
            {/* < DecryptedText
              text="The Campus Platform"
              animateOn="view"
              revealDirection="start"
              sequential
              useOriginalCharsOnly={true}
              speed={120}
              maxIterations={50}
              className="inline"
              encryptedClassName="inline"
              startDelayMs={0}
              respectReducedMotion={false}
            /> */}
            <SplitTexts
              text="The Campus Platform"
              className="inline"
            />
            <br className="sm:hidden" />
            <SplitTexts
                text="UTD Deserves"
                className="inline"
              />

          </h1>

          {/* Subtext */}
          {/* <p className="mb-4 sm:mb-6 text-center text-sm text-white/70 sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Mivro connects students, clubs, journalists, and student businesses
            in one unified platform.
          </p> */}
          <div className="mb-4 sm:mb-6 text-center text-sm text-white/70 sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Mivro connects{" "}
            <RotatingText
              texts={["students", "clubs", "journalists", "student businesses"]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-zinc-950 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />{" "}
            {/* <br/>
            in one unified platform. */}
          </div>

          {/* CTA Button - Enhanced with glow */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <Link href="/form">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                {/* Button glow */}
                <div
                  className="absolute -inset-1 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity"
                  style={{
                    background:
                      "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                  }}
                />
                <Button
                  size="lg"
                  className="relative px-6 py-4 text-base sm:px-8 sm:py-5 sm:text-lg font-bold rounded-xl border-0 transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                    color: "#09090b",
                    boxShadow:
                      "0 4px 20px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                >
                  Express Your Interest
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Features grid - horizontal row */}
          <div className="relative z-20 grid w-full max-w-md grid-cols-3 gap-2 sm:gap-4 mx-auto mb-4 sm:mb-5">
            {[
              {
                label: "Clubs",
                icon: Users,
                desc: "Discover and join a wide range of student organizations. Manage events, recruit members, and grow your community in one centralized hub.",
              },
              {
                label: "News",
                icon: Newspaper,
                desc: "Stay informed with the latest campus news, student journalism, and trending stories from around UTD. Never miss a beat.",
              },
              {
                label: "Ventures",
                icon: Rocket,
                desc: "Launch your startup or discover innovative student businesses. A dedicated platform for student entrepreneurs to showcase and thrive.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                onClick={() => {
                  setSelectedFeature(feature);
                }}
                className="min-w-0 flex flex-col items-center justify-center gap-1.5 px-2 py-2 sm:px-4 sm:py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-400/30 transition-all cursor-pointer group"
                style={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                <div className="p-1.5 sm:p-2 rounded-full bg-white/5 group-hover:bg-amber-400/10 transition-colors">
                  <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white/70 group-hover:text-amber-400 transition-colors" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-white/60 group-hover:text-white transition-colors">
                  {feature.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Contact Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center mb-3 sm:mb-5"
          >
            <Link href="/contact">
              <Button
                variant="link"
                className="text-white/40 hover:text-amber-400 transition-colors text-sm"
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>

          {/* Waitlist Counter */}
          {!loading && count > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-2 text-white/60"
            >
              <Users className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium">
                <span className="font-bold text-amber-400">
                  {count.toLocaleString()}+
                </span>{" "}
                already joined
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>

      <Dialog
        open={!!selectedFeature}
        onOpenChange={(open) => !open && setSelectedFeature(null)}
      >
        <DialogContent
          className="border border-white/10 bg-black/90 p-0 sm:max-w-lg overflow-hidden rounded-3xl"
          style={{
            boxShadow: `0 0 50px -12px #fbbf2440`,
          }}
        >
          {selectedFeature && (
            <div className="relative p-6 sm:p-10">
              {/* Background Gradient Effect */}
              <div
                className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: "#fbbf24" }}
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                <DialogHeader className="flex flex-col items-center space-y-0">
                  {/* Icon */}
                  <div
                    className="mb-6 rounded-2xl p-4 bg-white/5 border border-white/10"
                    style={{
                      boxShadow: `0 0 20px -5px #fbbf2430`,
                    }}
                  >
                    <selectedFeature.icon className="h-10 w-10 sm:h-12 sm:w-12 text-[#fbbf24]" />
                  </div>

                  <DialogTitle className="mb-4 text-2xl sm:text-4xl font-bold text-white tracking-tight font-display text-center">
                    {selectedFeature.label}
                  </DialogTitle>
                </DialogHeader>

                <DialogDescription className="text-base sm:text-lg text-white/70 leading-relaxed font-light text-center">
                  {selectedFeature.desc}
                </DialogDescription>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
