#!/bin/bash
# QA Studio - Download external dependencies to libs/ folder
# Run this from your qa-studio directory: bash download-libs.sh

set -e

LIBS_DIR="$(dirname "$0")/libs"
mkdir -p "$LIBS_DIR"

echo "📦 Downloading QA Studio dependencies..."
echo ""

# SheetJS (Excel export)
echo "⬇️  Downloading SheetJS..."
curl -L "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js" \
  -o "$LIBS_DIR/xlsx.full.min.js"
echo "✅ xlsx.full.min.js"

# Canvas Confetti
echo "⬇️  Downloading canvas-confetti..."
curl -L "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js" \
  -o "$LIBS_DIR/confetti.browser.min.js"
echo "✅ confetti.browser.min.js"

# Lucide icons
echo "⬇️  Downloading Lucide icons..."
curl -L "https://unpkg.com/lucide@latest/dist/umd/lucide.min.js" \
  -o "$LIBS_DIR/lucide.min.js"
echo "✅ lucide.min.js"

# Flag images
echo "⬇️  Downloading flag images..."
mkdir -p "$LIBS_DIR/flags"
curl -L "https://flagcdn.com/w40/gb.png" -o "$LIBS_DIR/flags/gb.png"
echo "✅ flags/gb.png (English)"
curl -L "https://flagcdn.com/w40/fi.png" -o "$LIBS_DIR/flags/fi.png"
echo "✅ flags/fi.png (Finnish)"
curl -L "https://flagcdn.com/w40/dz.png" -o "$LIBS_DIR/flags/dz.png"
echo "✅ flags/dz.png (Algerian Arabic)"

# Google Fonts - Inter (download CSS + woff2 files)
echo "⬇️  Downloading Inter font..."
curl -L "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" \
  -A "Mozilla/5.0" \
  -o "$LIBS_DIR/inter-font.css"

# Extract and download the actual woff2 font files referenced in the CSS
echo "   Downloading font files..."
mkdir -p "$LIBS_DIR/fonts"
grep -oP 'https://[^)]+\.woff2' "$LIBS_DIR/inter-font.css" | while read -r url; do
  filename=$(basename "$url" | cut -d'?' -f1)
  curl -L "$url" -o "$LIBS_DIR/fonts/$filename"
  # Update CSS to point to local files
  sed -i "s|$url|./fonts/$filename|g" "$LIBS_DIR/inter-font.css"
done
echo "✅ inter-font.css + font files"

echo ""
echo "✅ All done! Files saved to: $LIBS_DIR"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Now update these lines in your index.html:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo 'REPLACE:'
echo '  <link href="https://fonts.googleapis.com/css2?family=Inter...">'
echo '  <script src="https://cdnjs.cloudflare.com/.../xlsx.full.min.js"></script>'
echo '  <script src="https://cdn.jsdelivr.net/.../confetti.browser.min.js"></script>'
echo '  <script src="https://unpkg.com/lucide@latest"></script>'
echo '  flagcdn.com/w40/gb.png  →  ./libs/flags/gb.png'
echo '  flagcdn.com/w40/fi.png  →  ./libs/flags/fi.png'
echo '  flagcdn.com/w40/dz.png  →  ./libs/flags/dz.png'
echo ''
echo 'WITH:'
echo '  <link href="./libs/inter-font.css">'
echo '  <script src="./libs/xlsx.full.min.js"></script>'
echo '  <script src="./libs/confetti.browser.min.js"></script>'
echo '  <script src="./libs/lucide.min.js"></script>'