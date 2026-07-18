import React from "react";
import { motion } from "framer-motion";

const LOGO =
  "https://customer-assets-rejwkqb3.emergentagent.net/job_89fd519c-ed84-4342-9a88-ed06beeedaed/artifacts/bt8k5zzu_StrataViz%20Logo%20Final%20Use%20This%20One.png";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const Footer = () => {
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/10 bg-sv-surface/50 pt-20 pb-10 px-6 md:px-10 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-16">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-5">
              <img src={LOGO} alt="StrataViz" className="h-10 w-10 object-contain" />
              <span className="font-display text-2xl tracking-tight">
                <span className="metal-text">STRATA</span>
                <span className="text-orange">VIZ</span>
              </span>
            </div>
            <p className="text-silver/70 leading-relaxed">
              Sports film breakdown software for coaches. Clip it. Tag it. Win.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <span className="overline text-silver/50">Explore</span>
              {[
                { l: "Features", id: "features" },
                { l: "How It Works", id: "how-it-works" },
                { l: "Download", id: "downloads" },
              ].map((x) => (
                <button
                  key={x.id}
                  data-testid={`footer-link-${x.id}`}
                  onClick={() => scrollTo(x.id)}
                  className="text-left text-silver/80 hover:text-sv-orange transition-colors"
                >
                  {x.l}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <span className="overline text-silver/50">Platforms</span>
              <span className="text-silver/80">Windows</span>
              <span className="text-silver/80">macOS · Apple Silicon</span>
              <span className="text-silver/80">macOS · Intel</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-white/10 pt-10"
        >
          <div
            aria-hidden="true"
            className="font-display uppercase leading-[0.8] tracking-tighter text-[19vw] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)] select-none pointer-events-none"
          >
            STRATAVIZ
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-6 text-sm text-silver/50">
            <span>© {new Date().getFullYear()} StrataViz Sports. All rights reserved.</span>
            <span>Built for the film room.</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
