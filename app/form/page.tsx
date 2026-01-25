import { InterestForm } from "@/components/forms/interest-form";
import { MarketingShell } from "@/components/layout/marketing-shell";

export default function FormPage() {
  return (
    <MarketingShell centered={false} maxWidth="xl">
      <InterestForm />
    </MarketingShell>
  );
}
