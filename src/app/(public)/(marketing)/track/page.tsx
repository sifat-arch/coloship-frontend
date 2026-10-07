import React from "react";
import FirstEverywhere from "@/components/home/first-everywhere";
import ParcelTracking from "@/components/marketing-components/home/parcel-tracking";
import FadeInWhenVisible from "@/components/ui/fade-in-when-visible";

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
