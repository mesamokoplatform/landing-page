#!/usr/bin/env bash
# Fetches real homepage media from the live mesamoko.com site into public/.
# Source of truth: the app's own IP, confirmed to exist at these URLs.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BASE_URL="https://mesamoko.com"

VIDEO_DIR="$ROOT_DIR/public/video"
IMAGES_DIR="$ROOT_DIR/public/images"

mkdir -p "$VIDEO_DIR" "$IMAGES_DIR"

VIDEOS=(hero mockup restaurant-1 restaurant-2 restaurant-3 restaurant-4)
DINERS=(diner-1 diner-2 diner-3 diner-4)

for name in "${VIDEOS[@]}"; do
  echo "Fetching video/${name}.mp4"
  curl -fsSL "$BASE_URL/video/${name}.mp4" -o "$VIDEO_DIR/${name}.mp4"
done

for name in "${DINERS[@]}"; do
  echo "Fetching figma/${name}.png -> images/${name}.png"
  curl -fsSL "$BASE_URL/figma/${name}.png" -o "$IMAGES_DIR/${name}.png"
done

echo "Done. Fetched ${#VIDEOS[@]} videos + ${#DINERS[@]} diner images."
