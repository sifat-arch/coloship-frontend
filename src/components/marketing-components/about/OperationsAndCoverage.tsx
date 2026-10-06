import { BadgeCheck, DoorOpen, MapPin, Truck } from "lucide-react";
import SectionHeading from "../home/section-heading";

const operationSteps = [
  {
    title: "Booking & verification",
    description:
      "Pickup and delivery addresses, parcel weight and delivery type are captured once — and the shipment is created with its own tracking number.",
  },
  {
    title: "Courier assignment & pickup",
    description:
      "A verified courier is assigned to the request and collects the parcel directly from the shipper's door.",
  },
  {
    title: "Hub-to-hub transit",
    description:
      "Every scan at the origin and destination hub updates the same tracking timeline, visible to everyone on the shipment.",
  },
  {
    title: "Delivery & settlement",
    description:
      "The parcel is handed to the recipient, and COD cash or the bKash delivery fee is settled back to the shipper.",
  },
];

const divisions = [
  { name: "Dhaka", districts: 13 },
  { name: "Chattogram", districts: 11 },
  { name: "Khulna", districts: 10 },
  { name: "Rajshahi", districts: 8 },
  { name: "Rangpur", districts: 8 },
  { name: "Barishal", districts: 6 },
  { name: "Sylhet", districts: 4 },
  { name: "Mymensingh", districts: 4 },
];

const reachHighlights = [
  { icon: MapPin, label: "8 divisions" },
  { icon: BadgeCheck, label: "64 districts" },
  { icon: DoorOpen, label: "Doorstep pickup" },
];

const OperationsAndCoverage = () => {
  return (
    <section id="operations" className="scroll-mt-20 border-y bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* -------------------------------------------- How we serve */}
          <div className="flex flex-col gap-6">
            <SectionHeading
              align="left"
              eyebrow="How we serve"
              title="One shipment, four accountable steps"
              description="The same process runs for a single parcel and for a shop shipping hundreds a month."
              className="max-w-xl"
            />

            <ol className="flex flex-col">
              {operationSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="relative flex gap-4 pb-6 last:pb-0 sm:gap-5"
                >
                  {index < operationSteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute top-7 bottom-0 left-[14px] w-px bg-border"
                    />
                  )}

                  <span className="relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border bg-card text-xs font-bold text-primary shadow-xs tabular-nums">
                    {index + 1}
                  </span>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* ------------------------------------------ Reach overview */}
          <div className="flex flex-col gap-5">
            <div className="overflow-hidden rounded-3xl border bg-card p-5 shadow-xs sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                    Our reach
                  </p>
                  <h3 className="text-lg font-bold tracking-tight">
                    Nationwide coverage, one standard
                  </h3>
                </div>

                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Truck className="size-5" />
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {divisions.map((division) => (
                  <div
                    key={division.name}
                    className="flex items-center justify-between gap-2 rounded-lg border bg-background px-3 py-2.5 text-sm shadow-2xs"
                  >
                    <span className="font-medium">{division.name}</span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary tabular-nums">
                      {division.districts}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4">
                {reachHighlights.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"
                  >
                    <item.icon className="size-3.5 text-primary" />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-dashed bg-background p-5">
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                District counts per division add up to full national coverage —
                with the same booking, tracking and COD experience from the
                capital to the coast.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationsAndCoverage;
