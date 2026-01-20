"use client";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";

interface FormActionsProps {
  loading: boolean;
  error?: string;
  onSubmit: () => void;
}

export function FormActions({ loading, error, onSubmit }: FormActionsProps) {
  return (
    <>
      {error && (
        <Alert className="border-red-500 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        className="w-full bg-[#fbbf24] text-gray-900 hover:bg-[#f9a825] font-semibold"
        size="lg"
        disabled={loading}
        onClick={onSubmit}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </>
  );
}
