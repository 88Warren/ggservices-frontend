const NotFoundPage = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-8 py-24">
      <p className="text-[0.8rem] font-semibold tracking-[0.12em] uppercase text-[#4cbb6c] mb-4">
        404
      </p>
      <h1
        className="font-['Playfair_Display',Georgia,serif] font-bold text-[#1a2a1a] leading-tight mb-4"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        Page not found
      </h1>
      <p className="text-base text-[#6b7d6b] leading-[1.7] mb-8 max-w-md">
        Sorry, we couldn&apos;t find the page you were looking for.
      </p>
      <a
        href="/"
        className="inline-flex items-center justify-center font-semibold text-base tracking-wide
                   px-8 py-[0.85rem] rounded-xl border-2 border-[#1a7a3e]
                   bg-[#1a7a3e] text-white
                   hover:bg-[#0f5c2e] hover:border-[#0f5c2e] hover:shadow-md hover:-translate-y-px
                   transition-all duration-200"
      >
        Back to Home
      </a>
    </div>
  );
};

export default NotFoundPage;
