import React from "react";
import Marquee from "react-fast-marquee";

const items = [
  "FILM STUDY",
  "CLIP CREATION",
  "PLAYLIST BUILDING",
  "PLAY TAGGING",
  "TACTICAL ANALYSIS",
  "TEAM SHARING",
];

export const BrandMarquee = () => {
  return (
    <div
      aria-hidden="true"
      data-testid="brand-marquee"
      className="relative border-y border-white/10 bg-sv-surface/60 py-7 md:py-9"
    >
      <Marquee speed={45} gradient={false} autoFill>
        {items.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="font-display uppercase text-3xl md:text-5xl tracking-tight text-silver/25 px-8">
              {item}
            </span>
            <span className="text-sv-orange text-2xl md:text-4xl">✦</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};
