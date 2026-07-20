import {
  DOWNLOAD_REDIRECTS,
  isValidPlatform,
  recordDownload,
} from "./downloads.js";

async function handleStats(env) {
  if (!env.DB) {
    return Response.json(
      { error: "Download database not configured" },
      { status: 503 }
    );
  }

  const { results } = await env.DB.prepare(
    `SELECT platform, COUNT(*) AS count
     FROM download_events
     GROUP BY platform`
  ).all();

  const byPlatform = {};
  let total = 0;
  for (const row of results || []) {
    byPlatform[row.platform] = row.count;
    total += row.count;
  }

  const { results: recent } = await env.DB.prepare(
    `SELECT platform, created_at
     FROM download_events
     ORDER BY id DESC
     LIMIT 10`
  ).all();

  return Response.json({
    total,
    by_platform: byPlatform,
    recent: recent || [],
  });
}

async function handleDownload(platform, env, request) {
  if (!isValidPlatform(platform)) {
    return new Response("Unknown platform", { status: 404 });
  }

  try {
    await recordDownload(env, platform, request);
  } catch (err) {
    console.error("Download tracking failed:", err);
  }

  return Response.redirect(DOWNLOAD_REDIRECTS[platform], 302);
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/stats") {
      return handleStats(env);
    }

    const downloadMatch = pathname.match(/^\/dl\/([^/]+)$/);
    if (downloadMatch) {
      return handleDownload(downloadMatch[1], env, request);
    }

    return env.ASSETS.fetch(request);
  },
};
