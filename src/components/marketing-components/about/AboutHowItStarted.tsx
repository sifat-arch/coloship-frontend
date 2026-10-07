import AboutAnimation from "./about-animation";

const AboutHowItStarted = () => {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: History Narrative */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              How it started
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
              It began in Dhaka in 2016 with a handful of riders and one
              promise: arrive when we said we would. Today eight divisional
              hubs, a thousand delivery points and 7,500 people keep that same
              promise.
            </p>
          </div>

          {/* Right Column: Lottie Animation with Primary Palette */}
          <div className="flex justify-center lg:col-span-6 lg:justify-end">
            <div className="relative w-full max-w-xl">
              {/* Primary backlight glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-2xl -z-10"
              />

              {/* Rounded card using Project Primary theme */}
              <div className="relative flex items-center justify-center overflow-hidden rounded-3xl sm:rounded-[2.5rem] border border-primary/15 bg-gradient-to-br from-primary/[0.08] via-primary/[0.03] to-muted/20 p-4 sm:p-8 shadow-sm backdrop-blur-xs transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                <AboutAnimation
                  src="/animation/delevery-service-lotty.json"
                  className="h-[260px] w-full max-w-[460px] sm:h-[320px] lg:h-[360px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHowItStarted;
