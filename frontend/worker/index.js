import {
  DOWNLOAD_REDIRECTS,
  isValidPlatform,
  recordDownload,
} from "./downloads.js";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function withCors(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

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

async function trackDownload(platform, env, request) {
  if (!isValidPlatform(platform)) {
    return new Response("Unknown platform", { status: 404 });
  }

  try {
    await recordDownload(env, platform, request);
  } catch (err) {
    console.error("Download tracking failed:", err);
  }

  return Response.json({ ok: true, platform });
}

async function redirectDownload(platform, env, request) {
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
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const { pathname } = new URL(request.url);

    if (pathname === "/api/stats") {
      return withCors(await handleStats(env));
    }

    const trackMatch = pathname.match(/^\/api\/track\/([^/]+)$/);
    if (trackMatch && request.method === "POST") {
      return withCors(await trackDownload(trackMatch[1], env, request));
    }

    const downloadMatch = pathname.match(/^\/dl\/([^/]+)$/);
    if (downloadMatch) {
      return redirectDownload(downloadMatch[1], env, request);
    }

    return env.ASSETS.fetch(request);
  },
};
