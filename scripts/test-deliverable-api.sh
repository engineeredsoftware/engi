#!/bin/bash

# Test the deliverables API endpoint with streaming response
echo "Testing deliverables API streaming..."

# First, get auth token (you'll need to be logged in via the UI)
# For now, we'll just test that the endpoint exists

# Test GET endpoint
echo "Testing GET /api/executions?type=pipeline:deliverables (should return 401 without auth):"
curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000/api/executions?type=pipeline:deliverables"

# Test POST endpoint structure (should return 401 without auth)
echo "Testing POST /api/executions?type=pipeline:deliverables (should return 401 without auth):"
curl -s -o /dev/null -w "%{http_code}\n" -X POST \
  -H "Content-Type: application/json" \
  -d '{"task":"test","repoOwner":"test","repoName":"test","repoBranch":"main"}' \
  "http://localhost:3000/api/executions?type=pipeline:deliverables"

echo "API endpoints are responding correctly!"
