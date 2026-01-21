import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Mivro - The All-in-One Campus Platform for UTD",
    template: "%s | Mivro",
  },
  description:
    "Mivro is the all-in-one campus platform for clubs, news, and student ventures at UT Dallas. Connect with student organizations, discover campus events, and explore student businesses.",
  keywords: [
    "UTD clubs",
    "UT Dallas clubs",
    "UTD student organizations",
    "UTD student ventures",
    "UTD campus news",
    "UT Dallas student businesses",
    "UTD campus platform",
    "Mivro",
    "UTD student life",
    "UT Dallas clubs directory",
  ],
  authors: [{ name: "Mivro" }],
  creator: "Mivro",
  publisher: "Mivro",
  metadataBase: new URL("https://mivro.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mivro.org",
    siteName: "Mivro",
    title: "Mivro - The All-in-One Campus Platform for UTD",
    description:
      "Connect with student organizations, discover campus events, and explore student businesses at UT Dallas.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mivro - UT Dallas Campus Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mivro - The All-in-One Campus Platform for UTD",
    description:
      "Connect with student organizations, discover campus events, and explore student businesses at UT Dallas.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Mivro",
              url: "https://mivro.org",
              description:
                "The all-in-one campus platform for clubs, news, and student ventures at UT Dallas",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://mivro.org/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className="antialiased"
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
