import type { Metadata } from "next";
import React from "react";
import FirstEverywhere from "@/components/home/first-everywhere";
import ParcelTracking from "@/components/marketing-components/home/parcel-tracking";
import FadeInWhenVisible from "@/components/ui/fade-in-when-visible";

export const metadata: Metadata = {
  title: "Track Your Parcel",
  description:
    "Track your Coloship parcel in real-time. Enter your tracking number to view current parcel journey, location, and estimated delivery status.",
  openGraph: {
    title: "Track Your Parcel | Coloship",
    description:
      "Real-time shipment tracking across Bangladesh. Enter tracking ID to check parcel status.",
    url: "/track",
    siteName: "Coloship",
    images: [
      {
        url: "/hero-section-background.png",
        width: 1200,
        height: 630,
        alt: "Coloship Parcel Tracking",
      },
    ],
  },
};

const Track = () => {
  return (
    <div>
      <FadeInWhenVisible delay={0.1}>
        <ParcelTracking />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <FirstEverywhere />
      </FadeInWhenVisible>
    </div>
  );
};

export default Track;
