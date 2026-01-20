"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface InterestFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function InterestField({
  value,
  onChange,
  error,
  disabled,
}: InterestFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="interest" className="text-gray-900">
        Why are you interested? <span className="text-red-500">*</span>
      </Label>
      <Textarea
        id="interest"
        placeholder="Tell us why you're interested in Mivro..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={4}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
