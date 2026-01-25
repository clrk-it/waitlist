"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

const styles = {
  wrapper: {
    // Use inline-block so IntersectionObserver + getBoundingClientRect are reliable.
    display: "inline-block",
    whiteSpace: "pre-wrap",
  },
  srOnly: {
    position: "absolute" as const,
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    border: 0,
  },
};

interface DecryptedTextProps extends ComponentPropsWithoutRef<"span"> {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover" | "both";
  startDelayMs?: number;
  respectReducedMotion?: boolean;
}

function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  startDelayMs = 0,
  respectReducedMotion = true,
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [viewTriggered, setViewTriggered] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [restartNonce, setRestartNonce] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iterationRef = useRef(0);
  const revealedCountRef = useRef(0);
  const revealedMaskRef = useRef<boolean[]>([]);
  const runningSourceRef = useRef<"view" | "hover" | null>(null);

  const viewEnabled = animateOn === "view" || animateOn === "both";
  const hoverEnabled = animateOn === "hover" || animateOn === "both";

  const availableChars = useMemo(() => {
    if (useOriginalCharsOnly) {
      return Array.from(new Set(text.split(""))).filter((char) => char !== " ");
    }
    return characters.split("");
  }, [characters, text, useOriginalCharsOnly]);

  const revealOrder = useMemo(() => {
    const len = text.length;
    const isNonSpace = (i: number) => text[i] !== " ";
    if (len === 0) return [];

    if (revealDirection === "start") {
      const order: number[] = [];
      for (let i = 0; i < len; i++) if (isNonSpace(i)) order.push(i);
      return order;
    }

    if (revealDirection === "end") {
      const order: number[] = [];
      for (let i = len - 1; i >= 0; i--) if (isNonSpace(i)) order.push(i);
      return order;
    }

    // center
    const order: number[] = [];
    const seen = new Set<number>();
    const mid = Math.floor(len / 2);
    for (let radius = 0; radius < len; radius++) {
      const a = mid + radius;
      const b = mid - radius - 1;

      if (a >= 0 && a < len && isNonSpace(a) && !seen.has(a)) {
        seen.add(a);
        order.push(a);
      }
      if (b >= 0 && b < len && isNonSpace(b) && !seen.has(b)) {
        seen.add(b);
        order.push(b);
      }

      if (order.length >= len) break;
    }

    return order;
  }, [revealDirection, text]);

  const clearTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Always cleanup timers on unmount.
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const resetProgress = () => {
    iterationRef.current = 0;
    revealedCountRef.current = 0;
    revealedMaskRef.current = Array.from({ length: text.length }, () => false);
  };

  const pickRandomChar = () => {
    if (availableChars.length === 0) return " ";
    return availableChars[Math.floor(Math.random() * availableChars.length)];
  };

  const scramble = () => {
    const mask = revealedMaskRef.current;
    return text
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";
        if (mask[i]) return text[i];
        return pickRandomChar();
      })
      .join("");
  };

  const stopScramble = (opts?: { resetToOriginal?: boolean; markViewDone?: boolean }) => {
    clearTimers();
    runningSourceRef.current = null;
    setIsScrambling(false);
    if (opts?.resetToOriginal) setDisplayText(text);
    if (opts?.markViewDone) setViewCompleted(true);
  };

  // Keep displayed text aligned when the `text` prop changes.
  useEffect(() => {
    if (!isScrambling) setDisplayText(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  // Reduced motion => skip the scrambling animation entirely.
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(media.matches);
    onChange();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    }

    // Safari < 14
    // eslint-disable-next-line deprecation/deprecation
    media.addListener(onChange);
    // eslint-disable-next-line deprecation/deprecation
    return () => media.removeListener(onChange);
  }, []);

  // Pause timers when tab is hidden; restart when visible.
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        clearTimers();
        return;
      }
      setRestartNonce((n) => n + 1);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!viewEnabled || viewTriggered) return;

    const currentRef = containerRef.current;
    if (!currentRef) return;

    const isInViewportNow = () => {
      const rect = currentRef.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      return rect.bottom > 0 && rect.top < vh;
    };

    // Above-the-fold text should start immediately (common case).
    if (isInViewportNow()) {
      setViewTriggered(true);
      return;
    }

    if (typeof IntersectionObserver !== "function") {
      setViewTriggered(true);
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setViewTriggered(true);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [viewEnabled, viewTriggered]);

  // For "view" mode, start immediately on mount (homepage headline is above-the-fold).
  // `viewCompleted` prevents re-running the view animation.
  const viewActive = viewEnabled && !viewCompleted;
  const hoverActive = hoverEnabled && isHovering;
  const active = viewActive || hoverActive;

  useEffect(() => {
    if (!active) {
      // Hover-only animations should snap back when not active.
      if (runningSourceRef.current === "hover") {
        stopScramble({ resetToOriginal: true });
      }
      return;
    }

    if (respectReducedMotion && prefersReducedMotion) {
      stopScramble({
        resetToOriginal: true,
        markViewDone: viewActive,
      });
      return;
    }

    // Restart (or start) with latest config.
    clearTimers();
    resetProgress();

    const source: "view" | "hover" = viewActive ? "view" : "hover";
    runningSourceRef.current = source;
    setIsScrambling(true);

    const start = () => {
      intervalRef.current = setInterval(() => {
        if (sequential) {
          if (revealedCountRef.current < revealOrder.length) {
            const nextIndex = revealOrder[revealedCountRef.current];
            revealedMaskRef.current[nextIndex] = true;
            revealedCountRef.current += 1;
            setDisplayText(scramble());
            return;
          }

          stopScramble({ resetToOriginal: true, markViewDone: source === "view" });
          return;
        }

        setDisplayText(scramble());
        iterationRef.current += 1;
        if (iterationRef.current >= maxIterations) {
          stopScramble({ resetToOriginal: true, markViewDone: source === "view" });
        }
      }, speed);
    };

    if (source === "view" && startDelayMs > 0) {
      timeoutRef.current = setTimeout(start, startDelayMs);
    } else {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    active,
    maxIterations,
    prefersReducedMotion,
    respectReducedMotion,
    revealOrder,
    sequential,
    speed,
    startDelayMs,
    text,
    useOriginalCharsOnly,
    characters,
    restartNonce,
    viewActive,
  ]);

  const hoverProps =
    hoverEnabled
      ? {
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => setIsHovering(false),
        }
      : {};

  const { style, ...restProps } = props;

  return (
    <span
      className={parentClassName}
      ref={containerRef}
      style={{ ...styles.wrapper, ...(style ?? {}) }}
      {...hoverProps}
      {...restProps}
    >
      <span style={styles.srOnly}>{text}</span>

      {className === encryptedClassName ? (
        <span aria-hidden="true" className={className}>
          {displayText}
        </span>
      ) : (
        <span aria-hidden="true">
          {displayText.split("").map((char, index) => {
            const revealedMask = revealedMaskRef.current;
            const isRevealedOrDone =
              !isScrambling || (!sequential && !hoverActive && !viewActive)
                ? true
                : sequential
                  ? revealedMask[index]
                  : false;

            return (
              <span
                key={index}
                className={isRevealedOrDone ? className : encryptedClassName}
              >
                {char}
              </span>
            );
          })}
        </span>
      )}
    </span>
  );
}

export { DecryptedText };
export default DecryptedText;
