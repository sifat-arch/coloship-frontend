import Image from "next/image";

interface BrandItem {
  name: string;
  logo: string;
}

interface AccreditationItem {
  title: string;
  description: string;
  logo: string;
}

// Row 1: Forward direction (------>)
const row1Logos: BrandItem[] = [
  { name: "Walton", logo: "/us/walton.jpg" },
  { name: "Apex", logo: "/us/apex.jpg" },
  { name: "Rokomari", logo: "/us/rokomari.jpg" },
  { name: "othoba.com", logo: "/us/othoba.jpg" },
  { name: "LOTTO", logo: "/us/lotto.jpg" },
  { name: "sailor", logo: "/us/sailor.jpg" },
  { name: "Jamuna Electronics & Automobiles", logo: "/us/jamuna.jpg" },
  { name: "IFAD MOTORS LIMITED", logo: "/us/ifad.jpg" },
  { name: "NATURO", logo: "/us/naturo.jpg" },
  { name: "Halal Food", logo: "/us/sm-halal-food.jpg" },
  { name: "GHORER BAZAR", logo: "/us/ghorer-bazar.jgp.webp" },
  { name: "আকাশ", logo: "/us/akash.jpg" },
  { name: "HT Bazar An Online Hyper Market", logo: "/us/ht-bazar.jpg" },
  { name: "SANVEE'S", logo: "/us/sanvees.jpg" },
  { name: "aponzone AGRO", logo: "/us/aponzone-agro.jpg" },
];

// Row 2: Backward direction (<------)
const row2Logos: BrandItem[] = [
  { name: "aponzone AGRO", logo: "/us/aponzone-agro.jpg" },
  { name: "SANVEE'S", logo: "/us/sanvees.jpg" },
  { name: "HT Bazar An Online Hyper Market", logo: "/us/ht-bazar.jpg" },
  { name: "আকাশ", logo: "/us/akash.jpg" },
  { name: "GHORER BAZAR", logo: "/us/ghorer-bazar.jgp.webp" },
  { name: "Halal Food", logo: "/us/sm-halal-food.jpg" },
  { name: "NATURO", logo: "/us/naturo.jpg" },
  { name: "IFAD MOTORS LIMITED", logo: "/us/ifad.jpg" },
  { name: "Jamuna Electronics & Automobiles", logo: "/us/jamuna.jpg" },
  { name: "sailor", logo: "/us/sailor.jpg" },
  { name: "LOTTO", logo: "/us/lotto.jpg" },
  { name: "othoba.com", logo: "/us/othoba.jpg" },
  { name: "Rokomari", logo: "/us/rokomari.jpg" },
  { name: "Apex", logo: "/us/apex.jpg" },
  { name: "Walton", logo: "/us/walton.jpg" },
];

const accreditations: AccreditationItem[] = [
  {
    title: "GPO licensed",
    description: "A licensed courier service of the GPO.",
    logo: "/us/gpo.jpg",
  },
  {
    title: "CSAB member",
    description: "Courier Services Association of Bangladesh.",
    logo: "/us/csab.jpg",
  },
  {
    title: "ECAB member",
    description: "E-Commerce Association of Bangladesh.",
    logo: "/us/ecab.jpg",
  },
];

const WhoShipsWithUs = () => {
  return (
    <section className="border-b bg-background py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Who ships with us
            </h2>
          </div>
          <p className="shrink-0 text-xs leading-relaxed text-muted-foreground sm:text-[13px] md:text-sm sm:text-right">
            <span className="block sm:whitespace-nowrap">
              The country&apos;s larger brands and marketplaces move
            </span>
            <span className="block sm:whitespace-nowrap">
              parcels on this network every day.
            </span>
          </p>
        </div>

        {/* Dual Marquee Rows */}
        <div className="relative -mx-4 overflow-hidden py-3 sm:-mx-6 lg:-mx-8">
          {/* Subtle gradient edges on left and right for seamless fading */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28 md:w-36" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28 md:w-36" />

          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Row 1: Left to Right (------>) */}
            <div className="flex w-max animate-marquee-forward pause-on-hover gap-4 sm:gap-5">
              {[...row1Logos, ...row1Logos].map((brand, idx) => (
                <div
                  key={`row1-${brand.name}-${idx}`}
                  className="group flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-gray-200/90 bg-white p-4 shadow-2xs transition-all duration-200 hover:border-gray-300 hover:shadow-xs sm:h-24 sm:w-52 md:h-26 md:w-56"
                >
                  <div className="relative flex h-10 w-full items-center justify-center sm:h-12">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={160}
                      height={50}
                      className="max-h-8 w-auto max-w-[110px] select-none object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-10 sm:max-w-[130px]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: Right to Left (<------) */}
            <div className="flex w-max animate-marquee-backward pause-on-hover gap-4 sm:gap-5">
              {[...row2Logos, ...row2Logos].map((brand, idx) => (
                <div
                  key={`row2-${brand.name}-${idx}`}
                  className="group flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-gray-200/90 bg-white p-4 shadow-2xs transition-all duration-200 hover:border-gray-300 hover:shadow-xs sm:h-24 sm:w-52 md:h-26 md:w-56"
                >
                  <div className="relative flex h-10 w-full items-center justify-center sm:h-12">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={160}
                      height={50}
                      className="max-h-8 w-auto max-w-[110px] select-none object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-10 sm:max-w-[130px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* On the record Section */}
        <div className="mt-16 sm:mt-20">
          <h3 className="mb-6 text-xl font-bold tracking-tight text-foreground sm:mb-8 sm:text-2xl">
            On the record
          </h3>

          <div className="border-t border-gray-200/90 pt-6 sm:pt-8">
            <div className="grid grid-cols-1 divide-y divide-gray-200/80 md:grid-cols-3 md:divide-y-0 md:divide-x">
              {accreditations.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex items-center gap-3.5 py-4 sm:gap-4 sm:py-5 md:py-2 ${
                    index === 0
                      ? "md:pr-6 lg:pr-8"
                      : index === 1
                        ? "md:px-6 lg:px-8"
                        : "md:pl-6 lg:pl-8"
                  }`}
                >
                  {/* Accreditation Badge */}
                  <div className="flex h-12 w-14 shrink-0 items-center justify-center rounded-xl border border-gray-200/90 bg-white p-2 shadow-2xs sm:h-13 sm:w-16">
                    <Image
                      src={item.logo}
                      alt={item.title}
                      width={64}
                      height={40}
                      className="max-h-8 w-auto max-w-full select-none object-contain"
                    />
                  </div>

                  {/* Text Details */}
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoShipsWithUs;
