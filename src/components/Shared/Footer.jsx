const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#3d4d3d] py-4 pb-6">
      <div className="max-w-[1200px] mx-auto px-8 flex items-center gap-8 flex-wrap">
        <a
          href="#top"
          onClick={scrollToTop}
          className="flex items-center leading-none"
          aria-label="Back to top"
        >
          <img
            src="/images/png logo.png"
            alt="Glyn's Gardening Service"
            className="h-[110px] w-auto opacity-90 hover:opacity-100 transition-opacity duration-200"
          />
        </a>
        <p className="text-sm text-white/55 flex-1 text-center">
          &copy; {year} Glyn&apos;s Gardening Service. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
