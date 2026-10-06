"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// কাউন্ট-আপ অ্যানিমেশনের জন্য হুক বা কম্পোনেন্ট
function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 1500; // ১.৫ সেকেন্ডে অ্যানিমেশন শেষ হবে

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // ইজিং ইফেক্ট
      const currentCount = Math.floor(end * percentage);
      setCount(currentCount);

      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [end]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const statsColumn1 = [
  { value: 1000, suffix: "+", label: "delivery points" },
  { value: 8, suffix: "", label: "divisions" },
  { value: 495, suffix: "", label: "upazilas" },
];

const statsColumn2 = [
  { value: 7500, suffix: "+", label: "delivery personnel" },
  { value: 64, suffix: "", label: "districts" },
  { value: 330, suffix: "", label: "municipalities" },
];

const CoverageNetworkSection = () => {
  return (
    <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Top Header Section */}
        <div className="flex flex-col justify-between gap-6 pb-16 lg:flex-row lg:items-start">
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl leading-tight">
              Steadfast, across <br /> the country
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-zinc-400 sm:text-base leading-relaxed">
              Every dot is an upazila. The amber ones are the eight divisional
              hubs every parcel routes through.
            </p>
          </div>
        </div>

        {/* Main Grid: Left Map & Right Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Map Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-3xl bg-[#121614] border border-zinc-800 p-6 shadow-2xl">
              {/* Network Live Badge */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full bg-zinc-900/80 px-3 py-1.5 shadow-md backdrop-blur-md border border-zinc-800">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-zinc-200">
                  Network live
                </span>
              </div>

              {/* SVG Map Image from public folder */}
              <div className="relative w-full aspect-[4/5] flex items-center justify-center pt-8">
                <img
                  src="/network-map.svg"
                  alt="Bangladesh Network Map"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Map Footer Note */}
              <div className="mt-4 pt-4 border-t border-zinc-800/60 text-[11px] text-zinc-500">
                Routes shown are illustrative. Boundaries © geoBoundaries, CC BY
                4.0
              </div>
            </div>

            {/* Coverage Button */}
            <div>
              <Link
                href="#coverage"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-5 py-2.5 text-sm font-semibold text-zinc-200 backdrop-blur-sm transition-all hover:bg-zinc-800 hover:border-zinc-700 group"
              >
                <span>Coverage</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 text-zinc-400" />
              </Link>
            </div>
          </div>

          {/* Right Side: Stats Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 lg:pl-8 pt-4">
            {/* Column 1 */}
            <div className="flex flex-col gap-10">
              {statsColumn1.map((stat, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div
                  key={idx}
                  className={`flex flex-col ${idx !== statsColumn1.length - 1 ? "border-b border-zinc-800/80 pb-10" : ""}`}
                >
                  <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-10">
              {statsColumn2.map((stat, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div
                  key={idx}
                  className={`flex flex-col ${idx !== statsColumn2.length - 1 ? "border-b border-zinc-800/80 pb-10" : ""}`}
                >
                  <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageNetworkSection;
