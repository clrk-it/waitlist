import { WaitlistCard } from "@/components/features/waitlist-card";

export function HeroSection() {
  return (
    <main className="flex flex-1 items-center justify-center min-h-screen w-full px-4 sm:px-6 md:px-8">
      <div className="w-full">
        <WaitlistCard />
      </div>
    </main>
  );
}
