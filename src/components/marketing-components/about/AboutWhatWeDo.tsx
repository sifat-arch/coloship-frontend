const services = [
  {
    title: "E-commerce delivery",
    description:
      "Online orders, cash on delivery included, to any address in the country.",
  },
  {
    title: "Pick and drop",
    description: "Person to person, door to door.",
  },
  {
    title: "Packaging",
    description: "So the parcel arrives the way it was sent.",
  },
  {
    title: "Warehousing",
    description:
      "Your stock in our hubs, out the door the moment an order lands.",
  },
];

const AboutWhatWeDo = () => {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          What we do
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item) => (
            <div key={item.title} className="flex flex-col">
              <div className="mb-6 h-0.5 w-full bg-primary" />
              <h3 className="text-base font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutWhatWeDo;
