import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { subscribe } from "../../lib/api";
import { toast } from "sonner";

export const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    try {
      await subscribe(email.trim());
      setDone(true);
      setEmail("");
      toast.success("You're on the list. We'll keep you posted.");
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      data-testid="subscribe-section"
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
            <span className="overline text-sv-orange">Stay In The Loop</span>
            <h2 className="font-display uppercase text-4xl md:text-6xl leading-[0.9] tracking-tighter mt-5 metal-text">
              New features,<br />drop first here.
            </h2>
          </div>

          <div>
            {done ? (
              <p
                data-testid="subscribe-success"
                className="text-lg text-silver/90"
              >
                Thanks — you&apos;re subscribed. Watch your inbox for release notes and
                coaching tips.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                data-testid="subscribe-form"
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@team.com"
                  data-testid="subscribe-email-input"
                  className="flex-1 bg-white/5 border border-white/15 rounded-full px-6 py-4 text-white placeholder:text-silver/40 focus:outline-none focus:border-sv-orange transition-colors"
                />
                <button
                  type="submit"
                  disabled={busy}
                  data-testid="subscribe-submit-button"
                  className="flex items-center justify-center gap-2 bg-sv-orange hover:bg-sv-orangeHover text-black font-bold uppercase tracking-wider text-sm px-7 py-4 rounded-full transition-all duration-300 hover:scale-[1.03] disabled:opacity-70"
                >
                  {busy ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Notify Me
                      <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
