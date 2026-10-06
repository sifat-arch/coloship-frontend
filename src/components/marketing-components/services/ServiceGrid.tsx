import {
  Banknote,
  Building2,
  Check,
  CreditCard,
  Timer,
  Truck,
  Zap,
} from "lucide-react";
import SectionHeading from "../home/section-heading";

const services = [
  {
    icon: Zap,
    tint: "bg-blue-500/10 text-blue-600",
    badge: "Fastest",
    title: "Express Delivery",
    description:
      "Priority handling for parcels that can’t wait — routed ahead of regular shipments.",
    features: [
      "Priority handling between hubs",
      "Same-day pickup in major cities",
      "Tracked at every milestone",
    ],
  },
  {
    icon: Truck,
    tint: "bg-emerald-500/10 text-emerald-600",
    badge: "Most popular",
    title: "Standard Shipping",
    description:
      "Reliable, affordable delivery for everyday orders and regular shop shipments.",
    features: [
      "Doorstep pickup and delivery",
      "Weight-based delivery fee",
      "Ideal for daily order volume",
    ],
  },
  {
    icon: Timer,
    tint: "bg-rose-500/10 text-rose-600",
    badge: "Urgent",
    title: "Same-Day Delivery",
    description:
      "For parcels that have to reach the same city today — picked up and delivered within the day.",
    features: [
      "Within-city shipments",
      "Same-day pickup window",
      "Live status until handover",
    ],
  },
  {
    icon: Banknote,
    tint: "bg-amber-500/10 text-amber-600",
    badge: "For sellers",
    title: "Cash on Delivery",
    description:
      "Collect cash from your buyer at the door and have it settled back to you after delivery.",
    features: [
      "COD amount recorded per parcel",
      "Cash collected at the door",
      "Clear settlement trail",
    ],
  },
  {
    icon: Building2,
    tint: "bg-violet-500/10 text-violet-600",
    badge: "Business",
    title: "Corporate Logistics",
    description:
      "For teams shipping in volume — scheduled pickups and one dashboard for every shipment.",
    features: [
      "Scheduled bulk pickups",
      "Central dashboard for shipments",
      "Transparent weight-based pricing",
    ],
  },
  {
    icon: CreditCard,
    tint: "bg-sky-500/10 text-sky-600",
    badge: "Convenient",
    title: "bKash Online Payment",
    description:
      "Pay the delivery fee online with bKash — no cash handovers, instant payment status.",
    features: [
      "Pay during booking checkout",
      "Instant payment status",
      "Works with every service",
    ],
  },
];

const ServiceGrid = () => {
  return (
    <section id="services-grid" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Our services"
          title="Pick the service that fits the shipment"
          description="Same network, same tracking, different speeds and payment options — switch between them booking by booking."
        />

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="flex h-full flex-col gap-4 rounded-2xl border bg-card p-5 shadow-xs transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`flex size-11 items-center justify-center rounded-xl ${service.tint}`}
                >
                  <service.icon className="size-5" />
                </span>
                <span className="rounded-full border bg-background px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  {service.badge}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base font-bold tracking-tight sm:text-lg">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>

              <ul className="mt-auto flex flex-col gap-2 border-t pt-4 text-[13px] text-muted-foreground">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
