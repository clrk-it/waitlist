import { BackgroundBeams } from "@/components/ui/background-beams";
import { ContactCard } from "@/components/features/contact-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with the Mivro team. Follow us on social media or send us an email.",
};

export default function ContactPage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background">
            <BackgroundBeams />
            <div className="relative z-10 flex min-h-screen flex-col">
                <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:px-8">
                    <div className="w-full max-w-lg">
                        <ContactCard />
                    </div>
                </main>
            </div>
        </div>
    );
}
