import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";

type BorderBeamConfig = {
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
};

export function GlassCard({
  children,
  className,
  contentClassName,
  glow = true,
  glowClassName,
  glowGradient = "linear-gradient(135deg, #fbbf24 0%, #c75b12 50%, #008542 100%)",
  borderBeam = true,
  borderBeamConfig,
}: {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  glow?: boolean;
  glowClassName?: string;
  glowGradient?: string;
  borderBeam?: boolean;
  borderBeamConfig?: BorderBeamConfig;
}) {
  const beam = borderBeamConfig ?? {};

  return (
    <div className={cn("relative w-full", className)}>
      {glow && (
        <div
          className={cn("absolute -inset-1 rounded-3xl blur-xl opacity-30", glowClassName)}
          style={{ background: glowGradient }}
        />
      )}

      <div
        className={cn(
          "relative z-10 w-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden",
          contentClassName
        )}
      >
        {borderBeam && (
          <BorderBeam
            size={beam.size ?? 250}
            duration={beam.duration ?? 15}
            colorFrom={beam.colorFrom ?? "#fbbf24"}
            colorTo={beam.colorTo ?? "#c75b12"}
          />
        )}

        <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

