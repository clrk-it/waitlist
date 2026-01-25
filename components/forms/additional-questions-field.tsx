"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AdditionalQuestionsFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  rows?: number;
  compact?: boolean;
}

export function AdditionalQuestionsField({
  value,
  onChange,
  disabled,
  rows = 3,
  compact = false,
}: AdditionalQuestionsFieldProps) {
  return (
    <div className={compact ? "space-y-1.5" : "space-y-2"}>
      <Label
        htmlFor="additionalQuestions"
        className={compact ? "text-xs text-white/80" : "text-white/80"}
      >
        Anything else you want to ask?{" "}
        <span className="text-white/40">(optional)</span>
      </Label>
      <Textarea
        id="additionalQuestions"
        placeholder="Any questions or additional information..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={rows}
        className={["rounded-lg", compact ? "px-3 py-2 text-sm" : ""].join(" ")}
      />
    </div>
  );
}
