#!/usr/bin/env bash
set -euo pipefail
export BITCODE_LOG_STDOUT=${BITCODE_LOG_STDOUT:-0}
pnpm --silent --filter @bitcode/chatgptapp start
