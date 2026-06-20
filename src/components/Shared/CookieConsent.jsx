import { useState, useEffect } from "react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = (prefs) => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({ ...prefs, timestamp: new Date().toISOString() })
    );
    setShowBanner(false);
  };

  const handleAcceptAll = () =>
    save({ necessary: true, analytics: true, marketing: true });

  const handleAcceptNecessary = () =>
    save({ necessary: true, analytics: false, marketing: false });

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-2000 p-4 sm:p-6
                 animate-[slideUp_0.3s_ease_forwards]"
    >
      <div className="max-w-[900px] mx-auto bg-white rounded-2xl shadow-xl border border-[#e4e8e4] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
          {/* Text */}
          <div className="flex-1">
            <h3 className="font-['Playfair_Display',Georgia,serif] text-[1.05rem] font-semibold text-[#1a2a1a] mb-2">
              We use cookies
            </h3>
            <p className="text-[0.875rem] text-[#6b7d6b] leading-[1.6]">
              We use cookies to enhance your browsing experience, provide personalised content
              and analyse our traffic. By clicking &quot;Accept All&quot;, you consent to our
              use of cookies.{" "}
              <a
                href="/docs/"
                className="text-[#1a7a3e] underline hover:text-[#0f5c2e] transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </p>

            {/* Details */}
            {showDetails && (
              <div className="mt-4 flex flex-col gap-3 border-t border-[#e4e8e4] pt-4">
                {[
                  {
                    title: "Necessary Cookies",
                    desc: "Essential for the website to function properly. These cannot be disabled.",
                  },
                  {
                    title: "Analytics Cookies",
                    desc: "Help us understand how visitors interact with our website by collecting anonymous information.",
                  },
                  {
                    title: "Marketing Cookies",
                    desc: "Used to track visitors across websites to display relevant advertisements.",
                  },
                ].map(({ title, desc }) => (
                  <div key={title}>
                    <h4 className="text-[0.8rem] font-semibold text-[#3d4d3d] mb-0.5">{title}</h4>
                    <p className="text-[0.8rem] text-[#6b7d6b] leading-normal">{desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 sm:shrink-0 sm:min-w-[180px]">
            <button
              onClick={handleAcceptAll}
              className="w-full font-semibold text-[0.875rem] px-5 py-[0.65rem] rounded-xl
                         bg-[#1a7a3e] text-white border-2 border-[#1a7a3e]
                         hover:bg-[#0f5c2e] hover:border-[#0f5c2e] transition-all duration-200 cursor-pointer"
            >
              Accept All
            </button>
            <button
              onClick={handleAcceptNecessary}
              className="w-full font-semibold text-[0.875rem] px-5 py-[0.65rem] rounded-xl
                         bg-transparent text-[#1a7a3e] border-2 border-[#1a7a3e]
                         hover:bg-[#e8f5ec] transition-all duration-200 cursor-pointer"
            >
              Necessary Only
            </button>
            <button
              onClick={() => setShowDetails((d) => !d)}
              className="w-full font-medium text-[0.8rem] px-5 py-2 rounded-xl
                         text-[#6b7d6b] hover:text-[#3d4d3d] hover:bg-[#f2f4f2]
                         transition-all duration-200 cursor-pointer"
            >
              {showDetails ? "Hide Details" : "Customise"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
