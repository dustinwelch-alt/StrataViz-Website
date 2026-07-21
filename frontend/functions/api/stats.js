export async function onRequest(context) {
  if (!context.env.DB) {
    return Response.json(
      { error: "Download database not configured" },
      { status: 503 }
    );
  }

  const { results } = await context.env.DB.prepare(
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

  const { results: recent } = await context.env.DB.prepare(
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
