import Image from "next/image";

const licences = [
  {
    logo: "/us/gpo.jpg",
    title: "GPO licensed",
    description: "A licensed courier service of the GPO.",
  },
  {
    logo: "/us/csab.jpg",
    title: "CSAB member",
    description: "Courier Services Association of Bangladesh.",
  },
  {
    logo: "/us/ecab.jpg",
    title: "ECAB member",
    description: "E-Commerce Association of Bangladesh.",
  },
];

const AboutLicences = () => {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Licences and memberships
        </h2>

        <div className="mt-8 grid grid-cols-1 divide-y divide-border rounded-3xl border border-border/80 bg-card sm:mt-10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {licences.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 p-6 sm:p-8 transition-colors hover:bg-muted/10"
            >
              <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-background p-1.5">
                <Image
                  src={item.logo}
                  alt={item.title}
                  width={56}
                  height={56}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div>
                <h3 className="text-base font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutLicences;
