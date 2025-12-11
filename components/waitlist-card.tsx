"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MouseEvent, useEffect, useState, KeyboardEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle, Users } from "lucide-react";

// Mock EarlyAccessCard component - replace with your actual component
const EarlyAccessCard = () => <div className="mb-6"></div>;

export function WaitlistCard() {
  const [waitListCount, setWaitListCount] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    getNumberOfWaitList();
  }, []);

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitEmail = async (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    // Reset states
    setError("");
    setSuccess(false);

    // Validate email
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/joinWaitList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email }),
      });

      if (res.status === 201) {
        const data = await res.json();
        console.log("Created waitlist entry:", data);
        setSuccess(true);
        setEmail(""); // Clear email on success
        setError("");

        // Refresh waitlist count
        await getNumberOfWaitList();

        // Hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        const errorData = await res.json().catch(() => ({}));
        setError(
          errorData.message || res.statusText || "Failed to join waitlist"
        );
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Waitlist submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getNumberOfWaitList = async () => {
    try {
      const res = await fetch("/api/joinWaitList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setWaitListCount(data);
      }
    } catch (err) {
      console.error("Failed to fetch waitlist count:", err);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      submitEmail(e);
    }
  };

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-2xl sm:p-8 md:p-10 lg:p-12 select-none">
      <EarlyAccessCard />

      {/* Headline */}
      <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-foreground sm:text-2xl sm:mb-3 md:text-3xl lg:text-4xl font-mono">
        Something <span className="font-black text-primary">Extraordinary</span>{" "}
        Is Coming Soon
      </h1>

      {/* Subtext */}
      <p className="mb-6 text-center text-sm text-muted-foreground sm:text-base sm:mb-8 md:text-lg font-sans">
        Join the waitlist to get early access and exclusive drops from Mivro.
      </p>

      {/* Success Message */}
      {success && (
        <Alert className="mb-4 border-green-500/50 bg-green-500/10">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-500">
            Success! You've been added to the waitlist. Check your email for
            confirmation.
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {error && (
        <Alert className="mb-4 border-red-500/50 bg-red-500/10">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-500">{error}</AlertDescription>
        </Alert>
      )}

      {/* Action Area */}
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:mb-6">
        <Input
          type="email"
          placeholder="Enter your email"
          className={`flex-1 w-full border-none bg-transparent placeholder:text-muted-foreground text-sm sm:text-base shadow-[0_0_12px_rgba(${
            error ? "255,0,0," : "255,255,255,"
          }0.2)] focus-visible:shadow-[0_0_16px_rgba(255,255,255,0.3)] transition-shadow`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <Button
          className="w-full md:w-auto whitespace-nowrap shadow-[0_0_16px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={submitEmail}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining...
            </>
          ) : (
            "Join Waitlist"
          )}
        </Button>
      </div>

      {/* Waitlist Counter */}
      {waitListCount > 0 && !initialLoading && (
        <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4" />
          <span className="text-sm font-medium">
            <span className="text-primary font-bold">
              {waitListCount.toLocaleString()}+
            </span>{" "}
            people already joined
          </span>
        </div>
      )}
    </div>
  );
}
