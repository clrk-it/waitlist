"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface CountdownTimerProps {
    targetDate?: Date;
}

const DEFAULT_TARGET_DATE = new Date("2026-01-25T00:00:00-06:00");

function getTimeLeft(target: Date) {
    const difference = target.getTime() - Date.now();

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const target = targetDate ?? DEFAULT_TARGET_DATE;
    const [timeLeft, setTimeLeft] = useState(() => ({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    }));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft(target));
        }, 1000);

        const initialTimer = setTimeout(() => {
            setTimeLeft(getTimeLeft(target));
        }, 0);

        return () => {
            clearInterval(timer);
            clearTimeout(initialTimer);
        };
    }, [target]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4"
        >
            {/* Badge */}
            <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                    background: "linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(199, 91, 18, 0.15) 100%)",
                    border: "1px solid rgba(251, 191, 36, 0.4)",
                    color: "#fbbf24",
                    boxShadow: "0 0 25px rgba(251, 191, 36, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                }}
            >
                <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                    <Zap className="h-4 w-4 fill-current" />
                </motion.div>
                <span>Launching Soon</span>
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-amber-400"
                />
            </div>

            {/* Countdown */}
            <div className="flex items-start gap-3 sm:gap-4 mt-2">
                <TimeBlock value={timeLeft.days} label="Days" />
                <div className="text-amber-400/30 text-3xl font-light mt-2">:</div>
                <TimeBlock value={timeLeft.hours} label="Hours" />
                <div className="text-amber-400/30 text-3xl font-light mt-2">:</div>
                <TimeBlock value={timeLeft.minutes} label="Mins" />
                <div className="text-amber-400/30 text-3xl font-light mt-2">:</div>
                <TimeBlock value={timeLeft.seconds} label="Secs" />
            </div>
        </motion.div>
    );
}

// Extracted to prevent re-renders - no animation on value change
function TimeBlock({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-bold font-display backdrop-blur-md"
                style={{
                    background: "linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)",
                    border: "1px solid rgba(251, 191, 36, 0.2)",
                    color: "#fbbf24",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(251, 191, 36, 0.05)",
                    textShadow: "0 0 20px rgba(251, 191, 36, 0.5)"
                }}
            >
                {value.toString().padStart(2, "0")}
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-[0.2em] mt-1">{label}</span>
            <div className="w-1 h-1 rounded-full bg-amber-400/30 mt-1" />
        </div>
    );
}
