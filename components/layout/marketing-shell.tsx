import { BackgroundBeamsLazy } from "@/components/ui/background-beams-lazy";
import { cn } from "@/lib/utils";

type MaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

const MAX_WIDTH_CLASS: Record<MaxWidth, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
};

export function MarketingShell({
  children,
  centered = true,
  maxWidth = "lg",
  beamsClassName,
  className,
  contentClassName,
}: {
  children: React.ReactNode;
  centered?: boolean;
  maxWidth?: MaxWidth;
  beamsClassName?: string;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div
      className={cn(
        "dark relative w-full min-h-dvh overflow-hidden overflow-x-hidden bg-[#030303] selection:bg-amber-500/30",
        className
      )}
    >
      <BackgroundBeamsLazy className={cn("opacity-40", beamsClassName)} />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <main
          className={cn(
            "flex flex-1 w-full px-4 sm:px-6 md:px-8",
            centered ? "items-center justify-center" : "items-start justify-center py-10 sm:py-14",
            contentClassName
          )}
        >
          <div className={cn("w-full min-w-0", MAX_WIDTH_CLASS[maxWidth])}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

