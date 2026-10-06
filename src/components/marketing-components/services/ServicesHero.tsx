import { Banknote, Check, ScanLine, Timer, Truck, Zap } from "lucide-react";

const quickFacts = [
  "Express & Standard delivery",
  "Same-day delivery within city",
  "Cash on Delivery and bKash",
  "64 districts, 8 divisions",
];

const serviceMenu = [
  {
    icon: Zap,
    title: "Express Delivery",
    tag: "Priority routing",
    highlight: true,
  },
  {
    icon: Truck,
    title: "Standard Shipping",
    tag: "Everyday rates",
    highlight: false,
  },
  {
    icon: Timer,
    title: "Same-Day Delivery",
    tag: "Within city",
    highlight: false,
  },
  {
    icon: Banknote,
    title: "Cash on Delivery",
    tag: "Cash at the door",
    highlight: false,
  },
];

const ServicesHero = () => {
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
            Services
          </span>

          <h1 className="text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Delivery services for{" "}
            <span className="text-primary">every kind of shipment</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            From a single urgent parcel to a shop's daily orders, choose the
            service that fits — every one of them runs on the same tracking,
            pickup and payment experience.
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
            href="#services-grid"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Browse all services
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        {/* -------------------------------------------------------- Visual */}
        <div
          aria-hidden="true"
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-sky-500/10 blur-2xl" />

          <div className="relative rounded-3xl border bg-card p-5 shadow-2xl shadow-primary/10 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Choose a service
                </p>
                <p className="text-sm font-bold">Available for booking</p>
              </div>

              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                4 options
              </span>
            </div>

            <ul className="mt-5 flex flex-col gap-2.5">
              {serviceMenu.map((service) => (
                <li
                  key={service.title}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 transition-colors ${
                    service.highlight
                      ? "border-primary/40 bg-primary/5"
                      : "bg-background"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex size-9 items-center justify-center rounded-lg ${
                        service.highlight
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <service.icon className="size-4.5" />
                    </span>
                    <span className="text-sm font-semibold">
                      {service.title}
                    </span>
                  </div>

                  <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                    {service.tag}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-2.5 rounded-2xl border border-dashed bg-muted/40 px-4 py-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ScanLine className="size-4" />
              </span>
              <p className="text-xs font-medium text-muted-foreground">
                Every service includes live tracking from pickup to doorstep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
