import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Apple, Monitor, Download, Loader2, Check } from "lucide-react";
import { getDownloads, trackDownload } from "../../lib/api";
import { toast } from "sonner";

const platformMeta = {
  windows: { icon: Monitor, tag: "For Windows" },
  mac_apple_silicon: { icon: Apple, tag: "For macOS" },
  mac_intel: { icon: Apple, tag: "For macOS" },
};

const detectPlatform = () => {
  const p = (navigator.userAgent + navigator.platform).toLowerCase();
  if (p.includes("win")) return "windows";
  if (p.includes("mac")) return "mac_apple_silicon";
  return "windows";
};

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};

export const Downloads = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(null);
  const [recommended, setRecommended] = useState("windows");

  useEffect(() => {
    setRecommended(detectPlatform());
    getDownloads()
      .then(setBuilds)
      .catch(() => toast.error("Couldn't load downloads. Please retry."))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async (b) => {
    setBusy(b.platform);
    try {
      await trackDownload(b.platform);
      setBuilds((prev) =>
        prev.map((x) =>
          x.platform === b.platform
            ? { ...x, download_count: x.download_count + 1 }
            : x
        )
      );
      toast.success(`Starting download · StrataViz for ${b.label}`);
      const a = document.createElement("a");
      a.href = b.file_url;
      a.setAttribute("download", "");
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      toast.error("Download failed to start.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <section
      id="downloads"
      data-testid="downloads-section"
      className="relative py-28 md:py-40 px-6 md:px-10 spotlight"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={reveal}
          className="text-center mb-16 md:mb-20"
        >
          <span className="overline text-sv-orange">Free Download</span>
          <h2 className="font-display uppercase text-5xl md:text-8xl leading-[0.88] tracking-tighter mt-5">
            <span className="metal-text">Get</span>{" "}
            <span className="text-orange">StrataViz</span>
          </h2>
          <p className="mt-6 text-silver/80 text-base md:text-lg max-w-xl mx-auto">
            Native desktop builds for Windows and macOS. Pick your platform and
            start breaking down film today.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20" data-testid="downloads-loading">
            <Loader2 className="w-8 h-8 text-sv-orange animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {builds.map((b, i) => {
              const meta = platformMeta[b.platform] || platformMeta.windows;
              const Icon = meta.icon;
              const isRec = b.platform === recommended;
              return (
                <motion.div
                  key={b.platform}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={reveal}
                  data-testid={`download-card-${b.platform}`}
                  className={`relative rounded-2xl border bg-sv-elevated p-8 flex flex-col transition-all duration-300 hover:-translate-y-1.5 ${
                    isRec
                      ? "border-sv-orange/70 shadow-[0_0_40px_-12px_rgba(255,90,0,0.5)]"
                      : "border-white/10 hover:border-sv-orange/50"
                  }`}
                >
                  {isRec && (
                    <span className="absolute -top-3 left-8 bg-sv-orange text-black text-[0.68rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                  <div className="flex items-center justify-between mb-8">
                    <Icon className="w-12 h-12 text-white" strokeWidth={1.3} />
                    <span className="overline text-silver/50">{meta.tag}</span>
                  </div>

                  <h3 className="font-display uppercase text-3xl tracking-tight">
                    {b.label}
                  </h3>
                  <p className="text-silver/70 mt-1">{b.subtitle}</p>

                  <div className="flex items-center gap-4 mt-6 text-sm text-silver/60">
                    <span>v{b.version}</span>
                    <span className="h-1 w-1 rounded-full bg-silver/40" />
                    <span>{b.file_size}</span>
                    <span className="h-1 w-1 rounded-full bg-silver/40" />
                    <span className="uppercase">{b.file_ext}</span>
                  </div>

                  <button
                    data-testid={`download-button-${b.platform}`}
                    onClick={() => handleDownload(b)}
                    disabled={busy === b.platform}
                    className={`mt-8 flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-sm px-6 py-4 rounded-full transition-all duration-300 disabled:opacity-70 ${
                      isRec
                        ? "bg-sv-orange hover:bg-sv-orangeHover text-black"
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/15"
                    }`}
                  >
                    {busy === b.platform ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" strokeWidth={2.5} />
                    )}
                    Download {b.file_ext}
                  </button>

                  <div className="mt-4 flex items-center gap-1.5 text-xs text-silver/45">
                    <Check className="w-3.5 h-3.5 text-sv-orange" />
                    {b.download_count.toLocaleString()} downloads
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
