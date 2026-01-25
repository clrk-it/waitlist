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
        <Alert
          variant="destructive"
          className="border border-red-500/30 bg-red-500/10"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        className="w-full font-bold rounded-xl border-0 bg-linear-to-br from-amber-300 to-amber-500 text-[#09090b] hover:from-amber-200 hover:to-amber-400"
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
