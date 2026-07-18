import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, PlayCircle } from "lucide-react";

const HERO_BG =
  "https://images.pexels.com/photos/35898730/pexels-photo-35898730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const lines = ["SEE THE", "GAME.", "BREAK IT DOWN."];

const lineVariant = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.12 },
  }),
};

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-end"
    >
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <img
          src={HERO_BG}
          alt="Stadium at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-sv-bg via-sv-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10 pb-24 md:pb-28"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-3 mb-7"
        >
          <span className="h-px w-10 bg-sv-orange" />
          <span className="overline">Sports Film Breakdown · For Coaches</span>
        </motion.div>

        <h1 className="font-display uppercase leading-[0.83] text-[15vw] md:text-[10vw] lg:text-[8.5vw] tracking-tighter">
          {lines.map((line, i) => (
            <span key={i} className="line-mask">
              <motion.span
                custom={i}
                variants={lineVariant}
                initial="hidden"
                animate="show"
                className={`block ${i === 2 ? "text-orange" : "metal-text"}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-9 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
        >
          <p className="max-w-md text-base md:text-lg text-silver/90 leading-relaxed">
            Turn raw game footage into surgical clips and shareable playlists.
            The film room your team runs on — built for the way coaches think.
          </p>
          <div className="flex items-center gap-4">
            <button
              data-testid="hero-download-button"
              onClick={() => scrollTo("downloads")}
              className="bg-sv-orange hover:bg-sv-orangeHover text-black font-bold uppercase tracking-wider text-sm px-7 py-4 rounded-full transition-all duration-300 hover:scale-[1.04]"
            >
              Download Free for a Limited Time
            </button>
            <button
              data-testid="hero-tour-button"
              onClick={() => scrollTo("features")}
              className="flex items-center gap-2 text-white font-semibold uppercase tracking-wider text-sm hover:text-sv-orange transition-colors"
            >
              <PlayCircle className="w-6 h-6" strokeWidth={1.5} />
              See it work
            </button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-3"
      >
        <span className="overline rotate-90 origin-center translate-y-6 text-silver/60">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4 text-silver/60 mt-8 animate-bounce" />
      </motion.div>
    </section>
  );
};
