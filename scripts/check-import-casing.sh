#!/usr/bin/env bash
set -euo pipefail

FIX=0
if [[ "${1:-}" == "--fix" ]]; then
  FIX=1
  echo "Scanning and fixing case-mismatched imports vs filenames..."
else
  echo "Scanning for case-mismatched imports vs filenames..."
fi

# Collect source files (ts/tsx/js/jsx) tracked by git
mapfile -t files < <(git ls-files | grep -E '\.(ts|tsx|js|jsx)$')

# Build a map of lowercase filenames -> actual names
declare -A filemap
for f in "${files[@]}"; do
  lc=$(echo "$f" | tr '[:upper:]' '[:lower:]')
  filemap["$lc"]="$f"
done

mismatch=0

# Compute corrected relative spec from source file to actual file (strip extension, fold index)
rel_spec_from_actual() {
  local srcFile="$1" actualPath="$2"
  local dir="$actualPath";
  if [[ "$actualPath" =~ /index\.(ts|tsx|js|jsx)$ ]]; then
    dir="${actualPath%/index.*}"
  else
    dir="${actualPath%.*}"
  fi
  local rel
  rel=$(python3 - "$dir" "$srcFile" <<'PY'
import os,sys
target=sys.argv[1]
src=sys.argv[2]
print(os.path.relpath(target, os.path.dirname(src)))
PY
)
  if [[ "$rel" != .* ]]; then
    rel="./$rel"
  fi
  echo "$rel"
}

declare -A ts_paths

