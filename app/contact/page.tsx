import { ContactCard } from "@/components/features/contact-card";
import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/marketing-shell";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with the Mivro team. Follow us on social media or send us an email.",
};

export default function ContactPage() {
    return (
        <MarketingShell maxWidth="lg">
            <ContactCard />
        </MarketingShell>
    );
}
