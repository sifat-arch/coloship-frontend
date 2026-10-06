import type { Metadata } from "next";
import ServiceCta from "@/components/marketing-components/services/ServiceCta";
import ServiceFeatures from "@/components/marketing-components/services/ServiceFeatures";
import ServiceGrid from "@/components/marketing-components/services/ServiceGrid";
import ServicesHero from "@/components/marketing-components/services/ServicesHero";

export const metadata: Metadata = {
  title: "Services | Coloship — Courier & Parcel Delivery",
  description:
    "Explore Coloship delivery services: Express Delivery, Standard Shipping, Same-Day Delivery, Cash on Delivery, corporate logistics and bKash payments across all 64 districts of Bangladesh.",
};

// Header and Footer come from the (marketing) layout wrapper.
const ServicesPage = () => {
  return (
    <>
      <ServicesHero />
      <ServiceGrid />
      <ServiceFeatures />
      <ServiceCta />
    </>
  );
};

export default ServicesPage;
