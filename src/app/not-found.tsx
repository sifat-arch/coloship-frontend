import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, Home, Search, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist on Coloship.",
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background">
      <div className="w-full max-w-lg mx-auto text-center space-y-6">
        {/* Visual 404 Badge & Icon */}
        <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-3xl bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5">
          <Compass className="w-12 h-12 sm:w-14 sm:h-14 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            404 — Lost in Transit
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            Sorry, we couldn&apos;t find the page or delivery route you were looking for. It may have been moved or removed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2 font-semibold">
              <Home className="w-4 h-4" />
              Return to Home
            </Button>
          </Link>

          <Link href="/track" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2 font-semibold"
            >
              <Search className="w-4 h-4" />
              Track a Parcel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
