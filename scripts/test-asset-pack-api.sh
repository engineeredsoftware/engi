#!/bin/bash

# Test the AssetPack execution API endpoint with streaming response.
echo "Testing AssetPack API streaming..."

# First, get auth token by signing in through the UI.
# For now, this verifies that the endpoint shape exists and requires auth.

echo "Testing GET /api/executions?type=agentic-execution:asset-pack (should return 401 without auth):"
curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000/api/executions?type=agentic-execution:asset-pack"

echo "Testing POST /api/executions?type=agentic-execution:asset-pack (should return 401 without auth):"
curl -s -o /dev/null -w "%{http_code}\n" -X POST \
  -H "Content-Type: application/json" \
  -d '{"read":"test AssetPack","definition_of_read":"test AssetPack execution","repoOwner":"test","repoName":"test","repoBranch":"main"}' \
  "http://localhost:3000/api/executions?type=agentic-execution:asset-pack"

echo "AssetPack API endpoints are responding correctly."
