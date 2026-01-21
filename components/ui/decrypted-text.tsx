"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    sequential?: boolean;
    revealDirection?: "start" | "end" | "center";
    useOriginalCharsOnly?: boolean;
    characters?: string;
    className?: string;
    encryptedClassName?: string;
    animateOn?: "view" | "hover";
    highlightText?: string;
    highlightClassName?: string;
}

const defaultCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()";

export function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    sequential = false,
    revealDirection = "start",
    useOriginalCharsOnly = false,
    characters = defaultCharacters,
    className,
    encryptedClassName,
    animateOn = "view",
    highlightText,
    highlightClassName,
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const getRandomChar = useCallback(
        (originalChar: string) => {
            if (originalChar === " ") return " ";
            if (useOriginalCharsOnly) {
                const chars = text.replace(/\s/g, "");
                return chars[Math.floor(Math.random() * chars.length)];
            }
            return characters[Math.floor(Math.random() * characters.length)];
        },
        [text, characters, useOriginalCharsOnly]
    );

    const animate = useCallback(() => {
        const textLength = text.length;
        const iterations = new Array(textLength).fill(0);
        const revealed = new Array(textLength).fill(false);

        intervalRef.current = setInterval(() => {
            let allRevealed = true;
            const newText = text.split("").map((char, index) => {
                if (char === " ") return " ";

                let shouldReveal = false;
                if (sequential) {
                    let revealIndex = 0;
                    if (revealDirection === "start") {
                        revealIndex = revealed.filter(Boolean).length;
                        shouldReveal = index === revealIndex;
                    } else if (revealDirection === "end") {
                        revealIndex = textLength - 1 - revealed.filter(Boolean).length;
                        shouldReveal = index === revealIndex;
                    } else {
                        const leftIndex = Math.floor(textLength / 2) - Math.floor(revealed.filter(Boolean).length / 2);
                        const rightIndex = Math.floor(textLength / 2) + Math.floor(revealed.filter(Boolean).length / 2);
                        shouldReveal = index >= leftIndex && index <= rightIndex && !revealed[index];
                    }
                } else {
                    shouldReveal = iterations[index] >= maxIterations;
                }

                if (revealed[index]) return char;

                if (shouldReveal) {
                    revealed[index] = true;
                    return char;
                }

                iterations[index]++;
                allRevealed = false;
                return getRandomChar(char);
            });

            setDisplayText(newText.join(""));

            if (allRevealed) {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                setHasAnimated(true);
            }
        }, speed);
    }, [text, maxIterations, speed, sequential, revealDirection, getRandomChar]);

    useEffect(() => {
        if (animateOn === "view" && !hasAnimated) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        animate();
                        observer.disconnect();
                    }
                },
                { threshold: 0.1 }
            );

            if (containerRef.current) {
                observer.observe(containerRef.current);
            }

            return () => observer.disconnect();
        }
    }, [animateOn, hasAnimated, animate]);

    useEffect(() => {
        if (animateOn === "hover" && isHovering) {
            animate();
        }
    }, [animateOn, isHovering, animate]);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Handle highlight text
    const renderText = () => {
        if (!highlightText || !displayText.includes(highlightText)) {
            return displayText;
        }

        const parts = displayText.split(highlightText);
        return parts.map((part, index) => (
            <span key={index}>
                {part}
                {index < parts.length - 1 && (
                    <span className={highlightClassName}>{highlightText}</span>
                )}
            </span>
        ));
    };

    return (
        <motion.span
            ref={containerRef}
            className={cn("inline-block", className)}
            onMouseEnter={() => animateOn === "hover" && setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <span className={!hasAnimated ? encryptedClassName : undefined}>
                {renderText()}
            </span>
        </motion.span>
    );
}
