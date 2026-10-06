import { ArrowRight, Mail, Navigation, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ServiceCta = () => {
  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground shadow-2xl shadow-primary/30 sm:px-10 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-white/10 blur-2xl"
          />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold tracking-widest uppercase">
              Send with Coloship
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Ready to send your parcel?
            </h2>

            <p className="max-w-2xl text-sm leading-relaxed text-primary-foreground/80 text-pretty sm:text-base">
              Pick a service, add your addresses and book in about a minute — or
              talk to our team first if you are shipping in volume.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
              <Button
                size="lg"
                className="h-11 w-full gap-2 bg-background px-6 text-base font-semibold text-foreground shadow-lg hover:bg-background/90 sm:w-auto"
                nativeButton={false}
                render={
                  <Link href="/customer/book-parcel">
                    <span className="inline-flex items-center gap-2">
                      Book a Parcel
                      <ArrowRight className="size-4" />
                    </span>
                  </Link>
                }
              />

              <Button
                size="lg"
                variant="outline"
                className="h-11 w-full gap-2 border-primary-foreground/40 bg-transparent px-6 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
                nativeButton={false}
                render={
                  <Link href="mailto:support@coloship.com">
                    <span className="inline-flex items-center gap-2">
                      <Mail className="size-4" />
                      Contact Support
                    </span>
                  </Link>
                }
              />
            </div>

            <Link
              href="/customer/track"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground/85 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
            >
              <Navigation className="size-3.5" />
              Track an existing parcel
            </Link>

            <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-medium text-primary-foreground/70">
              <span className="inline-flex items-center gap-1.5">
                <Phone className="size-3.5" />
                support@coloship.com
              </span>
              <span>64 districts nationwide</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCta;
