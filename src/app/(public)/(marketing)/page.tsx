import type { Metadata } from "next";
import BookingToDoorstep from "@/components/home/booking-to-doorstep";
import FirstEverywhere from "@/components/home/first-everywhere";
import WhoShipsWithUs from "@/components/home/us";
import CoverageSection from "@/components/marketing-components/home/coverage-section";
import FaqSection from "@/components/marketing-components/home/faq-section";
import HeroSection from "@/components/marketing-components/home/hero-section";
import HowItWorks from "@/components/marketing-components/home/how-it-works";
import Testimonials from "@/components/marketing-components/home/testimonials";
import TrustStats from "@/components/marketing-components/home/trust-stats";
import WhyChooseUs from "@/components/marketing-components/home/why-choose-us";
import FadeInWhenVisible from "@/components/ui/fade-in-when-visible";

export const metadata: Metadata = {
  title: "Coloship — Fast Courier & Parcel Delivery in Bangladesh",
  description:
    "Fast, reliable courier and parcel delivery across 64 districts with instant booking, live tracking, doorstep pickup, and secure bKash payments.",
  openGraph: {
    title: "Coloship — Courier & Parcel Delivery",
    description:
      "Reliable parcel delivery and courier network in Bangladesh. Book, track, and manage shipments seamlessly.",
    url: "/",
    siteName: "Coloship",
    images: [
      {
        url: "/hero-section-background.png",
        width: 1200,
        height: 630,
        alt: "Coloship Logistics Network",
      },
    ],
  },
};

const HomePage = () => {
  return (
    <>
      <FadeInWhenVisible delay={0.1}>
        <HeroSection />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <TrustStats />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <HowItWorks />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <WhyChooseUs />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <CoverageSection />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <Testimonials />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <WhoShipsWithUs />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <FaqSection />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <BookingToDoorstep />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <FirstEverywhere />
      </FadeInWhenVisible>
    </>
  );
};

export default HomePage;
