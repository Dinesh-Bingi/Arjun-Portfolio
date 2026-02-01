import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kurapati Arjun - Game & Level Designer",
  description:
    "Portfolio of Kurapati Arjun showcasing level design, gameplay systems, and game projects.",
  openGraph: {
    title: "Kurapati Arjun - Game & Level Designer",
    description:
      "Portfolio of Kurapati Arjun showcasing level design, gameplay systems, and game projects.",
    type: "website",
    siteName: "Kurapati Arjun",
    url: "https://arjunkurapati.com/",
    images: [
      {
        url: "https://arjunkurapati.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurapati Arjun - Game & Level Designer",
    description:
      "Portfolio of Kurapati Arjun showcasing level design, gameplay systems, and game projects.",
    images: ["https://arjunkurapati.com/og-image.jpg"],
    creator: "Kurapati Arjun",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e4e0ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f11" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${dmSans.variable} ${instrumentSerif.variable} antialiased`}
        style={{
          fontFamily: "var(--font-dm-sans), var(--font-body), sans-serif",
        }}
      >
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
