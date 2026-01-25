"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CLUB_OPTIONS } from "@/constants/clubs";

interface ClubFieldProps {
  value: string;
  useOther: boolean;
  otherValue: string;
  onChange: (value: string) => void;
  onOtherChange: (value: string) => void;
  onToggleOther: (useOther: boolean) => void;
  error?: string;
  disabled?: boolean;
}

export function ClubField({
  value,
  useOther,
  otherValue,
  onChange,
  onOtherChange,
  onToggleOther,
  error,
  disabled,
}: ClubFieldProps) {
  const handleSelect = (selectedValue: string) => {
    if (selectedValue === "__other__") {
      onToggleOther(true);
      onChange("");
      return;
    }
    onToggleOther(false);
    onChange(selectedValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="club" className="text-white/80">
        What club do you represent? <span className="text-red-500">*</span>
      </Label>
      <Select
        value={useOther ? "__other__" : value}
        onValueChange={handleSelect}
        disabled={disabled}
      >
        <SelectTrigger
          id="club"
          className={`w-full justify-between ${error ? "border-red-500" : ""}`}
          aria-invalid={!!error}
        >
          <SelectValue placeholder="Select your club" />
        </SelectTrigger>
        <SelectContent className="max-h-72 overflow-y-auto">
          {CLUB_OPTIONS.map((club) => (
            <SelectItem key={club} value={club}>
              {club}
            </SelectItem>
          ))}
          <SelectItem value="__other__">Other (type manually)</SelectItem>
        </SelectContent>
      </Select>

      {useOther && (
        <Input
          id="club-other"
          type="text"
          placeholder="Enter your club name"
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          disabled={disabled}
          className={`rounded-lg ${error ? "border-red-500" : ""}`}
        />
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
