"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import SectionHeading from "./section-heading";

const testimonials = [
  {
    name: "Nusrat Jahan",
    role: "Online seller · Dhaka",
    initials: "NJ",
    tint: "bg-blue-500/10 text-blue-600",
    rating: 5,
    quote:
      "My customers get their parcels quickly and COD is settled without me chasing anyone. Tracking links mean far fewer “where is my order?” messages.",
  },
  {
    name: "Rakib Hasan",
    role: "Pharmacy owner · Chattogram",
    initials: "RH",
    tint: "bg-emerald-500/10 text-emerald-600",
    rating: 5,
    quote:
      "Booking takes under a minute and a courier arrives the same day. The milestone updates let our staff prepare the order before delivery.",
  },
  {
    name: "Tanvir Ahmed",
    role: "Operations lead · Sylhet",
    initials: "TA",
    tint: "bg-amber-500/10 text-amber-600",
    rating: 5,
    quote:
      "We move hundreds of parcels a month. Express genuinely feels faster, and when something needs attention a real person answers.",
  },
  {
    name: "Farzana Akter",
    role: "Boutique owner · Rajshahi",
    initials: "FA",
    tint: "bg-rose-500/10 text-rose-600",
    rating: 5,
    quote:
      "Next-day settlement has completely transformed our cash flow. We never have to follow up or worry about lost parcels.",
  },
  {
    name: "Mahinur Rahman",
    role: "Electronics dealer · Khulna",
    initials: "MR",
    tint: "bg-violet-500/10 text-violet-600",
    rating: 5,
    quote:
      "The doorstep pickup is punctual every single time. Their live tracking link sent via SMS keeps our customers calm and happy.",
  },
  {
    name: "Sadia Kabir",
    role: "E-commerce merchant · Barishal",
    initials: "SK",
    tint: "bg-teal-500/10 text-teal-600",
    rating: 5,
    quote:
      "Hands down the most reliable courier partner in Bangladesh. Their customer support team resolves any hub delay proactively.",
  },
];

const ratingStars = [1, 2, 3, 4, 5];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  // Auto-slide every 4.5 seconds
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <section className="border-b bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by people who ship every day"
          description="Sellers, pharmacies and operations teams who rely on Coloship for their daily deliveries."
        />

        {/* Carousel Container */}
        <section
          aria-roledescription="carousel"
          aria-label="Customer Testimonials"
          className="relative mt-10 sm:mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="w-full shrink-0 px-2.5 sm:w-1/2 lg:w-1/3"
                >
                  <figure className="flex h-full flex-col justify-between rounded-2xl border bg-card p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                    <div>
                      {/* Rating Stars */}
                      <div
                        role="img"
                        className="flex items-center gap-0.5 text-amber-500"
                        aria-label={`${testimonial.rating} out of 5 stars`}
                      >
                        {ratingStars.map((star) => (
                          <Star key={star} className="size-4 fill-current" />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground sm:text-[14.5px]">
                        “{testimonial.quote}”
                      </blockquote>
                    </div>

                    {/* Author Details */}
                    <figcaption className="mt-6 flex items-center gap-3 border-t pt-4">
                      <span
                        className={`flex size-10 items-center justify-center rounded-full text-xs font-bold ${testimonial.tint}`}
                      >
                        {testimonial.initials}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls (Arrows + Pagination Dots) */}
          <div className="mt-8 flex items-center justify-center gap-4">
            {/* Prev Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-2xs transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-4.5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={`testimonial-page-${idx + 1}`}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-7 bg-primary"
                      : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={handleNext}
              className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-2xs transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-4.5" />
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Testimonials;
