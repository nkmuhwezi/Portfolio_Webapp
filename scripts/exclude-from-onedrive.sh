#!/bin/sh
# This repo lives inside a OneDrive folder. Build output and dependencies are
# large, churn constantly, and are fully regenerable — syncing them wastes
# bandwidth and causes sync conflicts.
#
# macOS runs OneDrive as a File Provider extension, which skips any item
# carrying the `com.apple.fileprovider.ignore#P` attribute. The attribute is a
# property of the directory itself, so it must be re-applied whenever one is
# deleted and recreated (npm install, next build). `postinstall` handles the
# common case; run this script directly after a fresh build if needed.
#
# No-ops on Linux (Vercel), where neither xattr nor OneDrive exists.

for dir in node_modules .next out; do
  [ -e "$dir" ] || continue
  xattr -w 'com.apple.fileprovider.ignore#P' 1 "$dir" 2>/dev/null &&
    echo "excluded from OneDrive sync: $dir"
done

exit 0
