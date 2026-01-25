"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { VENTURE_CATEGORIES } from "@/constants/ventures";

interface VentureFieldsProps {
  ventureName: string;
  categories: string[];
  onNameChange: (value: string) => void;
  onCategoryToggle: (category: string) => void;
  nameError?: string;
  categoriesError?: string;
  disabled?: boolean;
  compact?: boolean;
}

export function VentureFields({
  ventureName,
  categories,
  onNameChange,
  onCategoryToggle,
  nameError,
  categoriesError,
  disabled,
  compact = false,
}: VentureFieldsProps) {
  return (
    <>
      {/* Venture Name */}
      <div className={compact ? "space-y-1.5" : "space-y-2"}>
        <Label
          htmlFor="ventureName"
          className={compact ? "text-xs text-white/80" : "text-white/80"}
        >
          Venture Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="ventureName"
          type="text"
          placeholder="Enter your venture name"
          value={ventureName}
          onChange={(e) => onNameChange(e.target.value)}
          disabled={disabled}
          className={[
            "rounded-lg",
            compact ? "h-9 px-3 py-2 text-sm" : "",
            nameError ? "border-red-500" : "",
          ].join(" ")}
        />
        {nameError && <p className="text-sm text-red-500">{nameError}</p>}
      </div>

      {/* Venture Categories */}
      <div className={compact ? "space-y-1.5" : "space-y-2"}>
        <Label className={compact ? "text-xs text-white/80" : "text-white/80"}>
          Venture Categories <span className="text-red-500">*</span>
        </Label>
        <p className={compact ? "text-xs text-white/60" : "text-sm text-white/60 mb-3"}>
          Select all that apply (at least one required)
        </p>
        <div
          className={[
            compact
              ? "grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-24 sm:max-h-32 overflow-y-auto pr-1"
              : "flex flex-wrap gap-2",
          ].join(" ")}
        >
          {VENTURE_CATEGORIES.map((category) => {
            const isSelected = categories.includes(category);
            return (
              <Badge
                key={category}
                variant={isSelected ? "default" : "outline"}
                className={
                  compact
                    ? "cursor-pointer px-2 py-1 text-[11px] leading-none transition-all max-w-full truncate"
                    : "cursor-pointer px-3 py-1.5 text-sm transition-all"
                }
                style={
                  isSelected
                    ? {
                        backgroundColor: "#fbbf24",
                        color: "#09090b",
                        borderColor: "#fbbf24",
                      }
                    : {}
                }
                onClick={() => !disabled && onCategoryToggle(category)}
              >
                {category}
                {!compact && isSelected && <X className="ml-1.5 h-3 w-3" />}
              </Badge>
            );
          })}
        </div>
        {categoriesError && (
          <p className="text-sm text-red-500">{categoriesError}</p>
        )}
      </div>
    </>
  );
}
