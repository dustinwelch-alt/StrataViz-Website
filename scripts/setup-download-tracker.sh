#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FRONTEND="$ROOT/frontend"
WRANGLER="$FRONTEND/wrangler.toml"
DB_NAME="strataviz-downloads"

echo ""
echo "StrataViz download tracker — one-time Cloudflare setup"
echo "======================================================="
echo ""

cd "$FRONTEND"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required. Install from https://nodejs.org and run this again."
  exit 1
fi

echo "Step 1: Sign in to Cloudflare (a browser window will open)..."
npx wrangler@4 login

echo ""
echo "Step 2: Creating download database..."
CREATE_OUTPUT="$(npx wrangler@4 d1 create "$DB_NAME" 2>&1 || true)"

if echo "$CREATE_OUTPUT" | grep -q 'already exists'; then
  echo "Database already exists — fetching id..."
  LIST_OUTPUT="$(npx wrangler@4 d1 list)"
  DATABASE_ID="$(echo "$LIST_OUTPUT" | awk -v name="$DB_NAME" '$0 ~ name { print $1; exit }')"
else
  DATABASE_ID="$(echo "$CREATE_OUTPUT" | sed -n 's/.*database_id = "\([^"]*\)".*/\1/p' | head -1)"
fi

if [[ -z "${DATABASE_ID:-}" ]]; then
  echo "Could not read database id. Output was:"
  echo "$CREATE_OUTPUT"
  exit 1
fi

echo "Database id: $DATABASE_ID"

python3 - "$WRANGLER" "$DATABASE_ID" <<'PY'
import pathlib, re, sys
path, db_id = sys.argv[1], sys.argv[2]
text = pathlib.Path(path).read_text()
text = re.sub(r'database_id = ".*?"', f'database_id = "{db_id}"', text)
pathlib.Path(path).write_text(text)
PY

echo ""
echo "Step 3: Applying database schema..."
npx wrangler@4 d1 migrations apply "$DB_NAME" --remote

echo ""
echo "Done! Next: push to GitHub so Cloudflare Pages redeploys,"
echo "or run: cd frontend && npm run deploy:pages"
echo ""
echo "Check stats anytime at: https://YOUR-DOMAIN/api/stats"
echo ""
