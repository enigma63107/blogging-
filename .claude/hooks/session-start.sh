#!/bin/bash
# Installs dependencies so linting, type checking and builds work immediately in
# Claude Code on the web sessions, where the container starts from a fresh clone.
set -euo pipefail

# Local sessions manage their own node_modules; only the remote container needs this.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# `npm install` rather than `npm ci`: it is idempotent, and it reuses the cached
# container state instead of deleting and refetching node_modules every time.
npm install --no-audit --no-fund
