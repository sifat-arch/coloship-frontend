import {
  CircleAlert,
  HeartHandshake,
  MessagesSquare,
  RefreshCw,
  Scale,
  ScanLine,
  TriangleAlert,
} from "lucide-react";
import SectionHeading from "../home/section-heading";

const problems = [
  {
    icon: CircleAlert,
    title: "Parcels in a blind spot",
    description:
      "Shippers were left refreshing courier hotlines instead of simply knowing where their parcel actually was.",
  },
  {
    icon: Scale,
    title: "Cash without a trail",
    description:
      "COD money changed hands with no clear record of who collected what, when, or how much of it came back.",
  },
  {
    icon: TriangleAlert,
    title: "Everything in one queue",
    description:
      "Urgent parcels waited in the same line as everything else, with no real priority for the shipments that mattered.",
  },
];

const values = [
  {
    icon: RefreshCw,
    tint: "bg-blue-500/10 text-blue-600",
    title: "We keep our word",
    description:
      "A timeline we publish is a timeline we work towards — not a marketing line.",
  },
  {
    icon: ScanLine,
    tint: "bg-emerald-500/10 text-emerald-600",
    title: "Radical transparency",
    description:
      "Every scan and status change is visible to the person waiting for the parcel.",
  },
  {
    icon: HeartHandshake,
    tint: "bg-amber-500/10 text-amber-600",
    title: "Handled with care",
    description:
      "Parcels are treated like they belong to us, from pickup door to delivery door.",
  },
  {
    icon: MessagesSquare,
    tint: "bg-violet-500/10 text-violet-600",
    title: "People before bots",
    description:
      "When something needs attention, a real person steps in to sort it out.",
  },
];

const CoreValuesAndWhy = () => {
  return (
    <section className="border-t">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* ------------------------------------------------ Why we exist */}
        <div className="rounded-3xl border bg-muted/40 p-6 sm:p-10">
          <SectionHeading
            align="left"
            eyebrow="Why we exist"
            title="Three problems we refuse to accept as normal"
            description="Every feature on Coloship exists because one of these problems kept showing up."
            className="max-w-2xl"
          />

          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3">
            {problems.map((problem) => (
              <article
                key={problem.title}
                className="flex h-full flex-col gap-3 rounded-2xl border bg-card p-5 shadow-xs sm:p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <problem.icon className="size-5" />
                </span>

                <h3 className="text-base font-bold tracking-tight">
                  {problem.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {problem.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------- Core values */}
        <div className="mt-14 sm:mt-16">
          <SectionHeading
            align="left"
            eyebrow="Core values"
            title="What we stand for"
            description="The principles our team uses to make day-to-day decisions — on the road and behind the dashboard."
            className="max-w-2xl"
          />

          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article
                key={value.title}
                className="flex h-full flex-col gap-3 rounded-2xl border bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:p-6"
              >
                <span
                  className={`flex size-11 items-center justify-center rounded-xl ${value.tint}`}
                >
                  <value.icon className="size-5" />
                </span>

                <h3 className="text-base font-bold tracking-tight">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValuesAndWhy;
