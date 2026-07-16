import React from "react";
import { motion } from "framer-motion";

const chapters = [
  {
    num: "01",
    title: "The Film",
    body: "Every game hides a hundred lessons. Import full footage and scrub through it frame by frame — no more scrubbing across six apps to find one play.",
  },
  {
    num: "02",
    title: "The Cut",
    body: "Trim the moments that matter. Tag them by player, formation, or situation. Stack them into playlists your athletes actually watch.",
  },
  {
    num: "03",
    title: "The Edge",
    body: "Walk into every session with a plan. Share breakdowns with your staff and roster, and turn film study into wins on the scoreboard.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const Manifesto = () => {
  return (
    <section
      id="manifesto"
      data-testid="manifesto-section"
      className="relative py-28 md:py-40 px-6 md:px-10"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={reveal}
          className="mb-20 md:mb-28 max-w-3xl"
        >
          <span className="overline text-sv-orange">The Method</span>
          <h2 className="font-display uppercase text-5xl md:text-7xl leading-[0.9] tracking-tighter mt-5 metal-text">
            Coaching is<br />a study of detail.
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {chapters.map((c, i) => (
            <motion.div
              key={c.num}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={reveal}
              data-testid={`manifesto-chapter-${c.num}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-12 md:py-16 border-t border-white/10 group"
            >
              <div className="md:col-span-4">
                <span className="font-display text-7xl md:text-8xl lg:text-9xl leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,90,0,0.7)] group-hover:[-webkit-text-stroke-color:rgba(255,90,0,1)] transition-all duration-500">
                  {c.num}
                </span>
              </div>
              <div className="md:col-span-8 md:pl-8">
                <h3 className="font-display uppercase text-3xl md:text-5xl tracking-tight mb-5">
                  {c.title}
                </h3>
                <p className="text-base md:text-lg text-silver/80 leading-relaxed max-w-2xl">
                  {c.body}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
};
