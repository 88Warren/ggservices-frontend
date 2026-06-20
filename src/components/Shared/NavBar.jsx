import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home",         href: "#top" },
  { label: "Our Work",     href: "#portfolio" },
  { label: "Services",     href: "#services" },
  { label: "Service Area", href: "#area" },
  { label: "Contact",      href: "#contact" },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="top"
      className={`sticky top-0 z-1000 bg-white border-b border-[#e4e8e4] transition-shadow duration-200 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-8 h-20 flex items-center">
        {/* Logo */}
        <a
          href="#top"
          onClick={() => handleNavClick("#top")}
          className="shrink-0 flex items-center mr-10"
          aria-label="Glyn's Gardening Service home"
        >
          <img
            src="/images/png logo.png"
            alt="Glyn's Gardening Service logo"
            className="h-[60px] w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav className="flex-1 hidden md:flex items-center" aria-label="Primary navigation">
          <ul className="flex gap-1 items-center">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className="text-sm font-medium text-[#3d4d3d] px-3 py-2 rounded-md
                             hover:text-[#1a7a3e] hover:bg-[#e8f5ec] transition-colors duration-200 whitespace-nowrap"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex shrink-0 items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            className="inline-flex items-center justify-center gap-2 font-semibold text-sm tracking-wide
                       px-[1.4rem] py-[0.65rem] rounded-xl border-2 border-[#1a7a3e]
                       bg-[#1a7a3e] text-white cursor-pointer
                       hover:bg-[#0f5c2e] hover:border-[#0f5c2e] shadow-sm hover:shadow-md
                       hover:-translate-y-px transition-all duration-200"
          >
            Get a Quote
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="ml-auto md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 bg-transparent border-none cursor-pointer p-[6px] rounded-md"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobileNav"
          aria-label="Toggle navigation"
        >
          <span className={`block h-[2px] bg-[#1a2a1a] rounded transition-transform duration-200 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-[2px] bg-[#1a2a1a] rounded transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] bg-[#1a2a1a] rounded transition-transform duration-200 ${menuOpen ? "translate-y-7px -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobileNav"
        className={`md:hidden overflow-hidden transition-all duration-300 border-b border-[#e4e8e4] bg-white shadow-md ${
          menuOpen ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col py-3">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                className="block px-8 py-3 text-base font-medium text-[#3d4d3d]
                           hover:text-[#1a7a3e] hover:bg-[#e8f5ec] transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="px-8 pt-2 pb-3">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              className="block text-center font-semibold text-sm tracking-wide px-6 py-3 rounded-xl
                         bg-[#1a7a3e] text-white border-2 border-[#1a7a3e]
                         hover:bg-[#0f5c2e] hover:border-[#0f5c2e] transition-all duration-200"
            >
              Get a Quote
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
