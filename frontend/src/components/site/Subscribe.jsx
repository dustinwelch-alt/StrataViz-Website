import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

const EMAIL = "filmfreakhoops@gmail.com";

export const Subscribe = () => {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-24 md:py-32 px-6 md:px-10 border-t border-white/10"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <span className="overline text-sv-orange">Get In Touch</span>
            <h2 className="font-display uppercase text-4xl md:text-6xl leading-[0.9] tracking-tighter mt-5 metal-text">
              Tech issues?<br />Questions?
            </h2>
          </div>

          <div className="md:pl-4">
            <p className="text-base md:text-lg text-silver/80 leading-relaxed mb-7">
              Reach out anytime — we&apos;re happy to help you get the most out of
              StrataViz.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              data-testid="contact-email-link"
              className="group inline-flex items-center gap-3 bg-sv-orange hover:bg-sv-orangeHover text-black font-bold uppercase tracking-wider text-sm px-7 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]"
            >
              <Mail className="w-4 h-4" strokeWidth={2.5} />
              {EMAIL}
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
