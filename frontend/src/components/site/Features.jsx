import React from "react";
import { motion } from "framer-motion";
import { Scissors, ListVideo, Tag, Users, Zap, MonitorPlay } from "lucide-react";

const IMG1 =
  "https://images.unsplash.com/photo-1650661926447-9efb2610f64c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwyfHx2aWRlbyUyMGVkaXRpbmclMjBzY3JlZW4lMjBkYXJrJTIwcm9vbXxlbnwwfHx8fDE3ODQyMjg1OTN8MA&ixlib=rb-4.1.0&q=85";
const IMG2 =
  "https://images.unsplash.com/photo-1591805953001-f6ad7822d736?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwxfHxjb2FjaCUyMGxhcHRvcCUyMHNwb3J0cyUyMGdhbWV8ZW58MHx8fHwxNzg0MjI4NTc5fDA&ixlib=rb-4.1.0&q=85";

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
};

const small = [
  { icon: Tag, title: "Tag Every Play", body: "Label by player, set, or situation for instant recall — with four fully customizable tagging buttons built for the way you break down film." },
  { icon: Users, title: "Easily Export", body: "Export and send playlists straight to your athletes and staff." },
  { icon: Zap, title: "Instant Clips", body: "Cut and export decisive moments in seconds." },
];

export const Features = () => {
  return (
    <section
      id="features"
      data-testid="features-section"
      className="relative py-28 md:py-40 px-6 md:px-10 bg-sv-surface/40"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={reveal}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20"
        >
          <div>
            <span className="overline text-sv-orange">What It Does</span>
            <h2 className="font-display uppercase text-5xl md:text-7xl leading-[0.9] tracking-tighter mt-5">
              <span className="metal-text">Your Whole</span>
              <br />
              <span className="text-orange">Film Room.</span>
            </h2>
          </div>
          <p className="max-w-sm text-silver/80 text-base md:text-lg leading-relaxed">
            One desktop app to import, clip, tag, and share. Built to keep pace
            with a coach mid-breakdown.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {/* Large feature 1 */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={reveal}
            data-testid="feature-clips"
            className="md:col-span-7 relative overflow-hidden rounded-2xl border border-white/10 bg-sv-elevated min-h-[380px] group"
          >
            <img
              src={IMG1}
              alt="Clipping footage"
              className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sv-bg via-sv-bg/50 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
              <Scissors className="w-9 h-9 text-sv-orange mb-5" strokeWidth={1.5} />
              <h3 className="font-display uppercase text-3xl md:text-4xl tracking-tight mb-3">
                Create Clips
              </h3>
              <p className="text-silver/85 max-w-md leading-relaxed">
                Scrub the timeline, set in and out points, and carve full games
                into the exact moments worth teaching.
              </p>
            </div>
          </motion.div>

          {/* Large feature 2 */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={reveal}
            data-testid="feature-playlists"
            className="md:col-span-5 relative overflow-hidden rounded-2xl border border-white/10 bg-sv-elevated min-h-[380px] group"
          >
            <img
              src={IMG2}
              alt="Building playlists"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sv-bg via-sv-bg/55 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
              <ListVideo className="w-9 h-9 text-sv-orange mb-5" strokeWidth={1.5} />
              <h3 className="font-display uppercase text-3xl md:text-4xl tracking-tight mb-3">
                Build Playlists
              </h3>
              <p className="text-silver/85 leading-relaxed">
                Sequence clips into focused reels for opponents, drills, or
                individual player development.
              </p>
            </div>
          </motion.div>

          {/* Three small cards */}
          {small.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i + 2}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={reveal}
              data-testid={`feature-small-${i}`}
              className="md:col-span-4 rounded-2xl border border-white/10 bg-sv-elevated p-8 hover:border-sv-orange/60 hover:-translate-y-1 transition-all duration-300"
            >
              <f.icon className="w-8 h-8 text-sv-orange mb-5" strokeWidth={1.5} />
              <h3 className="font-display uppercase text-2xl tracking-tight mb-2">
                {f.title}
              </h3>
              <p className="text-silver/75 leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={reveal}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-12"
        >
          {[
            { k: "4+", v: "Sports covered" },
            { k: "Native", v: "Win & macOS builds" },
            { k: "Local", v: "Storage stays on your computer" },
            { k: "$0", v: "No storage fees, ever" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-4xl md:text-6xl text-orange leading-none">
                {s.k}
              </div>
              <div className="overline mt-3 text-silver/60">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
