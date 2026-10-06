import {
  ArrowRight,
  BadgeCheck,
  Check,
  Navigation,
  ScanLine,
  Truck,
} from "lucide-react";

const quickFacts = [
  "64 districts, 8 divisions",
  "Standard & Express delivery",
  "COD and bKash in one flow",
];

const journeyCards = [
  {
    icon: Navigation,
    title: "Pickup requested",
    meta: "Mirpur-10, Dhaka",
    chip: "Requested",
    chipClass: "bg-blue-500/10 text-blue-600",
    className: "w-[94%] rotate-2 shadow-md",
  },
  {
    icon: Truck,
    title: "Picked up & in transit",
    meta: "Dhaka hub → Chattogram hub",
    chip: "In transit",
    chipClass: "bg-amber-500/10 text-amber-600",
    className: "w-[97%] -rotate-1 shadow-lg",
  },
  {
    icon: BadgeCheck,
    title: "Delivered to the door",
    meta: "Agrabad, Chattogram",
    chip: "COD collected",
    chipClass: "bg-emerald-500/10 text-emerald-600",
    className: "shadow-2xl ring-2 ring-primary/25",
  },
];

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-[420px] w-[420px] rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 h-[360px] w-[360px] rounded-full bg-sky-500/10 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8 lg:py-24">
        {/* ---------------------------------------------------------- Copy */}
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-semibold tracking-widest text-primary uppercase shadow-xs">
            About Coloship
          </span>

          <h1 className="text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            A faster, fairer delivery network{" "}
            <span className="text-primary">for Bangladesh</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            We connect sellers, shops and everyday shippers with verified
            couriers, live tracking and secure payments — so a parcel sent from
            Dhaka feels just as predictable as one sent across the street.
          </p>

          <ul className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
            {quickFacts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-primary" />
                {fact}
              </li>
            ))}
          </ul>

          <a
            href="#operations"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            See how we deliver
            <ArrowRight className="size-4" />
          </a>
        </div>

        {/* ------------------------------------------------------ Visual */}
        <div
          aria-hidden="true"
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-sky-500/10 blur-2xl" />

          <div className="relative flex flex-col gap-3">
            {journeyCards.map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border bg-card p-4 sm:p-5 ${card.className}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <card.icon className="size-5" />
                    </span>
                    <div className="space-y-0.5">
                      <p className="text-sm font-semibold">{card.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {card.meta}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${card.chipClass}`}
                  >
                    {card.chip}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute -bottom-6 left-4 hidden items-center gap-2 rounded-xl border bg-card px-3 py-2 text-xs font-semibold shadow-lg sm:flex">
            <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ScanLine className="size-3.5" />
            </span>
            Same tracking number, pickup to doorstep
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
