const portfolioItems = [
  { src: "/images/collage/landscape.jpg", alt: "Landscape garden design",  label: "Landscaping",    tall: true  },
  { src: "/images/collage/fence.jpg",     alt: "New fence installation",    label: "Fencing"                    },
  { src: "/images/collage/hedgeTrim.jpg", alt: "Hedge trimming",            label: "Hedge Trimming"             },
  { src: "/images/collage/decking.jpg",   alt: "Decking installation",      label: "Decking",        wide: true  },
  { src: "/images/collage/painting.jpg",  alt: "Outdoor painting",          label: "Painting"                   },
  { src: "/images/collage/stones.jpg",    alt: "Stone landscaping",         label: "Stonework"                  },
  { src: "/images/collage/flowerbed.jpg", alt: "Flowerbed creation",        label: "Flowerbeds"                 },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 bg-[#f8faf8]">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center max-w-[680px] mx-auto mb-14">
          <h2
            className="font-['Playfair_Display',Georgia,serif] font-bold text-[#1a2a1a] leading-tight mb-4"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Our Work
          </h2>
          <p className="text-base text-[#6b7d6b] leading-[1.7]">
            Here are some examples of the work we have undertaken for our clients. Whatever you
            are looking for, whether to renew, revive or completely reimagine your outdoor space,
            we can help.
          </p>
        </div>

        <div className="portfolio-grid">
          {portfolioItems.map(({ src, alt, label, tall, wide }) => (
            <div
              key={label}
              className={`portfolio-item group relative overflow-hidden rounded-xl bg-[#e4e8e4] cursor-pointer${
                tall ? " portfolio-item--tall" : ""
              }${wide ? " portfolio-item--wide" : ""}`}
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <div
                className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "linear-gradient(to top, rgba(15,92,46,0.75) 0%, transparent 60%)" }}
              >
                <span className="font-['Playfair_Display',Georgia,serif] text-[1.1rem] font-semibold text-white tracking-wide">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
