import AboutAnimation from "./about-animation";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden border-b bg-background py-16 sm:py-20 lg:py-28">
      {/* Background ambient decorative glow using primary color */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 size-[400px] rounded-full bg-primary/10 blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-32 size-[380px] -translate-y-1/2 rounded-full bg-primary/5 blur-3xl -z-10"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Heading and Text */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[54px] lg:leading-[1.15]">
              Since 2016, to every <br className="hidden sm:inline" />
              doorstep in the country
            </h1>

            <div className="mt-8 space-y-5 text-muted-foreground text-base sm:mt-10 sm:space-y-6 sm:text-lg leading-relaxed max-w-2xl">
              <p>
                Coloship Courier is one of the largest e-commerce logistics
                networks in Bangladesh: daily pickup, cash on delivery and
                next-day payout, for a single shop and for national brands
                alike.
              </p>

              <p>
                In every one of the 64 districts, from upazila towns down to the
                union: one network, scanned at every step.
              </p>
            </div>
          </div>

          {/* Right Column: Lottie Animation with Primary Theme */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Backlight Glow with Primary Color */}
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-2xl -z-10"
              />

              {/* Card Container styled with Project's Primary Color */}
              <div className="relative flex items-center justify-center overflow-hidden rounded-3xl sm:rounded-[2.5rem] border border-primary/15 bg-gradient-to-br from-primary/[0.08] via-primary/[0.03] to-muted/20 p-4 sm:p-8 md:p-10 shadow-sm backdrop-blur-xs transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                <AboutAnimation
                  src="/animation/hero-about.json"
                  className="w-full max-w-[460px] h-[280px] sm:h-[350px] lg:h-[400px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
