"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, LifeBuoy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console or error reporting service
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background">
      <div className="w-full max-w-lg mx-auto text-center space-y-6">
        {/* Error Icon Bubble */}
        <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-3xl bg-destructive/10 text-destructive border border-destructive/20 shadow-lg shadow-destructive/5 animate-pulse">
          <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        {/* Heading & Description */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-destructive/10 text-destructive border border-destructive/20">
            System Error Occurred
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Something went wrong
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            An unexpected error occurred while loading this page. Our team has been notified. Please try reloading or head back to safety.
          </p>
        </div>

        {/* Technical Digest / Error Info (if present) */}
        {error?.message && (
          <div className="p-3.5 rounded-xl bg-muted/60 border border-border/80 text-left text-xs text-muted-foreground font-mono overflow-x-auto max-h-32 custom-scrollbar">
            <p className="font-semibold text-foreground/80 mb-1">Error Details:</p>
            <p className="break-words">{error.message}</p>
            {error.digest && (
              <p className="mt-1 text-[11px] opacity-70">Digest: {error.digest}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            size="lg"
            className="w-full sm:w-auto gap-2 font-semibold shadow-md shadow-primary/20"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2 font-semibold"
            >
              <Home className="w-4 h-4" />
              Return to Home
            </Button>
          </Link>

          <Link href="/contact" className="w-full sm:w-auto">
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto gap-2 text-muted-foreground hover:text-foreground"
            >
              <LifeBuoy className="w-4 h-4" />
              Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
