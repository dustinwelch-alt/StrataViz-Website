import {
  DOWNLOAD_REDIRECTS,
  isValidPlatform,
  recordDownload,
} from "../_shared/downloads.js";

export async function onRequest(context) {
  const { platform } = context.params;

  if (!isValidPlatform(platform)) {
    return new Response("Unknown platform", { status: 404 });
  }

  try {
    await recordDownload(context.env, platform, context.request);
  } catch (err) {
    console.error("Download tracking failed:", err);
  }

  return Response.redirect(DOWNLOAD_REDIRECTS[platform], 302);
}
