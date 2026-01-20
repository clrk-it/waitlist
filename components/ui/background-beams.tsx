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
            {/* Deep dark base */}
            <div className="absolute inset-0 bg-[#030303]" />

            {/* Animated grid with fade */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                style={{
                    backgroundImage: `
            linear-gradient(rgba(251, 191, 36, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251, 191, 36, 0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px'
                }}
            />

            {/* Animated gradient orbs - more visible and dynamic */}
            <motion.div
                className="absolute w-[900px] h-[900px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, rgba(251, 191, 36, 0.05) 40%, transparent 70%)",
                    top: "-30%",
                    right: "-20%",
                    filter: "blur(60px)"
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4],
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute w-[700px] h-[700px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(199, 91, 18, 0.2) 0%, rgba(199, 91, 18, 0.05) 40%, transparent 70%)",
                    bottom: "-20%",
                    left: "-15%",
                    filter: "blur(60px)"
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, -20, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(0, 133, 66, 0.15) 0%, transparent 60%)",
                    top: "50%",
                    left: "40%",
                    filter: "blur(80px)"
                }}
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.2, 0.35, 0.2],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3,
                }}
            />

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-amber-400/30"
                    style={{
                        left: `${10 + (i * 4.5) % 80}%`,
                        top: `${15 + (i * 7) % 70}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 4 + (i % 3),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                    }}
                />
            ))}

            {/* Diagonal beam lines - more visible */}
            <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="beam1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
                        <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.4" />
                        <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="beam2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#c75b12" stopOpacity="0" />
                        <stop offset="40%" stopColor="#c75b12" stopOpacity="0.3" />
                        <stop offset="60%" stopColor="#c75b12" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#c75b12" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="beam3" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stopColor="#008542" stopOpacity="0" />
                        <stop offset="50%" stopColor="#008542" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#008542" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Multiple animated beams */}
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
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
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
                        opacity: [0, 0.7, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut",
                        delay: 1.5,
                    }}
                />
                <motion.line
                    x1="0"
                    y1="30%"
                    x2="100%"
                    y2="70%"
                    stroke="url(#beam3)"
                    strokeWidth="1"
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
                        delay: 3,
                    }}
                />
            </svg>

            {/* Pulsing center glow */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 50%)",
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Mouse follow spotlight - more visible */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 50%)",
                }}
                animate={{
                    x: mousePosition.x - 250,
                    y: mousePosition.y - 250,
                }}
                transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 150,
                }}
            />

            {/* Edge vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.6) 100%)"
                }}
            />
        </div>
    );
}
