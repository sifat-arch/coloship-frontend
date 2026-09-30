import { ShieldAlert } from "lucide-react";
import Link from "next/link";

const AccessDenied = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="w-full max-w-md rounded-2xl border border-border/50 bg-card p-8 shadow-lg backdrop-blur-sm sm:p-10">
        {/* Warning Icon with Glow/Ring Effect */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <ShieldAlert className="h-8 w-8 animate-pulse" />
        </div>

        {/* Heading & Subtitle */}
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Access Denied
        </h1>
        <p className="mb-8 text-sm text-muted-foreground sm:text-base">
          You do not have the necessary permissions to view this page. Please
          return to the homepage to continue browsing.
        </p>

        {/* Action Button */}
        <div>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
