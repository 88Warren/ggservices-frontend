const services = [
  {
    img: "/images/hedgetrim.jpg",
    alt: "Hedge trimming service",
    title: "Grass Cutting, Hedge Trimming & Weeding",
    desc: "We provide regular weeding, grass and hedge cutting for many of our clients. Never worry about these jobs again.",
  },
  {
    img: "/images/fence.jpg",
    alt: "Fencing service",
    title: "Fencing",
    desc: "Broken, collapsed or rotten fencing? We can completely rebuild or replace your existing fencing with a more attractive and contemporary design.",
  },
  {
    img: "/images/decking.jpg",
    alt: "Decking service",
    title: "Decking",
    desc: "Want to create a new low maintenance seating area? Decking is perfect. We have lots of experience creating fabulous decking solutions for our clients.",
  },
  {
    img: "/images/flowerbed.jpg",
    alt: "Garden furniture and flowerbeds",
    title: "Garden Furniture, Planters & Flowerbeds",
    desc: "Looking for bespoke garden furniture, wooden flowerbeds or planters? We can design, build and install something completely unique to your space.",
  },
  {
    img: "/images/jetwashing.jpg",
    alt: "Jet washing service",
    title: "Jet Washing",
    desc: "Looking to clean and brighten up your drives, pathways and exterior walls? We can help bring them back to life.",
  },
  {
    img: "/images/painting.jpg",
    alt: "Outdoor painting service",
    title: "Painting",
    desc: "All types of outdoor painting undertaken including garden furniture, decking and fences. Just ask!",
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0f5c2e 0%, #1a7a3e 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: "url('/images/leaves-pattern.png')", backgroundRepeat: "repeat" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-8">
        <div className="text-center max-w-[680px] mx-auto mb-14">
          <h2
            className="font-['Playfair_Display',Georgia,serif] font-bold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            What We Can Do For You
          </h2>
          <p className="text-base text-white/80 leading-[1.7]">
            We are experts in all forms of gardening services from regular maintenance to full
            garden redesigns. Contact us today to arrange your free consultation and quotation.
          </p>
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {services.map(({ img, alt, title, desc }) => (
            <article
              key={title}
              className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col
                         transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <img
                  src={img}
                  alt={alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.05]"
                />
              </div>
              <div className="p-6 flex flex-col gap-[0.6rem] flex-1">
                <h3 className="font-['Playfair_Display',Georgia,serif] text-[1.1rem] font-semibold text-[#0f5c2e] leading-snug">
                  {title}
                </h3>
                <p className="text-[0.9rem] text-[#6b7d6b] leading-[1.65]">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
