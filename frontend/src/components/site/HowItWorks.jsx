import React from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

const STEP1_IMG =
  "https://customer-assets-v7afamib.emergentagent.net/job_coach-breakdown/artifacts/57qcser9_ChatGPT%20Image%20Jul%2017%2C%202026%2C%2011_13_13%20PM.png";
const STEP2_IMG =
  "https://customer-assets-v7afamib.emergentagent.net/job_coach-breakdown/artifacts/tdzg11xz_ChatGPT%20Image%20Jul%2017%2C%202026%2C%2011_25_15%20PM.png";

const steps = [
  {
    num: "01",
    title: "Upload the Film",
    body: "Every game hides a hundred lessons. Import full footage and store as much as your computer allows — no monthly caps, no paywalls, no cloud rationing your season.",
    image: STEP1_IMG,
  },
  {
    num: "02",
    title: "Make the Cut",
    body: "Clip the moments that matter with four editable clip buttons, so you can categorize clips by player, formation, or situation. Stack them into playlists your athletes actually watch.",
    image: STEP2_IMG,
  },
  {
    num: "03",
    title: "Add to Playlists",
    body: "Easily add clips to a playlist or multiple playlists.",
    image: null,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const ImagePanel = ({ step }) => (
  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-sv-elevated group">
    <div className="absolute -inset-px rounded-2xl spotlight opacity-60 pointer-events-none" />
    {step.image ? (
      <img
        src={step.image}
        alt={`${step.title} — StrataViz screenshot`}
        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />
    ) : (
      <div className="aspect-[16/10] w-full flex flex-col items-center justify-center gap-3 text-silver/40">
        <ImageIcon className="w-10 h-10" strokeWidth={1.3} />
        <span className="overline text-silver/40">Screenshot coming soon</span>
      </div>
    )}
  </div>
);

export const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      data-testid="how-it-works-section"
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
          <span className="overline text-sv-orange">How It Works</span>
          <h2 className="font-display uppercase text-5xl md:text-7xl leading-[0.9] tracking-tighter mt-5 metal-text">
            From footage<br />to game plan.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-20 md:gap-32">
          {steps.map((step) => {
            return (
              <motion.div
                key={step.num}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={reveal}
                data-testid={`how-step-${step.num}`}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 items-center"
              >
                <div>
                  <span className="font-display text-7xl md:text-8xl leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,90,0,0.75)]">
                    {step.num}
                  </span>
                  <h3 className="font-display uppercase text-3xl md:text-5xl tracking-tight mt-5 mb-5">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-silver/80 leading-relaxed max-w-xl">
                    {step.body}
                  </p>
                </div>
                <div>
                  <ImagePanel step={step} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
