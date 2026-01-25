import { BackgroundBeams } from "@/components/ui/background-beams";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <div className="fixed w-full h-screen overflow-hidden bg-white">
      <BackgroundBeams />
      <div className="relative z-10 flex flex-col h-full">
        <HeroSection />
      </div>
    </div>
  );
}
