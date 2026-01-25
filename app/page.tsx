import { BackgroundBeamsLazy } from "@/components/ui/background-beams-lazy";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <div className="relative w-full h-dvh overflow-hidden overflow-x-hidden bg-[#030303]">
      <BackgroundBeamsLazy />
      <div className="relative z-10 flex h-full flex-col">
        <HeroSection />
      </div>
    </div>
  );
}
