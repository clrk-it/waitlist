import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function WaitlistCard() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg shadow-2xl md:p-12 select-none">
      {/* Headline */}
      <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
        Something Extraordinary Is Coming Soon
      </h1>

      {/* Subtext */}
      <p className="mb-8 text-center text-base text-muted-foreground md:text-lg">
        The official marketplace for UTD clubs. Join the waitlist to get early
        access and exclusive drops.
      </p>

      {/* Action Area */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <Input
          type="email"
          placeholder="Enter your email"
          className="flex-1 border-none bg-transparent placeholder:text-muted-foreground"
        />
        <Button className="w-full md:w-auto">Join Waitlist</Button>
      </div>
    </div>
  );
}
