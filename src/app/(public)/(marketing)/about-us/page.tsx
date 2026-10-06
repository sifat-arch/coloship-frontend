import AboutHero from "@/components/marketing-components/about/AboutHero";
import CoreValuesAndWhy from "@/components/marketing-components/about/CoreValuesAndWhy";
import OperationsAndCoverage from "@/components/marketing-components/about/OperationsAndCoverage";
import TrustAndCta from "@/components/marketing-components/about/TrustAndCta";
import WhoWeAreAndMission from "@/components/marketing-components/about/WhoWeAreAndMission";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Coloship — Courier & Parcel Delivery",
  description:
    "Coloship is a courier and parcel delivery platform connecting all 64 districts of Bangladesh with verified couriers, live tracking, cash on delivery and bKash payments.",
};

const AboutUs = () => {
  return (
    <>
      <AboutHero />
      <WhoWeAreAndMission />
      <CoreValuesAndWhy />
      <OperationsAndCoverage />
      <TrustAndCta />
    </>
  );
};

export default AboutUs;
