import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function WaitlistCard() {
  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-2xl sm:p-8 md:p-10 lg:p-12 select-none">
      {/* Headline */}
      <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-foreground sm:text-2xl sm:mb-3 md:text-3xl lg:text-4xl font-mono">
        Something{" "}
        <span className="font-black font-playwrite-norge">Extraordinary</span>{" "}
        Is Coming Soon
      </h1>

      {/* Subtext */}
      <p className="mb-6 text-center text-sm text-muted-foreground sm:text-base sm:mb-8 md:text-lg font-sans">
        Join the waitlist to get early access and exclusive drops from Mivro.
      </p>

      {/* Action Area */}
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:mb-6">
        <Input
          type="email"
          placeholder="Enter your email"
          className="flex-1 w-full border-none bg-transparent placeholder:text-muted-foreground text-sm sm:text-base shadow-[0_0_12px_rgba(255,255,255,0.2)] focus-visible:shadow-[0_0_16px_rgba(255,255,255,0.3)] transition-shadow"
        />
        <Button className="w-full md:w-auto whitespace-nowrap shadow-[0_0_16px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow">
          Join Waitlist
        </Button>
      </div>
    </div>
  );
}
