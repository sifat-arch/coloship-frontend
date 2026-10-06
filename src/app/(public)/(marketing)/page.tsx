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

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <TrustStats />

      <HowItWorks />
      <WhyChooseUs />
      <CoverageSection />
      {/* <ParcelTracking /> */}
      <Testimonials />
      <WhoShipsWithUs />
      <FaqSection />
      <BookingToDoorstep />
      <FirstEverywhere />
    </>
  );
};

export default HomePage;
