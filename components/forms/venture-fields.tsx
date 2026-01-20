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
}

export function VentureFields({
  ventureName,
  categories,
  onNameChange,
  onCategoryToggle,
  nameError,
  categoriesError,
  disabled,
}: VentureFieldsProps) {
  return (
    <>
      {/* Venture Name */}
      <div className="space-y-2">
        <Label htmlFor="ventureName" className="text-gray-900">
          Venture Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="ventureName"
          type="text"
          placeholder="Enter your venture name"
          value={ventureName}
          onChange={(e) => onNameChange(e.target.value)}
          disabled={disabled}
          className={nameError ? "border-red-500" : ""}
        />
        {nameError && <p className="text-sm text-red-500">{nameError}</p>}
      </div>

      {/* Venture Categories */}
      <div className="space-y-2">
        <Label className="text-gray-900">
          Venture Categories <span className="text-red-500">*</span>
        </Label>
        <p className="text-sm text-gray-600 mb-3">
          Select all that apply (at least one required)
        </p>
        <div className="flex flex-wrap gap-2">
          {VENTURE_CATEGORIES.map((category) => {
            const isSelected = categories.includes(category);
            return (
              <Badge
                key={category}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer px-3 py-1.5 text-sm transition-all"
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
                {isSelected && <X className="ml-1.5 h-3 w-3" />}
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
