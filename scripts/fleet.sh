#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
mode=${1:-setup}
case "$mode" in setup|update) ;; *) echo 'Usage: fleet.sh setup|update' >&2; exit 1 ;; esac
while IFS='|' read -r repo directory; do
  [[ "$repo" =~ ^smeltery/[a-z][a-z-]*$ && "$directory" =~ ^[a-z][a-z-]*$ ]] || {
    echo 'Invalid fleet manifest entry' >&2; exit 1;
  }
  if [ ! -e "$directory" ]; then
    git clone "https://github.com/$repo.git" "$directory"
    continue
  fi
  [ -d "$directory/.git" ] || { echo "$directory is not a repository" >&2; exit 1; }
  origin=$(git -C "$directory" remote get-url origin)
  case "$origin" in
    "https://github.com/$repo.git"|"https://github.com/$repo"|"git@github.com:$repo.git") ;;
    *) echo "Unexpected origin in $directory: $origin" >&2; exit 1 ;;
  esac
  [ "$mode" = update ] || continue
  if [ -n "$(git -C "$directory" status --porcelain)" ]; then
    echo "Skipping $directory: uncommitted changes"
    continue
  fi
  branch=$(git -C "$directory" symbolic-ref --quiet --short HEAD) || {
    echo "Skipping $directory: detached HEAD"; continue;
  }
  if [ "$branch" != main ]; then
    echo "Skipping $directory: on $branch"
    continue
  fi
  git -C "$directory" pull --ff-only
 done < scripts/repos.txt
