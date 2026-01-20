"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BackgroundBeams({ className }: { className?: string }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn(
                "absolute inset-0 overflow-hidden",
                className
            )}
        >
            {/* Deep dark base with subtle texture */}
            <div className="absolute inset-0 bg-[#030303]" />

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Animated gradient orbs */}
            <motion.div
                className="absolute w-[800px] h-[800px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)",
                    top: "-20%",
                    right: "-10%",
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.4, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(199, 91, 18, 0.12) 0%, transparent 70%)",
                    bottom: "-15%",
                    left: "-5%",
                }}
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.25, 0.35, 0.25],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(0, 133, 66, 0.08) 0%, transparent 70%)",
                    top: "40%",
                    left: "30%",
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4,
                }}
            />

            {/* Animated beam lines */}
            <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="beam1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
                        <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="beam2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#c75b12" stopOpacity="0" />
                        <stop offset="50%" stopColor="#c75b12" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#c75b12" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Diagonal beams */}
                <motion.line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="100%"
                    stroke="url(#beam1)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut",
                    }}
                />
                <motion.line
                    x1="100%"
                    y1="0"
                    x2="0"
                    y2="100%"
                    stroke="url(#beam2)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1],
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />
            </svg>

            {/* Mouse follow spotlight */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(251, 191, 36, 0.06) 0%, transparent 60%)",
                }}
                animate={{
                    x: mousePosition.x - 300,
                    y: mousePosition.y - 300,
                }}
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 150,
                }}
            />

            {/* Vignette overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)"
                }}
            />
        </div>
    );
}
