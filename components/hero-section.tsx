import { WaitlistCard } from "@/components/features/waitlist-card";

export function HeroSection() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:px-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <WaitlistCard />
      </div>
    </main>
  );
}
