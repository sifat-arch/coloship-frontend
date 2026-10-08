import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://coloship.com"
  ),
  title: {
    default: "Coloship — Fast Courier & Parcel Delivery in Bangladesh",
    template: "%s | Coloship",
  },
  description:
    "Fast, reliable courier and parcel delivery network across all 64 districts of Bangladesh. Doorstep pickup, real-time parcel tracking, and secure bKash payments.",
  keywords: [
    "courier service bangladesh",
    "parcel delivery bd",
    "coloship",
    "fast shipping dhaka",
    "ecommerce courier bangladesh",
    "cash on delivery courier",
  ],
  authors: [{ name: "Coloship Logistics" }],
  creator: "Coloship",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coloship.com",
    siteName: "Coloship",
    title: "Coloship — Fast Courier & Parcel Delivery in Bangladesh",
    description:
      "Fast, reliable courier and parcel delivery network across all 64 districts of Bangladesh with real-time tracking.",
    images: [
      {
        url: "/hero-section-background.png",
        width: 1200,
        height: 630,
        alt: "Coloship Logistics Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coloship — Fast Courier & Parcel Delivery in Bangladesh",
    description:
      "Fast, reliable courier and parcel delivery network across all 64 districts of Bangladesh.",
    images: ["/hero-section-background.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <Providers>
        <body
          className={`${outfit.className} min-h-full flex flex-col antialiased`}
        >
          <Toaster />
          <TooltipProvider>{children}</TooltipProvider>
        </body>
      </Providers>
    </html>
  );
}
