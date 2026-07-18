import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const LOGO =
  "https://customer-assets-rejwkqb3.emergentagent.net/job_89fd519c-ed84-4342-9a88-ed06beeedaed/artifacts/bt8k5zzu_StrataViz%20Logo%20Final%20Use%20This%20One.png";

const links = [
  { label: "Features", id: "features" },
  { label: "How It Works", id: "how-it-works" },
  { label: "Download", id: "downloads" },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-testid="site-navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-black/60 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-20 flex items-center justify-between">
        <button
          data-testid="nav-logo-button"
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-3 group"
        >
          <img src={LOGO} alt="StrataViz" className="h-11 w-11 object-contain" />
          <span className="font-display text-2xl tracking-tight leading-none">
            <span className="metal-text">Strata</span>
            <span className="text-orange">Viz</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              onClick={() => scrollTo(l.id)}
              className="text-sm font-semibold uppercase tracking-widest text-silver hover:text-white transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          data-testid="nav-download-button"
          onClick={() => scrollTo("downloads")}
          className="group flex items-center gap-2 bg-sv-orange hover:bg-sv-orangeHover text-black font-bold text-sm uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.03]"
        >
          <Download className="w-4 h-4" strokeWidth={2.5} />
          Get <span className="normal-case">StrataViz</span>
        </button>
      </div>
    </motion.header>
  );
};
