import {
  ArrowRight,
  CircleCheckBig,
  MapPin,
  Navigation,
  PackageCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionHeading from "../home/section-heading";

const stats = [
  {
    icon: PackageCheck,
    value: "1.2M+",
    label: "Parcels delivered",
    caption: "Shipped since day one",
  },
  {
    icon: MapPin,
    value: "64",
    label: "Districts covered",
    caption: "Doorstep pickup & delivery",
  },
  {
    icon: Users,
    value: "12K+",
    label: "Active customers",
    caption: "Shops, sellers & shippers",
  },
  {
    icon: CircleCheckBig,
    value: "98.7%",
    label: "Successful deliveries",
    caption: "First-attempt delivery rate",
  },
];

const TrustAndCta = () => {
  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* --------------------------------------------------- Trust */}
        <SectionHeading
          eyebrow="Trust"
          title="Numbers we are accountable for"
          description="The same figures we publish on the home page — updated as the network grows."
        />

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border shadow-xs sm:mt-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 bg-card p-4 sm:p-6"
            >
              <stat.icon className="mb-1 size-5 text-primary" />
              <p className="text-2xl font-extrabold tracking-tight tabular-nums sm:text-3xl">
                {stat.value}
              </p>
              <p className="text-xs font-semibold sm:text-sm">{stat.label}</p>
              <p className="text-[11px] text-muted-foreground">
                {stat.caption}
              </p>
            </div>
          ))}
        </div>

        {/* ----------------------------------------------------- CTA */}
        <div className="relative mt-12 overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground shadow-2xl shadow-primary/30 sm:mt-14 sm:px-10 sm:py-14 lg:px-16">
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
              Book a shipment in minutes — or paste a tracking number to pick up
              exactly where your last parcel left off.
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
                  <Link href="/customer/track">
                    <span className="inline-flex items-center gap-2">
                      Track Parcel
                      <Navigation className="size-4" />
                    </span>
                  </Link>
                }
              />
            </div>

            <p className="text-xs font-medium text-primary-foreground/70">
              Sign up in minutes · Track every milestone from pickup to doorstep
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustAndCta;
