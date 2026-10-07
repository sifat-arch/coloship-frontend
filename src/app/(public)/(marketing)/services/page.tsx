import type { Metadata } from "next";
import ServiceFeatures from "@/components/marketing-components/services/ServiceFeatures";
import ServiceGrid from "@/components/marketing-components/services/ServiceGrid";
import ServicesHero from "@/components/marketing-components/services/ServicesHero";
import FirstEverywhere from "@/components/home/first-everywhere";
import FadeInWhenVisible from "@/components/ui/fade-in-when-visible";

export const metadata: Metadata = {
  title: "Services | Coloship — Courier & Parcel Delivery",
  description:
    "Explore Coloship delivery services: Express Delivery, Standard Shipping, Same-Day Delivery, Cash on Delivery, corporate logistics and bKash payments across all 64 districts of Bangladesh.",
};

const ServicesPage = () => {
  return (
    <>
      <FadeInWhenVisible delay={0.1}>
        <ServicesHero />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <ServiceGrid />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <ServiceFeatures />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <FirstEverywhere />
      </FadeInWhenVisible>
    </>
  );
};

export default ServicesPage;
