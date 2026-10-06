import { Truck, Warehouse, ScanLine, Wallet } from "lucide-react";
import DeliveryAnimation from "./delivery-animation";
import { Lottie } from "lottie-react";

const deliverySteps = [
  {
    icon: Truck,
    title: "Pickup every day",
    description:
      "No cap on volume. A rider comes to your shop and scans each parcel out.",
  },
  {
    icon: Warehouse,
    title: "Routed through a hub",
    description: "Every parcel passes a divisional hub, scanned end to end.",
  },
  {
    icon: ScanLine,
    title: "A scan at every step",
    description:
      "Pickup, hub, out-for-delivery, handover — each one lands in the system.",
  },
  {
    icon: Wallet,
    title: "Payout the next day",
    description:
      "We collect the cash, the dashboard reconciles it, the money moves to your bank.",
  },
];

const HowItWorks = () => {
  return (
    <section
      aria-label="The road a parcel actually takes"
      className="border-b bg-[#bce2f1] py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header Section */}
        <div className="flex flex-col justify-between gap-6 pb-16 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              The road a parcel actually takes
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
              Pickup to hub, hub to doorstep — a person and a scan at every
              step.
            </p>
          </div>
        </div>

        {/* Main Content Grid: Left Animation & Right Steps */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side: Delivery Animation Box */}
          <div className="flex justify-start">
            <Lottie
              src="/animation/factory.json"
              loop={true}
              autoplay={true}
              className="w-full h-full max-h-52 object-contain pointer-events-none drop-shadow-md"
            />
          </div>

          {/* Right Side: Step-by-Step List with Vertical Timeline */}
          <div className="relative flex flex-col gap-8 pl-4 sm:pl-6">
            {/* Vertical connecting dotted line */}
            <div className="absolute left-[27px] top-6 bottom-6 border-l-2 border-dashed border-primary sm:left-[31px]" />

            {deliverySteps.map((step) => (
              <div
                key={step.title}
                className="relative flex items-start gap-5 group"
              >
                {/* Step Icon */}
                <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl text-primary bg-card border border-primary-foreground -700 shadow-xs">
                  <step.icon className="size-5 stroke-[1.8]" />
                </div>

                {/* Step Details */}
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
