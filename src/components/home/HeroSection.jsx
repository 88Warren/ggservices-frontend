const HeroSection = () => {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative overflow-hidden flex items-center py-20 min-h-[calc(100vh-80px)]"
      style={{ background: "linear-gradient(135deg, #0f5c2e 0%, #1a7a3e 60%, #2ea84f 100%)" }}
      aria-label="Hero"
    >
      {/* Leaf texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: "url('/images/leaves-pattern.png')", backgroundRepeat: "repeat" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1200px] w-full mx-auto px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-10 lg:gap-16">
        {/* Content */}
        <div>
          <p className="inline-block text-[0.8rem] font-semibold tracking-[0.12em] uppercase text-[#4cbb6c] bg-white/10 border border-white/15 px-[0.9rem] py-[0.35rem] rounded-full mb-6">
            Commercial &amp; Domestic Services
          </p>
          <h1
            className="font-['Playfair_Display',Georgia,serif] font-bold text-white leading-[1.1] mb-5"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            We bring your<br />garden to life
          </h1>
          <p className="text-base text-white/80 leading-[1.7] mb-10">
            Professional gardening and landscaping services across Cardiff and South Wales
            from Llantrisant to St Mellons. Free consultations are available.
          </p>
          <div className="flex flex-wrap gap-4 sm:flex-row flex-col sm:items-start items-center">
            <a
              href="#portfolio"
              onClick={(e) => { e.preventDefault(); scrollTo("#portfolio"); }}
              className="inline-flex items-center justify-center font-semibold text-base tracking-wide
                         px-8 py-[0.85rem] rounded-xl border-2 border-white bg-white text-[#0f5c2e]
                         hover:bg-[#e8f5ec] hover:border-[#e8f5ec] hover:shadow-md hover:-translate-y-px
                         transition-all duration-200 sm:w-auto w-full max-w-[280px]"
            >
              View Our Work
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="inline-flex items-center justify-center font-semibold text-base tracking-wide
                         px-8 py-[0.85rem] rounded-xl border-2 border-white/70 bg-transparent text-white
                         hover:bg-white/12 hover:border-white
                         transition-all duration-200 sm:w-auto w-full max-w-[280px]"
            >
              Get a Free Quote
            </a>
          </div>
        </div>

        {/* Hero image */}
        <div className="flex justify-center items-center" aria-hidden="true">
          <img
            src="/images/collage.jpg"
            alt="Before and after garden transformation"
            className="w-full max-w-[480px] md:max-w-full rounded-4xl object-cover aspect-4/3"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
