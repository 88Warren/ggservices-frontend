import { useState, useCallback } from "react";

const API_URL = import.meta.env.VITE_BACKEND_URL ?? "";
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "";

const initialForm = { name: "", email: "", subject: "", message: "" };

// Load reCAPTCHA v3 script once
let recaptchaLoaded = false;
function loadRecaptcha() {
  if (recaptchaLoaded || !RECAPTCHA_SITE_KEY) return;
  recaptchaLoaded = true;
  const script = document.createElement("script");
  script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
  script.async = true;
  document.head.appendChild(script);
}

const ContactSection = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  // Load reCAPTCHA when the user first focuses any field
  const handleFocus = useCallback(() => loadRecaptcha(), []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getRecaptchaToken = () => {
    return new Promise((resolve) => {
      if (!window.grecaptcha || !RECAPTCHA_SITE_KEY) {
        resolve("");
        return;
      }
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(RECAPTCHA_SITE_KEY, { action: "contact" })
          .then(resolve)
          .catch(() => resolve(""));
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const token = await getRecaptchaToken();
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "font-sans text-[0.95rem] text-[#1a2a1a] bg-[#f2f4f2] border-[1.5px] border-[#e4e8e4] rounded-xl px-4 py-3 w-full outline-none resize-y transition-all duration-200 placeholder:text-[#9aaa9a] focus:border-[#1a7a3e] focus:bg-white focus:shadow-[0_0_0_3px_rgba(26,122,62,0.12)]";

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid gap-20 items-start" style={{ gridTemplateColumns: "1fr 1.6fr" }}>
          {/* Info */}
          <div>
            <h2
              className="font-['Playfair_Display',Georgia,serif] font-bold text-[#1a2a1a] leading-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Get in Touch
            </h2>
            <p className="text-[#6b7d6b] leading-[1.7] mb-8">
              Ready to transform your outdoor space? Get in touch for a free consultation and
              quote. We&apos;d love to hear from you.
            </p>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 text-[0.95rem] text-[#3d4d3d]">
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#1a7a3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="shrink-0" aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a
                  href="mailto:g.g.services@outlook.com"
                  className="text-[#1a7a3e] font-medium hover:text-[#0f5c2e] transition-colors duration-200"
                >
                  g.g.services@outlook.com
                </a>
              </li>
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[0.85rem] font-semibold text-[#3d4d3d] tracking-wide">
                Full Name
              </label>
              <input
                type="text" id="name" name="name"
                autoComplete="name" required
                placeholder="Jane Smith"
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                className={inputBase}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[0.85rem] font-semibold text-[#3d4d3d] tracking-wide">
                Email Address
              </label>
              <input
                type="email" id="email" name="email"
                autoComplete="email" required
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                className={inputBase}
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-[0.85rem] font-semibold text-[#3d4d3d] tracking-wide">
                Subject
              </label>
              <input
                type="text" id="subject" name="subject"
                required
                placeholder="e.g. Garden redesign quote"
                value={form.subject}
                onChange={handleChange}
                onFocus={handleFocus}
                className={inputBase}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-[0.85rem] font-semibold text-[#3d4d3d] tracking-wide">
                Message
              </label>
              <textarea
                id="message" name="message"
                rows={6} required
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                className={`${inputBase} min-h-[140px]`}
              />
            </div>

            {/* Feedback */}
            {status === "success" && (
              <p className="text-[0.9rem] text-[#1a7a3e] font-medium">
                Thank you — we&apos;ll be in touch soon!
              </p>
            )}
            {status === "error" && (
              <p className="text-[0.9rem] text-red-600 font-medium">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center w-full font-semibold text-base tracking-wide
                         px-8 py-[0.85rem] rounded-xl border-2 border-[#1a7a3e]
                         bg-[#1a7a3e] text-white cursor-pointer
                         hover:bg-[#0f5c2e] hover:border-[#0f5c2e] hover:shadow-md hover:-translate-y-px
                         disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
                         transition-all duration-200"
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            <p className="text-[0.75rem] text-[#6b7d6b] text-center leading-normal">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1a7a3e] underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-[#1a7a3e] underline">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
