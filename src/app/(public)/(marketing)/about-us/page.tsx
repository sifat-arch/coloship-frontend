import type { Metadata } from "next";
import AboutHero from "@/components/marketing-components/about/AboutHero";
import AboutHowItStarted from "@/components/marketing-components/about/AboutHowItStarted";
import AboutLeadership from "@/components/marketing-components/about/AboutLeadership";
import AboutLicences from "@/components/marketing-components/about/AboutLicences";
import AboutStatsAndMission from "@/components/marketing-components/about/AboutStatsAndMission";
import AboutWhatWeDo from "@/components/marketing-components/about/AboutWhatWeDo";
import FirstEverywhere from "@/components/home/first-everywhere";
import FadeInWhenVisible from "@/components/ui/fade-in-when-visible";

export const metadata: Metadata = {
  title: "About Us | Coloship — Courier & Parcel Delivery",
  description:
    "Coloship is a premier courier and logistics network connecting all 64 districts of Bangladesh with fast delivery, real-time tracking, COD, and seamless merchant services.",
};

const AboutUs = () => {
  return (
    <main className="flex flex-col">
      <FadeInWhenVisible delay={0.1}>
        <AboutHero />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <AboutStatsAndMission />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <AboutWhatWeDo />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <AboutHowItStarted />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <AboutLeadership />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <AboutLicences />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <FirstEverywhere />
      </FadeInWhenVisible>
    </main>
  );
};

export default AboutUs;
