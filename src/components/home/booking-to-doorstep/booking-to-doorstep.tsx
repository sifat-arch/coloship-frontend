const BookingToDoorstep = () => {
  return (
    <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-[1.15]">
            From booking
            <br />
            to doorstep
          </h2>
        </div>

        {/* Step Numbers & Connecting Dashed Track (Desktop/Tablet) */}
        <div className="mb-6 hidden md:grid md:grid-cols-3 md:gap-8">
          {/* Step 01 */}
          <div className="relative flex items-center">
            <span className="relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-xs font-bold text-white shadow-2xs">
              01
            </span>
            <div className="ml-3 -mr-8 flex-1 border-t-2 border-dashed border-gray-200" />
          </div>

          {/* Step 02 */}
          <div className="relative flex items-center">
            <span className="relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-xs font-bold text-white shadow-2xs">
              02
            </span>
            <div className="ml-3 -mr-8 flex-1 border-t-2 border-dashed border-gray-200" />
          </div>

          {/* Step 03 */}
          <div className="relative flex items-center">
            <span className="relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-xs font-bold text-white shadow-2xs">
              03
            </span>
          </div>
        </div>

        {/* The 3 Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Step 1: Two minutes to book */}
          <div className="flex flex-col">
            {/* Mobile Step Badge */}
            <div className="mb-3 flex items-center md:hidden">
              <span className="flex size-7 items-center justify-center rounded-full bg-neutral-950 text-xs font-bold text-white">
                01
              </span>
            </div>

            {/* Form Simulation Card */}
            <div className="flex min-h-[320px] flex-col justify-between rounded-3xl border border-gray-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:border-gray-300 sm:p-6">
              <div className="space-y-3 sm:space-y-3.5">
                {/* Receiver field */}
                <div>
                  <span className="mb-1 block text-xs font-medium text-gray-500">
                    Receiver
                  </span>
                  <div className="rounded-xl border border-gray-200/90 bg-white px-3.5 py-2 text-sm font-medium text-gray-900 shadow-2xs sm:py-2.5">
                    Sadia Rahman
                  </div>
                </div>

                {/* Phone field */}
                <div>
                  <span className="mb-1 block text-xs font-medium text-gray-500">
                    Phone
                  </span>
                  <div className="rounded-xl border border-gray-200/90 bg-white px-3.5 py-2 text-sm font-medium text-gray-900 shadow-2xs sm:py-2.5">
                    01712-345678
                  </div>
                </div>

                {/* Address field */}
                <div>
                  <span className="mb-1 block text-xs font-medium text-gray-500">
                    Address
                  </span>
                  <div className="rounded-xl border border-gray-200/90 bg-white px-3.5 py-2 text-sm font-medium text-gray-900 shadow-2xs sm:py-2.5">
                    Mirpur 10, Dhaka
                  </div>
                </div>
              </div>

              {/* Book Pickup Button */}
              <button
                type="button"
                className="mt-4 w-full rounded-xl bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-xs transition-all duration-200 hover:bg-primary/90 hover:shadow-sm sm:mt-5 sm:py-3"
              >
                Book pickup
              </button>
            </div>

            {/* Card Description */}
            <div className="mt-5 sm:mt-6">
              <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                Two minutes to book
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                A name, a phone number and an address — that is the whole form.
              </p>
            </div>
          </div>

          {/* Step 2: A rider comes to you (Dark Card with Moving Line) */}
          <div className="flex flex-col">
            {/* Mobile Step Badge */}
            <div className="mb-3 flex items-center md:hidden">
              <span className="flex size-7 items-center justify-center rounded-full bg-neutral-950 text-xs font-bold text-white">
                02
              </span>
            </div>

            {/* Dark Rider Status Card */}
            <div className="flex min-h-[320px] flex-col justify-between rounded-3xl border border-neutral-800 bg-[#0d1410] p-5 shadow-xs transition-all duration-200 sm:p-6">
              <div>
                {/* Rider Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xs font-bold text-white">
                      RI
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white sm:text-base">
                        Rafiqul Islam
                      </h4>
                      <p className="text-xs text-neutral-400">SF-R-07421</p>
                    </div>
                  </div>

                  {/* Status Pill in Primary Color */}
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary border border-primary/30">
                    On the way
                  </span>
                </div>

                {/* Continuous Moving Line under On the way */}
                <div className="mt-6">
                  <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
                    <div className="absolute h-full w-28 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)] animate-beam-slide sm:w-36" />
                  </div>
                  <p className="mt-3.5 text-xs text-neutral-300">
                    Around 4:30 PM — the rider will call first
                  </p>
                </div>
              </div>

              {/* Pickup Address Footer */}
              <div className="mt-8 flex items-center text-xs">
                <span className="mr-2 font-medium text-neutral-500">
                  Pickup
                </span>
                <span className="font-medium text-white">
                  Shop 4, New Market, Dhaka
                </span>
              </div>
            </div>

            {/* Card Description */}
            <div className="mt-5 sm:mt-6">
              <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                A rider comes to you
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Same day in Dhaka, next morning elsewhere — and the rider calls
                before arriving.
              </p>
            </div>
          </div>

          {/* Step 3: Follow it to the door */}
          <div className="flex flex-col">
            {/* Mobile Step Badge */}
            <div className="mb-3 flex items-center md:hidden">
              <span className="flex size-7 items-center justify-center rounded-full bg-neutral-950 text-xs font-bold text-white">
                03
              </span>
            </div>

            {/* Milestones Card */}
            <div className="flex min-h-[320px] flex-col justify-between rounded-3xl border border-gray-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:border-gray-300 sm:p-6">
              {/* Timeline Items */}
              <div className="relative space-y-5 pt-1">
                {/* Milestone 1: Picked up */}
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative z-10 flex size-3.5 items-center justify-center">
                      <span className="size-2.5 rounded-full bg-primary ring-4 ring-primary/20" />
                    </div>
                    <span className="text-xs font-semibold text-gray-800 sm:text-sm">
                      Picked up
                    </span>
                  </div>
                  <span className="text-xs font-medium text-gray-400">
                    11:20 AM
                  </span>

                  {/* Connecting Line to next step */}
                  <div className="absolute left-[6px] top-3.5 h-6 w-0.5 bg-primary/80" />
                </div>

                {/* Milestone 2: At the hub */}
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative z-10 flex size-3.5 items-center justify-center">
                      <span className="size-2.5 rounded-full bg-primary ring-4 ring-primary/20" />
                    </div>
                    <span className="text-xs font-semibold text-gray-800 sm:text-sm">
                      At the hub
                    </span>
                  </div>
                  <span className="text-xs font-medium text-gray-400">
                    4:05 PM
                  </span>

                  {/* Connecting Line to next step */}
                  <div className="absolute left-[6px] top-3.5 h-6 w-0.5 bg-primary/80" />
                </div>

                {/* Milestone 3: Out for delivery */}
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative z-10 flex size-3.5 items-center justify-center">
                      <span className="flex size-3.5 items-center justify-center rounded-full border-2 border-primary bg-white">
                        <span className="size-1.5 rounded-full bg-primary" />
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-900 sm:text-sm">
                      Out for delivery
                    </span>
                  </div>
                  <span className="text-xs font-medium text-gray-400">
                    9:10 AM
                  </span>
                </div>
              </div>

              {/* SMS Notification Banner */}
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-xs font-medium text-primary">
                An SMS went out at every step
              </div>
            </div>

            {/* Card Description */}
            <div className="mt-5 sm:mt-6">
              <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                Follow it to the door
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                An SMS at every scan, and a link your receiver can open without
                an account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingToDoorstep;
