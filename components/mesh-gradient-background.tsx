export function MeshGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Large ambient base glows - using lighter, more visible colors */}
      <div
        className="absolute -left-1/3 -top-1/3 h-[200%] w-[200%] rounded-full opacity-60 blur-[200px]"
        style={{ backgroundColor: "hsl(29, 100%, 50%)" }}
      />
      <div
        className="absolute -right-1/3 -bottom-1/3 h-[200%] w-[200%] rounded-full opacity-50 blur-[200px]"
        style={{ backgroundColor: "hsl(157, 60%, 35%)" }}
      />

      {/* Animated pulsing center glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[150px] animate-pulse"
        style={{
          backgroundColor: "hsl(29, 100%, 50%)",
          animationDuration: "4s",
        }}
      />

      {/* Secondary layer - medium sized orbs */}
      <div
        className="absolute left-1/6 top-1/6 h-[1100px] w-[1100px] rounded-full opacity-50 blur-[160px]"
        style={{ backgroundColor: "hsl(29, 100%, 48%)" }}
      />
      <div
        className="absolute right-1/6 bottom-1/6 h-[1100px] w-[1100px] rounded-full opacity-45 blur-[160px]"
        style={{ backgroundColor: "hsl(157, 55%, 40%)" }}
      />

      {/* Tertiary layer - smaller accent glows */}
      <div
        className="absolute left-1/2 top-1/4 h-[650px] w-[650px] -translate-x-1/2 rounded-full opacity-55 blur-[120px]"
        style={{ backgroundColor: "hsl(29, 100%, 52%)" }}
      />
      <div
        className="absolute right-1/4 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full opacity-50 blur-[120px]"
        style={{ backgroundColor: "hsl(157, 50%, 38%)" }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 h-[570px] w-[570px] rounded-full opacity-45 blur-[120px]"
        style={{ backgroundColor: "hsl(29, 100%, 50%)" }}
      />

      {/* Accent highlights - smaller bright spots */}
      <div
        className="absolute left-1/2 top-1/6 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: "hsl(29, 100%, 55%)" }}
      />
      <div
        className="absolute right-1/6 top-2/3 h-[450px] w-[450px] -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: "hsl(157, 45%, 42%)" }}
      />
      <div
        className="absolute bottom-1/6 left-1/4 h-[430px] w-[430px] rounded-full opacity-35 blur-3xl"
        style={{ backgroundColor: "hsl(29, 100%, 53%)" }}
      />
      <div
        className="absolute bottom-1/2 right-1/3 h-[410px] w-[410px] rounded-full opacity-35 blur-3xl"
        style={{ backgroundColor: "hsl(157, 48%, 40%)" }}
      />

      {/* Additional vibrant accent orbs */}
      <div
        className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full opacity-45 blur-3xl"
        style={{ backgroundColor: "hsl(29, 100%, 50%)" }}
      />
      <div
        className="absolute bottom-1/3 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: "hsl(157, 52%, 38%)" }}
      />
      <div
        className="absolute top-2/3 left-1/5 h-80 w-80 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: "hsl(29, 100%, 52%)" }}
      />
    </div>
  );
}
