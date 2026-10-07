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
