import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import NavBar from "../components/Shared/NavBar";
import Footer from "../components/Shared/Footer";
import CookieConsent from "../components/Shared/CookieConsent";

const Boilerplate = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />

      {/* Back to top */}
      <a
        href="#top"
        id="backToTop"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={showBackToTop ? "show" : ""}
      >
        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </a>
    </>
  );
};

export default Boilerplate;