# Load tsconfig paths via Node (robust JSON parsing)
if command -v node >/dev/null 2>&1 && [[ -f tsconfig.json ]]; then
  while IFS= read -r line; do
    key="${line%%|*}"
    val="${line#*|}"
    ts_paths["$key"]="$val"
  done < <(node -e '
    const fs=require("fs");
    try {
      const ts=JSON.parse(fs.readFileSync("tsconfig.json","utf8"));
      const paths=(ts.compilerOptions&&ts.compilerOptions.paths)||{};
      for(const k of Object.keys(paths)){
        const arr=paths[k];
        if(Array.isArray(arr)&&arr.length){
          console.log(k+"|"+arr[0]);
        }
      }
    } catch(e) {}
  ')
fi

resolve_ts_path() {
  local spec="$1"
  # Try exact key match
  if [[ -n "${ts_paths[$spec]:-}" ]]; then
    echo "${ts_paths[$spec]}"
    return 0
  fi
  # Try wildcard mappings like @alias/*
  for key in "${!ts_paths[@]}"; do
    if [[ "$key" == *"*"* ]]; then
      local prefix="${key%%\*}"
      if [[ "$spec" == ${prefix}* ]]; then
        local rest="${spec#${prefix}}"
        local target="${ts_paths[$key]}"
        local base="${target%%\*}"
        echo "${base}${rest}"
        return 0
      fi
    fi
  done
  return 1
}

# Iterate per-file to support --fix replacement
for src in "${files[@]}"; do
  mapfile -t specs < <(grep -h -E "from ['\"]([^'\"]+)['\"]|import\(['\"]([^'\"]+)['\"]\)" "$src" \
    | sed -E "s/.*['\"]([^'\"]+)['\"].*/\1/" | sort -u)

  for imp in "${specs[@]:-}"; do
    # 1) Relative imports
    if [[ "$imp" =~ ^(\./|\../) ]]; then
      handled=0
      for ext in .ts .tsx .js .jsx ""; do
        lc=$(echo "${imp}${ext}" | tr '[:upper:]' '[:lower:]')
        if [[ -n "${filemap[$lc]:-}" ]]; then
          actual="${filemap[$lc]}"
          want=$(rel_spec_from_actual "$src" "$actual")
          if [[ "$imp" != "$want" ]]; then
            echo "⚠️  Case mismatch in $src: '$imp' → '$want' (actual '$actual')"
            mismatch=1
            if [[ $FIX -eq 1 ]]; then
              perl -pi -e "s@from '\Q$imp\E'@from '$want'@g; s@from \"\Q$imp\E\"@from \"$want\"@g; s@import\('\Q$imp\E'\)@import('$want')@g; s@import\(\"\Q$imp\E\"\)@import(\"$want\")@g;" "$src"
            fi
          fi
          handled=1; break
        fi
        # index fallback
        lc=$(echo "${imp}/index${ext}" | tr '[:upper:]' '[:lower:]')
        if [[ -n "${filemap[$lc]:-}" ]]; then
          actual="${filemap[$lc]}"
          want=$(rel_spec_from_actual "$src" "$actual")
          if [[ "$imp" != "$want" ]]; then
            echo "⚠️  Case mismatch in $src: '$imp' → '$want' (actual '$actual')"
            mismatch=1
            if [[ $FIX -eq 1 ]]; then
              perl -pi -e "s@from '\Q$imp\E'@from '$want'@g; s@from \"\Q$imp\E\"@from \"$want\"@g; s@import\('\Q$imp\E'\)@import('$want')@g; s@import\(\"\Q$imp\E\"\)@import(\"$want\")@g;" "$src"
            fi
          fi
          handled=1; break
        fi
      done
      continue
    fi

    # 2) Resolve via tsconfig paths if available (detection only for now)
    if baseResolved=$(resolve_ts_path "$imp"); then
      # We could implement alias-preserving rewrite using tsconfig mapping specifics
      continue
    fi

    # 3) Alias-preserving auto-fix for @engi/<pkg>/... → compute canonical suffix from actual path
    if [[ "$imp" =~ ^@engi/([^/]+)(/.*)?$ ]]; then
      pkg="${BASH_REMATCH[1]}"; rest="${BASH_REMATCH[2]:-}"
      base="packages/$pkg/src${rest}"
      handled=0
      for ext in .ts .tsx .js .jsx ""; do
        lc=$(echo "${base}${ext}" | tr '[:upper:]' '[:lower:]')
        if [[ -n "${filemap[$lc]:-}" ]]; then
          actual="${filemap[$lc]}"
          root="packages/$pkg/src"
          # Compute canonical suffix relative to root, strip extension and fold index
          suffix=$(python3 - "$actual" "$root" <<'PY'
import os,sys
actual=sys.argv[1]
root=sys.argv[2]
rel=os.path.relpath(actual, root)
if rel.lower().endswith(('/index.ts','/index.tsx','/index.js','/index.jsx')):
    rel=os.path.dirname(rel)
else:
    rel=os.path.splitext(rel)[0]
print(rel)
PY
)
          if [[ "$suffix" == "." || "$suffix" == "" ]]; then
            want="@engi/$pkg"
          else
            want="@engi/$pkg/$suffix"
          fi
          if [[ "$imp" != "$want" ]]; then
            echo "⚠️  Alias case mismatch in $src: '$imp' → '$want' (actual '$actual')"
            mismatch=1
            if [[ $FIX -eq 1 ]]; then
              perl -pi -e "s@from '\Q$imp\E'@from '$want'@g; s@from \"\Q$imp\E\"@from \"$want\"@g; s@import\('\Q$imp\E'\)@import('$want')@g; s@import\(\"\Q$imp\E\"\)@import(\"$want\")@g;" "$src"
            fi
          fi
          handled=1; break
        fi
        # index fallback
        lc=$(echo "${base}/index${ext}" | tr '[:upper:]' '[:lower:]')
        if [[ -n "${filemap[$lc]:-}" ]]; then
          actual="${filemap[$lc]}"
          root="packages/$pkg/src"
          suffix=$(python3 - "$actual" "$root" <<'PY'
import os,sys
actual=sys.argv[1]
root=sys.argv[2]
rel=os.path.relpath(actual, root)
if rel.lower().endswith(('/index.ts','/index.tsx','/index.js','/index.jsx')):
    rel=os.path.dirname(rel)
else:
    rel=os.path.splitext(rel)[0]
print(rel)
PY
)
          if [[ "$suffix" == "." || "$suffix" == "" ]]; then
            want="@engi/$pkg"
          else
            want="@engi/$pkg/$suffix"
          fi
          if [[ "$imp" != "$want" ]]; then
            echo "⚠️  Alias case mismatch in $src: '$imp' → '$want' (actual '$actual')"
            mismatch=1
            if [[ $FIX -eq 1 ]]; then
              perl -pi -e "s@from '\Q$imp\E'@from '$want'@g; s@from \"\Q$imp\E\"@from \"$want\"@g; s@import\('\Q$imp\E'\)@import('$want')@g; s@import\(\"\Q$imp\E\"\)@import(\"$want\")@g;" "$src"
            fi
          fi
          handled=1; break
        fi
      done
      continue
    fi
  done
done

if [[ $mismatch -eq 0 ]]; then
  if [[ $FIX -eq 1 ]]; then
    echo "✅ No mismatches found to fix."
  else
    echo "✅ No case-mismatched imports found."
  fi
else
  if [[ $FIX -eq 1 ]]; then
    echo "✨ Applied fixes for mismatched relative imports. Review diffs and commit."
  else
    echo "❗ Review the above mismatches or rerun with --fix."
  fi
  exit 1
fi
