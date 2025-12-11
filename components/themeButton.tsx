"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeButton() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm border border-white/10 hover:bg-background/80"
        type="button"
        size="icon"
        disabled
      >
        <SunIcon className="h-4 w-4" />
      </Button>
    );
  }

  const currentTheme = resolvedTheme || theme || "dark";
  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm border border-white/10 hover:bg-background/80 z-50"
      onClick={toggleTheme}
      type="button"
      size="icon"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
