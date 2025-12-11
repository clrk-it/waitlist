import { MeshGradientBackground } from "@/components/mesh-gradient-background";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <MeshGradientBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <HeroSection />
      </div>
    </div>
  );
}
