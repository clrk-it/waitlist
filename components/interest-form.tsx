"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, FormEvent, memo } from "react";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { isValidEmail, isUTDEmail } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CLUB_OPTIONS = [
  "Association for Computing Machinery (ACM UTD)",
  "Artificial Intelligence Society (AIS)",
  "American Institute of Aeronautics and Astronautics (AIAA)",
  "Alpha Eta Mu Beta (Biomedical Engineering Honor Society)",
  "American Society of Mechanical Engineers (ASME)",
  "Cloud Computing Club",
  "Accessible Prosthetics Initiative",
  "Jonsson School Student Council",
  "180 Degrees Consulting",
  "Alpha Kappa Psi (AKPsi)",
  "American Marketing Association (AMA UTD)",
  "Association for Information Systems (AIS) Student Chapter",
  "Analytics on In-Memory Database (AIMDB)",
  "Association for Latino Professionals for America (ALPFA)",
  "ASCEND (Asian and Pacific Islander Business Professionals)",
  "AI Biz Club",
  "Alpha Epsilon Delta (AED)",
  "Health Occupations Students of America (HOSA)",
  "Molding Doctors at UTD",
  "Pre-Dental Association",
  "Pre-Physician Assistant Society",
  "Chemistry Student Association (ChemSA)",
  "Actuarial Student Association (ASA)",
  "Data Science Club",
  "UTD Chess Team",
  "John Marshall Pre-Law Society (JMPLS)",
  "Geospatial Information Sciences Student Organization (GISSO)",
  "The American Institute of Graphic Arts (AIGA) UTD",
  "The Animation Guild",
  "Student Game Developer Association",
  "Reunion: The Dallas Review (Literary Publication)",
  "UTDance Ensemble",
  "Active Minds at UTD",
  "Global Brigades",
  "Queer & Trans POC at UTD",
  "Pride at UTD",
  "The Lavender Club",
  "Out in Science, Technology, Engineering, and Mathematics (oSTEM)",
];

function InterestFormComponent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    club: "",
    interest: "",
    additionalQuestions: "",
  });
  const [useOtherClub, setUseOtherClub] = useState(false);
  const [otherClub, setOtherClub] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Client-side validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    } else if (!isUTDEmail(formData.email)) {
      errors.email = "Please use a UTD email address (@utdallas.edu)";
    }

    // Club validation
    const clubValue = useOtherClub ? otherClub : formData.club;
    if (!clubValue.trim()) {
      errors.club = "Please tell us what club you represent";
    }

    // Interest validation
    if (!formData.interest.trim()) {
      errors.interest = "Please tell us why you're interested";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleClubSelect = (value: string) => {
    if (value === "__other__") {
      setUseOtherClub(true);
      setFormData((prev) => ({ ...prev, club: "" }));
      setFieldErrors((prev) => ({ ...prev, club: "" }));
      return;
    }

    setUseOtherClub(false);
    setOtherClub("");
    setFormData((prev) => ({ ...prev, club: value }));
    setFieldErrors((prev) => ({ ...prev, club: "" }));
  };

  const handleOtherClubChange = (value: string) => {
    setOtherClub(value);
    setFieldErrors((prev) => ({ ...prev, club: "" }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const clubValue = useOtherClub ? otherClub : formData.club;

    try {
      const res = await fetch("/api/joinWaitList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          club: clubValue,
          interest: formData.interest,
          additionalQuestions: formData.additionalQuestions,
        }),
      });

      if (res.status === 201) {
        router.push("/thank-you");
      } else {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || "Failed to submit form");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-2xl sm:p-8 md:p-10 select-none">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">Back to Home</span>
      </Link>

      {/* Headline */}
      <h1 className="mb-3 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl font-manrope">
        Club Interest Form
      </h1>

      {/* Subtext */}
      <p className="mb-8 text-center text-sm text-muted-foreground sm:text-base font-manrope">
        Fill out the form below to express your interest. We&apos;ll be in touch
        soon!
      </p>

      {/* Error Message */}
      {error && (
        <Alert className="mb-6 border-red-500/50 bg-red-500/10">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-500">{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email{" "}
            <span className="text-muted-foreground">(UTD email preferred)</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="yourname@utdallas.edu"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled={loading}
            className={`form-input-base ${
              fieldErrors.email ? "form-input-error" : ""
            }`}
          />
          {fieldErrors.email && (
            <p className="text-sm text-red-500">{fieldErrors.email}</p>
          )}
        </div>

        {/* Club Field */}
        <div className="space-y-2">
          <Label htmlFor="club" className="text-foreground">
            What club do you represent?
          </Label>
          <Select
            value={useOtherClub ? "__other__" : formData.club}
            onValueChange={handleClubSelect}
            disabled={loading}
          >
            <SelectTrigger
              className={`w-full justify-between form-input-base ${
                fieldErrors.club ? "form-input-error" : ""
              }`}
              aria-invalid={!!fieldErrors.club}
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

          {useOtherClub && (
            <Input
              id="club-other"
              type="text"
              placeholder="Enter your club name"
              value={otherClub}
              onChange={(e) => handleOtherClubChange(e.target.value)}
              disabled={loading}
              className={`form-input-base ${
                fieldErrors.club ? "form-input-error" : ""
              }`}
            />
          )}
          {fieldErrors.club && (
            <p className="text-sm text-red-500">{fieldErrors.club}</p>
          )}
        </div>

        {/* Interest Field */}
        <div className="space-y-2">
          <Label htmlFor="interest" className="text-foreground">
            Why are you interested?
          </Label>
          <Textarea
            id="interest"
            placeholder="Tell us why you're interested..."
            value={formData.interest}
            onChange={(e) => handleInputChange("interest", e.target.value)}
            disabled={loading}
            rows={4}
            className={`form-input-base ${
              fieldErrors.interest ? "form-input-error" : ""
            }`}
          />
          {fieldErrors.interest && (
            <p className="text-sm text-red-500">{fieldErrors.interest}</p>
          )}
        </div>

        {/* Additional Questions Field */}
        <div className="space-y-2">
          <Label htmlFor="additionalQuestions" className="text-foreground">
            Anything else you want to ask?{" "}
            <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="additionalQuestions"
            placeholder="Any questions or additional information..."
            value={formData.additionalQuestions}
            onChange={(e) =>
              handleInputChange("additionalQuestions", e.target.value)
            }
            disabled={loading}
            rows={3}
            className="form-input-base"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full form-submit-btn"
          disabled={loading}
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
      </form>
    </div>
  );
}

export const InterestForm = memo(InterestFormComponent);
