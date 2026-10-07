import Image from "next/image";

const leaders = [
  {
    name: "KM Reidwanul Bari Zion",
    role: "Founder and Managing Director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Founded Coloship in Dhaka in 2016 and has run it day to day ever since, from a handful of riders to a network that now reaches every district.",
    quote:
      "Our job is to make delivery easy, reliable and delightful for e-commerce entrepreneurs.",
  },
  {
    name: "Joieria Mostary",
    role: "Chairman",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "As Chairman, Joieria Mostary leads the board of Coloship and, with it, the company's long-term direction: where the network grows next, how it invests in its people and hubs, and the standard it holds itself to on every delivery.",
  },
];

const AboutLeadership = () => {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Leadership
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 lg:grid-cols-2">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="flex flex-col gap-6 rounded-3xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/30 hover:shadow-sm sm:flex-row sm:items-start"
            >
              {/* Leader Photo */}
              <div className="relative h-44 w-36 shrink-0 overflow-hidden rounded-2xl bg-muted/30 sm:h-48 sm:w-40">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  width={160}
                  height={192}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Bio & Details */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {leader.role}
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-foreground">
                    {leader.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {leader.bio}
                  </p>
                </div>

                {leader.quote && (
                  <div className="mt-4 border-l-2 border-primary pl-3 py-0.5 text-xs italic text-foreground/80 sm:text-sm">
                    &ldquo;{leader.quote}&rdquo;
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutLeadership;
