export function MeshGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Optimized gradient background - reduced to 1 static layer + 1 animated layer */}

      {/* Base gradient layer - static, no animation */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 30%, hsl(29, 100%, 50%) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 70%, hsl(157, 60%, 35%) 0%, transparent 50%)
          `,
        }}
      />

      {/* Single animated layer - reduced blur and animation complexity */}
      <div
        className="absolute -left-1/4 -top-1/4 h-[150%] w-[150%] rounded-full opacity-40 blur-[80px] animate-swirl-slow"
        style={{ backgroundColor: "hsl(29, 100%, 50%)" }}
      />
    </div>
  );
}
