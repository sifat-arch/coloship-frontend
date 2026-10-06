import { Check, ScanLine, ShieldCheck, Wallet } from "lucide-react";
import SectionHeading from "../home/section-heading";

const featureGroups = [
  {
    icon: ScanLine,
    tint: "bg-blue-500/10 text-blue-600",
    title: "Live tracking",
    items: [
      "Unique tracking number for every parcel",
      "Milestone updates from pickup to delivery",
      "Full shipment history in your dashboard",
    ],
  },
  {
    icon: ShieldCheck,
    tint: "bg-emerald-500/10 text-emerald-600",
    title: "Secure handling",
    items: [
      "Verified, background-checked couriers",
      "Recorded scans at every hub",
      "Clear chain of custody end to end",
    ],
  },
  {
    icon: Wallet,
    tint: "bg-amber-500/10 text-amber-600",
    title: "Payments that work",
    items: [
      "Cash on Delivery collected at the door",
      "bKash payment for delivery fees",
      "Human support when a parcel needs attention",
    ],
  },
];

const ServiceFeatures = () => {
  return (
    <section id="features" className="scroll-mt-20 border-y bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          eyebrow="What's included"
          title="Every shipment comes with these"
          description="Whichever service you choose at booking, the essentials below are never an add-on."
        />

        <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-3">
          {featureGroups.map((group) => (
            <article
              key={group.title}
              className="flex h-full flex-col gap-4 rounded-2xl border bg-card p-5 shadow-xs sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${group.tint}`}
                >
                  <group.icon className="size-5" />
                </span>
                <h3 className="text-base font-bold tracking-tight sm:text-lg">
                  {group.title}
                </h3>
              </div>

              <ul className="flex flex-col gap-2.5 text-sm leading-relaxed text-muted-foreground">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="size-2.5 text-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-dashed bg-background px-5 py-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-muted-foreground">
            Express, Standard, Same-Day, COD and corporate accounts all run on
            the same tracking and payment infrastructure.
          </p>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <ScanLine className="size-3.5" />
            No hidden features
          </span>
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
