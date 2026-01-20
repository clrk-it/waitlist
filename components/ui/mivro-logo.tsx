"use client";

import { motion } from "framer-motion";

export function MivroLogo({ className }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center ${className || ""}`}>
            <span
                className="font-display font-black text-white tracking-tight"
                style={{
                    fontSize: "inherit",
                    lineHeight: 1
                }}
            >
                Mivro
            </span>
            <motion.span
                className="inline-block ml-1 rounded-full"
                style={{
                    width: "0.2em",
                    height: "0.2em",
                    backgroundColor: "#c75b12",
                    marginBottom: "0.3em"
                }}
                animate={{
                    y: [0, -3, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
}
