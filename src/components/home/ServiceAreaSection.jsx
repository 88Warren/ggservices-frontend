import { useEffect, useRef } from "react";

const CENTRE = [51.4816, -3.1791];
const RADIUS_METRES = 19000;

const ServiceAreaSection = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Dynamically load Leaflet so it doesn't break SSR / test environments
    if (mapInstanceRef.current) return; // already initialised

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.crossOrigin = "";
    script.onload = () => {
      const L = window.L;
      const map = L.map(mapRef.current, {
        center: CENTRE,
        zoom: 10,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      L.circle(CENTRE, {
        radius: RADIUS_METRES,
        color: "#1a7a3e",
        weight: 2,
        opacity: 0.9,
        fillColor: "#2ea84f",
        fillOpacity: 0.15,
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: '<div style="width:20px;height:20px;background:#1a7a3e;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      L.marker(CENTRE, { icon })
        .addTo(map)
        .bindPopup("<strong style='color:#0f5c2e'>Glyn's Gardening Service</strong><br>Serving Cardiff &amp; South Wales")
        .openPopup();

      setTimeout(() => map.invalidateSize(), 300);
      mapInstanceRef.current = map;
    };
    document.body.appendChild(script);

    return () => {
      // cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="area" className="py-24 bg-[#f8faf8]">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Header */}
        <div className="text-center max-w-[680px] mx-auto mb-14">
          <h2
            className="font-['Playfair_Display',Georgia,serif] font-bold text-[#1a2a1a] leading-tight mb-4"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Areas We Cover
          </h2>
          <p className="text-base text-[#6b7d6b] leading-[1.7]">
            We cover Cardiff and the surrounding South Wales area from Llantrisant in the west to
            St Mellons in the east. Not sure if we reach you? Just get in touch and ask.
          </p>
        </div>

        {/* Layout */}
        <div className="grid gap-12 items-stretch" style={{ gridTemplateColumns: "1fr 280px" }}>
          {/* Map */}
          <div
            className="rounded-xl overflow-hidden shadow-md border border-[#e4e8e4] h-[420px]"
            aria-label="Map showing service coverage area"
            role="img"
          >
            <div ref={mapRef} style={{ width: "100%", height: "420px" }} />
          </div>

          {/* CTA card */}
          <div className="bg-white border border-[#e4e8e4] rounded-xl p-8 text-center flex flex-col items-center justify-center gap-4 shadow-sm h-full">
            <div className="w-16 h-16 bg-[#e8f5ec] rounded-full flex items-center justify-center text-[#1a7a3e]" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="font-['Playfair_Display',Georgia,serif] text-[1.1rem] text-[#1a2a1a]">
              Not sure if we cover you?
            </h3>
            <p className="text-[0.9rem] text-[#6b7d6b] leading-[1.6]">
              Coverage can vary by job type. Get in touch and we&apos;ll let you know.
            </p>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center font-semibold text-[0.9rem] tracking-wide
                         px-[1.4rem] py-[0.65rem] rounded-xl border-2 border-[#1a7a3e]
                         bg-[#1a7a3e] text-white
                         hover:bg-[#0f5c2e] hover:border-[#0f5c2e] hover:shadow-md hover:-translate-y-px
                         transition-all duration-200"
            >
              Check Your Area
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaSection;
