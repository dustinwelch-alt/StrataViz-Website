/** GitHub release URLs — update here when you ship a new version. */
export const DOWNLOAD_REDIRECTS = {
  windows:
    "https://github.com/dustinwelch-alt/StrataViz-Releases/releases/latest/download/StrataViz-Setup.exe",
  mac_apple_silicon:
    "https://github.com/dustinwelch-alt/StrataViz-Downloads/releases/latest/download/StrataViz-AppleSilicon.dmg",
  mac_intel:
    "https://github.com/dustinwelch-alt/StrataViz-Downloads/releases/latest/download/StrataViz-Intel.dmg",
};

export function isValidPlatform(platform) {
  return Object.prototype.hasOwnProperty.call(DOWNLOAD_REDIRECTS, platform);
}

export async function recordDownload(env, platform, request) {
  if (!env.DB) return;

  await env.DB.prepare(
    `INSERT INTO download_events (platform, user_agent, referrer)
     VALUES (?, ?, ?)`
  )
    .bind(
      platform,
      request.headers.get("user-agent") || "",
      request.headers.get("referer") || ""
    )
    .run();
}
