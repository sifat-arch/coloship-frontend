"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootGlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Root critical error caught by global-error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center shadow-xl space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Critical Application Error
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              A critical error occurred while initializing the application layout. Please reload to recover.
            </p>
          </div>

          {error?.message && (
            <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-left text-xs text-slate-700 font-mono overflow-auto max-h-24">
              {error.message}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium text-sm transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
