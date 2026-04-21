#!/usr/bin/env python3

import argparse
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


def fetch_json(url: str):
    with urllib.request.urlopen(url, timeout=10) as response:
        return json.load(response)


def write_json(path: Path, payload):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2) + "\n")


def summarize(path: Path, payload: dict):
    need_scenarios = payload.get("needScenarios") or []
    first_need = (need_scenarios[0].get("needingSurface") if need_scenarios else None) or {}

    print(f"\n== {path} ==")
    print("specVersion:", payload.get("specVersion"))
    print("activeProfile:", (payload.get("conformanceProfiles") or {}).get("active"))
    print("repoSupplySurface:", bool(payload.get("repoSupplySurface")))
    print("boundaryRealitySurface:", bool(payload.get("boundaryRealitySurface")))
    print("needScenarios:", len(need_scenarios))
    print("firstNeedId:", first_need.get("needId"))
    print("targetArtifactKinds:", first_need.get("targetArtifactKinds"))
    print("closureCriteria:", first_need.get("closureCriteria"))


def main():
    parser = argparse.ArgumentParser(
        description="Capture compact V12 shell sanity telemetry from the Bitcode protocol demonstration."
    )
    parser.add_argument(
        "--base-url",
        default="http://127.0.0.1:4318",
        help="Base Bitcode protocol demonstration URL (default: http://127.0.0.1:4318)",
    )
    parser.add_argument(
        "--out-dir",
        default="/tmp/ET",
        help="Directory for captured JSON snapshots (default: /tmp/ET)",
    )
    parser.add_argument(
        "--suffix",
        default="before",
        help="Filename suffix, e.g. before / after-profile-a / after-profile-b",
    )
    args = parser.parse_args()

    out_dir = Path(args.out_dir)
    public_url = urllib.parse.urljoin(args.base_url.rstrip("/") + "/", "api/state")
    buyer_url = public_url + "?projection=buyer"

    try:
        public_payload = fetch_json(public_url)
        buyer_payload = fetch_json(buyer_url)
    except urllib.error.URLError as exc:
        print(f"ERROR: failed to fetch Bitcode protocol demonstration state from {args.base_url}: {exc}", file=sys.stderr)
        return 1

    public_path = out_dir / f"state-public-{args.suffix}.json"
    buyer_path = out_dir / f"state-buyer-{args.suffix}.json"

    write_json(public_path, public_payload)
    write_json(buyer_path, buyer_payload)

    summarize(public_path, public_payload)
    summarize(buyer_path, buyer_payload)

    print("\nCaptured:")
    print(f"- {public_path}")
    print(f"- {buyer_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
