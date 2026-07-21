import { isValidPlatform, recordDownload } from "../../worker/downloads.js";

export async function onRequestPost(context) {
  const { platform } = context.params;

  if (!isValidPlatform(platform)) {
    return new Response("Unknown platform", { status: 404 });
  }

  try {
    await recordDownload(context.env, platform, context.request);
  } catch (err) {
    console.error("Download tracking failed:", err);
  }

  return Response.json({ ok: true, platform });
}
