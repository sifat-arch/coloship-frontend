import type { Metadata } from "next";
import ServiceFeatures from "@/components/marketing-components/services/ServiceFeatures";
import ServiceGrid from "@/components/marketing-components/services/ServiceGrid";
import ServicesHero from "@/components/marketing-components/services/ServicesHero";
import FirstEverywhere from "@/components/home/first-everywhere";
import FadeInWhenVisible from "@/components/ui/fade-in-when-visible";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Coloship delivery services: Express Delivery, Standard Shipping, Same-Day Delivery, Cash on Delivery, corporate logistics and bKash payments across all 64 districts of Bangladesh.",
  openGraph: {
    title: "Our Services | Coloship",
    description:
      "Express Delivery, Standard Shipping, Cash on Delivery, corporate logistics and reliable courier solutions nationwide.",
    url: "/services",
    siteName: "Coloship",
    images: [
      {
        url: "/hero-section-background.png",
        width: 1200,
        height: 630,
        alt: "Coloship Courier Services",
      },
    ],
  },
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
