import {
  HandCoins,
  Headset,
  MapPin,
  Navigation,
  ShieldCheck,
  Zap,
} from "lucide-react";
import SectionHeading from "./section-heading";

const benefits = [
  {
    icon: Zap,
    tint: "bg-blue-500/10 text-blue-600",
    title: "Fast Delivery",
    description:
      "Express parcels get priority routing between hubs, so urgent shipments move first.",
  },
  {
    icon: Navigation,
    tint: "bg-violet-500/10 text-violet-600",
    title: "Real-time Tracking",
    description:
      "Every scan and milestone lands on a live timeline — for you and for your customer.",
  },
  {
    icon: ShieldCheck,
    tint: "bg-emerald-500/10 text-emerald-600",
    title: "Secure Handling",
    description:
      "Background-checked couriers, careful hub handling and a clear chain of custody.",
  },
  {
    icon: MapPin,
    tint: "bg-rose-500/10 text-rose-600",
    title: "Nationwide Coverage",
    description:
      "Doorstep pickup and delivery across all 64 districts of Bangladesh.",
  },
  {
    icon: HandCoins,
    tint: "bg-amber-500/10 text-amber-600",
    title: "Cash on Delivery",
    description:
      "Collect payment from your buyer at the door and get it settled back to you.",
  },
  {
    icon: Headset,
    tint: "bg-sky-500/10 text-sky-600",
    title: "Human Support",
    description:
      "Real people step in when a parcel needs attention — not just a chatbot.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="border-b">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Why choose us"
          title="Built to make shipping the easy part"
          description="The details that matter when your customers, your stock and your reputation are all on the line."
        />

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="flex flex-col gap-3 rounded-2xl border bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:p-6"
            >
              <span
                className={`flex size-11 items-center justify-center rounded-xl ${benefit.tint}`}
              >
                <benefit.icon className="size-5" />
              </span>

              <h3 className="text-base font-bold tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
