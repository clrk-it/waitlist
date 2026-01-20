"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_TYPE_OPTIONS } from "@/constants/user-types";
import type { UserType } from "@/lib/supabase";

interface UserTypeSelectorProps {
  value: UserType | "";
  onChange: (value: UserType) => void;
  error?: string;
  disabled?: boolean;
}

export function UserTypeSelector({
  value,
  onChange,
  error,
  disabled,
}: UserTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="userType" className="text-gray-900">
        How would you like to use Mivro? <span className="text-red-500">*</span>
      </Label>
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger
          id="userType"
          className={`w-full justify-between ${error ? "border-destructive" : ""}`}
          aria-invalid={!!error}
        >
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent className="max-h-72 overflow-y-auto bg-white border-gray-200">
          {USER_TYPE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value} className="text-gray-900">
              <div className="flex flex-col">
                <span className="font-medium">{option.label}</span>
                <span className="text-xs text-gray-500">{option.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
