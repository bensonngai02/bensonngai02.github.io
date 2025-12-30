#!/usr/bin/env bash
set -euo pipefail
PROJECT_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"
echo "Running build tasks from: $PROJECT_ROOT"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: missing required command '$1'. Please install it and retry." >&2
    exit 1
  fi
}

require_cmd npx
require_cmd mogrify
require_cmd npm
require_cmd python3

echo "1) Spell check blog posts only (report suggestions)..."
FILES_TO_CHECK=$(python3 scripts/check_spelling.py)
if [[ -n "$FILES_TO_CHECK" ]]; then
  if ! npx cspell --no-progress --show-suggestions --unique $FILES_TO_CHECK; then
    read -r -p "Spellcheck found issues. Continue anyway? [y/n] " answer
    case "$answer" in
      [Yy]* ) echo "Continuing despite spellcheck issues." ;;
      * ) echo "Stopping due to spellcheck issues."; exit 1 ;;
    esac
  fi
else
  echo "No eligible blog files to spellcheck (all marked in progress or none present)."
fi

echo "2) Converting images under public/assets/blog to WebP with auto-orient + quality 10..."
find public/assets/blog -type f \( -iname '*.JPG' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0 |
  while IFS= read -r -d '' img; do
    mogrify -format webp -quality 10 -auto-orient "$img"
  done

echo "3) Verifying referenced assets in blog markdown exist..."
python3 scripts/validate_blog_assets.py

echo "4) Building project..."
npm run build

echo "All steps completed successfully."
