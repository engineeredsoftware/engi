# Codemods

This folder contains one-off code-modification scripts that can be executed to
update or refactor the codebase in a repeatable manner.

## `rename-processing-to-pipeline-logs.js`

Replaces the “Pipeline Logs” terminology with “Pipeline Logs” across the
repository.

Supported changes:

* Prose & UI strings (`Pipeline Logs` → `Pipeline Logs`, etc.)
* Identifiers (`pipelineLog(s)` → `pipelineLog(s)`)
* Constant names (`PIPELINE_LOG` → `PIPELINE_LOG`)
* Slug variants (`pipeline-logs` → `pipeline-logs`)
* File / directory names that include the slug

### Usage

```sh
# Dry-run – shows what would change
node codemod/rename-processing-to-pipeline-logs.js

# Apply changes in-place (make sure you have a clean git status!)
node codemod/rename-processing-to-pipeline-logs.js --apply
```

After running with `--apply`, review the changes with `git diff`, run the test
suite, and update any remaining manual screenshots or external references as
needed.
