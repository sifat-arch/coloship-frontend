import type { Metadata } from "next";
import ContactSection from "@/components/marketing-components/contact/ContactSection";
import FirstEverywhere from "@/components/home/first-everywhere";
import FadeInWhenVisible from "@/components/ui/fade-in-when-visible";

export const metadata: Metadata = {
  title: "Contact Us | Coloship — Courier & Parcel Delivery",
  description:
    "Get in touch with Coloship support via hotline, email, WhatsApp, or visit our head office in Dhanmondi, Dhaka.",
};

const ContactPage = () => {
  return (
    <main className="flex flex-col">
      <FadeInWhenVisible delay={0.1}>
        <ContactSection />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <FirstEverywhere />
      </FadeInWhenVisible>
    </main>
  );
};

export default ContactPage;
