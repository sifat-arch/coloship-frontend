import { Boxes, Eye, Network, Target } from "lucide-react";
import SectionHeading from "../home/section-heading";

const platformPillars = [
  {
    icon: Network,
    text: "Customer, courier and admin views built around a single shipment record.",
  },
  {
    icon: Boxes,
    text: "Standard and Express delivery options for every kind of parcel.",
  },
  {
    icon: Target,
    text: "bKash and cash on delivery handled inside the same booking flow.",
  },
];

const WhoWeAreAndMission = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* --------------------------------------------------- Who we are */}
        <div className="flex flex-col gap-6">
          <SectionHeading
            align="left"
            eyebrow="Who we are"
            title="Built by people who ship, for people who ship"
            description="Coloship started with a simple frustration: sending a parcel across Bangladesh usually meant guessing where it was, when it would arrive and whether the cash would ever come back."
          />

          <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              So we built one platform where every shipment gets a tracking
              number, every milestone is recorded, and everyone involved — the
              shipper, the courier and our operations team — works from the same
              source of truth.
            </p>
            <p>
              Today that network moves parcels from metro streets to remote
              upazilas, with the same booking, tracking and payment experience
              no matter where the journey starts or ends.
            </p>
          </div>

          <ul className="flex flex-col gap-3 border-t pt-5">
            {platformPillars.map((pillar) => (
              <li key={pillar.text} className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <pillar.icon className="size-4.5" />
                </span>
                <span className="text-sm leading-relaxed text-foreground/90">
                  {pillar.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------- Mission & vision */}
        <div className="flex flex-col gap-5">
          <article className="rounded-2xl border bg-card p-6 shadow-xs sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                <Target className="size-5" />
              </span>
              <h3 className="text-lg font-bold tracking-tight">Our mission</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
              Make sending a parcel as simple as sending a message — with honest
              timelines, transparent pricing and a tracking number that always
              tells the truth.
            </p>
          </article>

          <article className="rounded-2xl border bg-card p-6 shadow-xs sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600">
                <Eye className="size-5" />
              </span>
              <h3 className="text-lg font-bold tracking-tight">Our vision</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
              A Bangladesh where every district, every shop and every buyer is
              connected by one reliable delivery network — without exceptions
              for smaller towns.
            </p>
          </article>

          <div className="rounded-2xl border border-dashed bg-muted/40 p-6">
            <p className="text-sm leading-relaxed text-pretty">
              “If a customer can see the parcel moving, they trust the seller
              moving it. That trust is what we actually deliver.”
            </p>
            <p className="mt-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              The Coloship team · Dhaka
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreAndMission;
