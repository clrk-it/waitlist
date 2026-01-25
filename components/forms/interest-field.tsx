"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface InterestFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  rows?: number;
  compact?: boolean;
}

export function InterestField({
  value,
  onChange,
  error,
  disabled,
  rows = 4,
  compact = false,
}: InterestFieldProps) {
  return (
    <div className={compact ? "space-y-1.5" : "space-y-2"}>
      <Label
        htmlFor="interest"
        className={compact ? "text-xs text-white/80" : "text-white/80"}
      >
        Why are you interested? <span className="text-red-500">*</span>
      </Label>
      <Textarea
        id="interest"
        placeholder="Tell us why you're interested in Mivro..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={rows}
        className={[
          "rounded-lg",
          compact ? "px-3 py-2 text-sm" : "",
          error ? "border-red-500" : "",
        ].join(" ")}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
