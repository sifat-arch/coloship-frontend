"use client";

import { Headset } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import SectionHeading from "./section-heading";

const faqs = [
  {
    id: "booking",
    question: "How can I book a parcel?",
    answer:
      "Create an account, open Book a Parcel, add your pickup and delivery addresses, enter the parcel weight and choose a delivery type. Once you confirm, a verified courier is assigned for pickup.",
  },
  {
    id: "tracking",
    question: "How can I track my parcel?",
    answer:
      "Enter your tracking number (for example CS-829104) in any Track Parcel field. You will see the current status, the full milestone timeline and the route your shipment has taken.",
  },
  {
    id: "duration",
    question: "How long does delivery take?",
    answer:
      "Express parcels are prioritised between hubs for the fastest possible route, while Standard delivery is the everyday option. Timing depends on the pickup and delivery district, and you can follow the exact progress on the tracking timeline.",
  },
  {
    id: "cod",
    question: "Do you provide Cash on Delivery?",
    answer:
      "Yes. Select Cash on Delivery while booking and the COD amount is collected from your buyer at the door. The delivery fee itself can be paid online with bKash.",
  },
  {
    id: "coverage",
    question: "Which areas do you cover?",
    answer:
      "We cover all 64 districts across 8 divisions of Bangladesh, with doorstep pickup and delivery in major cities and hubs nationwide.",
  },
  {
    id: "support",
    question: "How can I contact support?",
    answer:
      "Email support@coloship.com and our team will get back to you. For anything urgent about a live shipment, include the tracking number so we can jump straight to it.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="flex flex-col gap-6">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Questions, answered"
              description="Everything you need to know before you send your first parcel."
            />

            <div className="rounded-2xl border bg-muted/40 p-5">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Headset className="size-5" />
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">
                    Still have a question?
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Our support team is happy to help with bookings, tracking
                    and COD settlements.
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                className="mt-4 h-9 w-full gap-2 bg-background font-semibold"
                nativeButton={false}
                render={
                  <Link href="mailto:support@coloship.com">
                    Contact support
                  </Link>
                }
              />
            </div>
          </div>

          <Accordion
            defaultValue={["booking"]}
            className="rounded-2xl border bg-card px-5 shadow-xs"
          >
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="py-4 text-[15px]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pr-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
