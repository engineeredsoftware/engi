#!/usr/bin/env bash
set -euo pipefail
export ENGI_LOG_STDOUT=${ENGI_LOG_STDOUT:-0}
pnpm --silent --filter @engi/chatgptapp start
