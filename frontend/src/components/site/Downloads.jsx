import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Apple, Monitor, Download } from "lucide-react";
import { DOWNLOAD_URLS, TRACKER_FALLBACK } from "@/constants/downloads";

const BUILDS = [
  {
    platform: "windows",
    label: "Windows",
    subtitle: "Windows 10 & 11 · 64-bit",
    file_ext: ".exe",
    version: "1.2.1",
    file_size: "287.5 MB",
    icon: Monitor,
    tag: "For Windows",
  },
  {
    platform: "mac_apple_silicon",
    label: "Mac OS",
    subtitle: "Apple Silicon · M1/M2/M3",
    file_ext: ".dmg",
    version: "1.2.1",
    file_size: "142 MB",
    icon: Apple,
    tag: "For Mac OS",
  },
  {
    platform: "mac_intel",
    label: "Mac OS",
    subtitle: "Intel · x86-64",
    file_ext: ".dmg",
    version: "1.2.1",
    file_size: "146 MB",
    icon: Apple,
    tag: "For Mac OS",
  },
];

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

const formatDownloadCount = (count) => {
  const n = count ?? 0;
  return `${n.toLocaleString()} download${n === 1 ? "" : "s"}`;
};

async function trackerFetch(path, options = {}) {
  try {
    const local = await fetch(path, options);
    if (local.ok) return local;
  } catch {
    // Fall back to the Cloudflare worker if the site is static-only.
  }

  return fetch(`${TRACKER_FALLBACK}${path}`, options);
}

export const Downloads = () => {
  const [recommended, setRecommended] = useState("windows");
  const [downloadCounts, setDownloadCounts] = useState({});
  const [countsLoading, setCountsLoading] = useState(true);

  useEffect(() => {
    setRecommended(detectPlatform());
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadCounts = async () => {
      try {
        const res = await trackerFetch("/api/stats");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setDownloadCounts(data.by_platform || {});
        }
      } catch {
        // Stats are optional — cards still work without them.
      } finally {
        if (!cancelled) setCountsLoading(false);
      }
    };

    loadCounts();
    window.addEventListener("focus", loadCounts);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", loadCounts);
    };
  }, []);

  const handleDownload = (platform) => async (event) => {
    event.preventDefault();
    const fileUrl = DOWNLOAD_URLS[platform];

    try {
      await trackerFetch(`/api/track/${platform}`, { method: "POST" });
    } catch {
      // Never block the download if tracking fails.
    }

    window.location.assign(fileUrl);
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
          <span className="overline text-sv-orange">Free For A Limited Time</span>
          <h2 className="font-display uppercase text-5xl md:text-8xl leading-[0.88] tracking-tighter mt-5">
            <span className="metal-text">Get</span>{" "}
            <span className="text-orange normal-case">StrataViz</span>
          </h2>
          <p className="mt-6 text-silver/80 text-base md:text-lg max-w-xl mx-auto">
            Native desktop builds for Windows and Mac OS. Pick your platform and
            start breaking down film today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {BUILDS.map((b, i) => {
            const Icon = b.icon;
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
                  <span className="overline text-silver/50">{b.tag}</span>
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

                <p
                  className="mt-5 text-sm font-semibold text-sv-orange"
                  data-testid={`download-count-${b.platform}`}
                >
                  {countsLoading
                    ? "Loading downloads…"
                    : formatDownloadCount(downloadCounts[b.platform])}
                </p>

                <a
                  href={DOWNLOAD_URLS[b.platform]}
                  onClick={handleDownload(b.platform)}
                  data-testid={`download-button-${b.platform}`}
                  className={`mt-8 flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-sm px-6 py-4 rounded-full transition-all duration-300 ${
                    isRec
                      ? "bg-sv-orange hover:bg-sv-orangeHover text-black"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/15"
                  }`}
                >
                  <Download className="w-4 h-4" strokeWidth={2.5} />
                  Download {b.file_ext}
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={reveal}
          data-testid="mac-install-notice"
          className="mt-10 md:mt-14 mx-auto max-w-3xl rounded-2xl border border-white/10 bg-sv-elevated p-6 md:p-8"
        >
          <div className="flex items-start gap-4">
            <Apple className="w-8 h-8 text-sv-orange shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <h3 className="font-display uppercase text-xl md:text-2xl tracking-tight text-white">
                First time on Mac?
              </h3>
              <p className="mt-3 text-silver/75 text-sm md:text-base leading-relaxed">
                macOS may show a security warning because StrataViz isn&apos;t from
                the App Store yet. The app is safe — follow these steps once after
                installing:
              </p>
              <ol className="mt-4 space-y-2 text-sm md:text-base text-silver/80 list-decimal list-inside">
                <li>Open the <span className="text-white">.dmg</span> and drag StrataViz to Applications.</li>
                <li>
                  In Finder, open Applications, then{" "}
                  <span className="text-white">right-click StrataViz → Open</span>{" "}
                  (don&apos;t double-click the first time).
                </li>
                <li>Click <span className="text-white">Open</span> in the dialog that appears.</li>
                <li>
                  <span className="text-white">Fallback:</span> If you only see{" "}
                  <span className="text-white">Move to Trash</span> or no Open option,
                  try opening StrataViz once, then go to{" "}
                  <span className="text-white">
                    System Settings → Privacy &amp; Security → Open Anyway
                  </span>
                  .
                </li>
              </ol>
              <p className="mt-4 text-silver/55 text-xs md:text-sm">
                After the first launch, you can open StrataViz normally.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
