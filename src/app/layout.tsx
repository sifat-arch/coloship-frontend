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
  title: {
    default: "Coloship — Courier & Parcel Delivery",
    template: "%s | Coloship",
  },
  description:
    "Fast, reliable courier and parcel delivery network across all 64 districts of Bangladesh.",
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
