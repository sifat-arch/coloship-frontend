"use client";

import Link from "next/link";

const FirstEverywhere = () => {
  return (
    <section className="bg-[#bce2f1] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
          First, everywhere.
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-sm text-neutral-700 sm:mt-4 sm:text-base">
          Book today: same day in Dhaka, tomorrow everywhere else.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
          {/* Become a merchant Button - Navigates to Login */}
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs transition-all duration-200 hover:bg-primary/90 hover:shadow-sm sm:px-7 sm:py-3"
          >
            Become a merchant
          </Link>

          {/* For business Button - Outline button with no navigation */}
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-neutral-900/20 bg-white/80 px-6 py-2.5 text-sm font-semibold text-neutral-900 shadow-2xs transition-all duration-200 hover:bg-white hover:border-neutral-900/30 sm:px-7 sm:py-3"
          >
            For business
          </button>
        </div>
      </div>
    </section>
  );
};

export default FirstEverywhere;
