"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AdditionalQuestionsFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function AdditionalQuestionsField({
  value,
  onChange,
  disabled,
}: AdditionalQuestionsFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="additionalQuestions" className="text-gray-900">
        Anything else you want to ask?{" "}
        <span className="text-gray-500">(optional)</span>
      </Label>
      <Textarea
        id="additionalQuestions"
        placeholder="Any questions or additional information..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={3}
      />
    </div>
  );
}
