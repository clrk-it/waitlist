"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BorderBeamInputWrapper } from "@/components/ui/border-beam";
import type { UserType } from "@/lib/supabase";

interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
  userType: UserType | "";
  error?: string;
  warning?: string;
  disabled?: boolean;
  compact?: boolean;
}

export function EmailField({
  value,
  onChange,
  userType,
  error,
  warning,
  disabled,
  compact = false,
}: EmailFieldProps) {
  const requiresUTD = ["journalist", "venture_owner", "club_owner"].includes(userType);

  return (
    <div className="space-y-2">
      <Label
        htmlFor="email"
        className={compact ? "text-xs text-white/80" : "text-white/80"}
      >
        Email Address <span className="text-red-500">*</span>
        {requiresUTD && (
          <span className="text-xs text-white/40 ml-2">
            (UTD email required)
          </span>
        )}
      </Label>
      <BorderBeamInputWrapper>
        <Input
          id="email"
          type="email"
          placeholder={requiresUTD ? "yourname@utdallas.edu" : "Enter your email"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={[
            "rounded-lg",
            compact ? "h-9 px-3 py-2 text-sm" : "",
            error ? "border-red-500" : "",
          ].join(" ")}
          aria-invalid={!!error}
          aria-describedby={error ? "email-error" : warning ? "email-warning" : undefined}
        />
      </BorderBeamInputWrapper>
      {error && (
        <p id="email-error" className="text-sm text-red-500">
          {error}
        </p>
      )}
      {!error && warning && (
        <p id="email-warning" className="text-sm text-amber-400">
          {warning}
        </p>
      )}
    </div>
  );
}
