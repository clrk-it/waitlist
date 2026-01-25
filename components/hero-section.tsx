import { WaitlistCard } from "@/components/features/waitlist-card";

export function HeroSection() {
  return (
    <main className="flex h-full flex-1 items-center justify-center w-full px-4 sm:px-6 md:px-8">
      <div className="w-full min-w-0">
        <WaitlistCard />
      </div>
    </main>
  );
}
