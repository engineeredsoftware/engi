#!/usr/bin/env bash
set -u

# Bulk, non-destructive Prompt updates (doc-comments + generic composition)
# Targets:
# - Generic Agents: packages/generic-agents/*/src/prompts/{system,plan,try,refine,retry}-prompt-*.ts
# - Pipelines (deliverable overlays): packages/pipelines/deliverable/src/agents/prompts/deliverable-pipeline-*-agent-prompts.ts
# - Generic Tools: add promptdev doc-comment to prompt files missing it

GEN_IMPORTS='import {\n  PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT,\n  PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER,\n  PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA,\n  PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY,\n  PROMPTPART_GENERIC_AGENT_GENERATION_REASON,\n  PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE,\n  PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT\n} from '\''@bitcode/prompts'\'';'

DOC_PROMPT='/**\n * @doc-comment-developing-promptdevelopment\n * domain: agent\n * intent: "(fill intent)"\n * current_version: "GA1.45.0"\n * dependencies: { }\n * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },\n *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }\n * ]\n */'

append_if_missing() { # file, needle, block
  local f="$1"; shift
  local needle="$1"; shift
  local block="$*"
  rg -n --hidden -S "$needle" "$f" -g '!**/node_modules/**' >/dev/null 2>&1 || {
    # shellcheck disable=SC2129
    printf '\n%s\n' "$block" >> "$f"
  }
}

insert_after_first_imports() { # file, text_block
  local f="$1"; local blk="$2"
  # insert after the last top-level import line
  awk -v add="$blk" '
    BEGIN{done=0}
    /^[[:space:]]*import[[:space:]].*from/ { last=NR }
    { lines[NR]=$0 }
    END{
      for(i=1;i<=NR;i++){
        print lines[i]
        if (i==last && done==0){ print add; done=1 }
      }
      if (NR==0 || last==0){ print add }
    }
  ' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
}

update_chain_prompt() { # file
  local f="$1"
  awk '
    BEGIN{inchain=0}
    /new[[:space:]]+Prompt\(\)/ { inchain=1 }
    {
      if (inchain==1 && $0 ~ /;[[:space:]]*$/) {
        sub(/;[[:space:]]*$/, "", $0);
        print $0;
        print "  .set(\x27generation:json_only_header\x27, PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)";
        print "  .set(\x27generation:use_this_structure\x27, PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)";
        print "  .set(\x27generation:if_unknown_empty\x27, PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY)";
        print "  .set(\x27generation:reason\x27, PROMPTPART_GENERIC_AGENT_GENERATION_REASON)";
        print "  .set(\x27generation:judge\x27, PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)";
        print "  .set(\x27generation:structured_output\x27, PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)";
        print "  .set(\x27failsafe:prepare_context\x27, PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);";
        inchain=0
      } else { print $0 }
    }
  ' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
}

update_iife_prompt() { # file
  local f="$1"
  awk '
    BEGIN{block="  p.set(\x27generation:json_only_header\x27, PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);\n  p.set(\x27generation:use_this_structure\x27, PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);\n  p.set(\x27generation:if_unknown_empty\x27, PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY as any);\n  p.set(\x27generation:reason\x27, PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);\n  p.set(\x27generation:judge\x27, PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);\n  p.set(\x27generation:structured_output\x27, PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);\n  p.set(\x27failsafe:prepare_context\x27, PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);"}
    { if ($0 ~ /^[[:space:]]*return[[:space:]]+p[[:space:]]*;/) { print block; print $0 } else { print $0 } }
  ' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
}

process_generic_agent() {
  local f="$1"
  # Ensure doc-comment exists
  rg -n --hidden -S "@doc-comment-developing-promptdevelopment" "$f" -g '!**/node_modules/**' >/dev/null 2>&1 || {
    # Prepend doc-comment
    printf "%s\n%s" "$DOC_PROMPT" "$(cat "$f")" > "$f.tmp" && mv "$f.tmp" "$f"
  }
  # Ensure generic imports present
  rg -n --hidden -S "PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER" "$f" -g '!**/node_modules/**' >/dev/null 2>&1 || insert_after_first_imports "$f" "$GEN_IMPORTS"
  # Apply composition based on style
  if rg -n --hidden -P "new\s+Prompt\(\)\s*\.[^;]+;" "$f" -g '!**/node_modules/**' >/dev/null 2>&1; then
    update_chain_prompt "$f"
  else
    update_iife_prompt "$f"
  fi
}

process_pipeline_overlay() {
  local f="$1"
  # Ensure generic imports present
  rg -n --hidden -S "PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER" "$f" -g '!**/node_modules/**' >/dev/null 2>&1 || insert_after_first_imports "$f" "$GEN_IMPORTS"
  # Update each IIFE prompt by inserting before 'return p;'
  update_iife_prompt "$f"
}

process_tool_prompt() {
  local f="$1"
  # Ensure promptdev doc-comment present
  rg -n --hidden -S "@doc-comment-developing-promptdevelopment" "$f" -g '!**/node_modules/**' >/dev/null 2>&1 || {
    printf "%s\n%s" "$DOC_PROMPT" "$(cat "$f")" > "$f.tmp" && mv "$f.tmp" "$f"
  }
}

# Generic Agents
find packages/generic-agents -type f -path "*src/prompts/*-prompt-*.ts" | while read -r f; do
  process_generic_agent "$f"
done

# Deliverable pipeline overlays
find packages/pipelines/deliverable/src/agents/prompts -type f -name "deliverable-pipeline-*-agent-prompts.ts" | while read -r f; do
  process_pipeline_overlay "$f"
done

# Generic Tools prompts
find packages/generic-tools -type f -path "*src/prompts/*.ts" | while read -r f; do
  process_tool_prompt "$f"
done

echo "Autofix applied (non-destructive appends). Review changes and rerun reports." >&2
