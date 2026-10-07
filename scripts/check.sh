#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
bun run check:docs
bun run check:budget
actionlint
shellcheck scripts/*.sh .githooks/pre-commit
bun test ./tests
bun run build:site
