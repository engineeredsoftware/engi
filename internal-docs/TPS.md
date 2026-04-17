# Third‑Party Services (TPS)

Flat, provider‑specific reference for every third‑party service we touch — how it’s used in code, what customers experience, deployment/config keys, implementation details, routes, and data sync. Each provider uses a consistent set of headings where applicable.

Note: Product page is `/executions?type=pipeline:deliverables`. The second tab is reserved for the upcoming Measure pipeline and currently routes back to deliverables. Third‑party service pages live under `/tps/[service]/...`.

## Supabase

### Overview
- Auth (OTP, OAuth), database, admin client, edge functions. Single source of truth for persistent state and sessions.

### Customer Capabilities
- Email OTP login and OAuth SSO (e.g., GitHub/Google) via modal overlay.
- Account/profile storage; onboarding status; preferences.

### Deployment/Config
- Required env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`.
- Optional: `SUPABASE_AUTH_GITHUB_CLIENT_ID`, `SUPABASE_AUTH_GITHUB_CLIENT_SECRET` (used when delegating GitHub OAuth through Supabase).
- App URL: `NEXT_PUBLIC_APP_URL` (used in email links and redirects).

### Code & Routes
- UI callback: `/tps/supabase/callback` (overlay UI; reuses `LoginCallbackClient`).
- Token catcher: `/[token]` redirects to `/tps/supabase/callback?code=...`.
- OTP server action: `uapi/app/login/actions.ts` (sets `emailRedirectTo` to `/tps/supabase/callback`).
- Auth hooks/client: `uapi/app/hooks/use-auth-query.ts`, `packages/supabase/*`.

### Data & Sync
- DB schema in `supabase/migrations/*.sql`. React Query keys in `use-auth-query.ts`.

### Development Notes
- Use `createClient()` from `@bitcode/supabase/ssr/*` (SSR/Client variants). Clear React Query caches on sign‑out.

### E2E
- `uapi/tests/e2e/sso.spec.ts` navigates to `/tps/supabase/callback`.

## Stripe

### Overview
- Credits purchase via Checkout.

### Customer Capabilities
- Flexible slider plan and predefined bundles; redirect to Stripe Checkout and back to overlay.

### Deployment/Config
- `STRIPE_SECRET_KEY`.
- Product IDs: `STRIPE_PRODUCT_ID_FLEXIBLE`, `STRIPE_PRODUCT_ID_INDUSTRIAL`, plus optional `STRIPE_PRODUCT_ID_<BUNDLE_ID>` overrides.

### Code & Routes
- Create session API: `uapi/app/api/create-checkout-session/route.ts`.
- Return overlay: `/tps/stripe/checkout` (reuses `CheckoutCallbackClient`).

### Data & Sync
- Telemetry via `@bitcode/google-analytics`. Persist credits in Supabase via webhooks (see server infrastructure, not in this repo).

### Development Notes
- Success/cancel URLs are built from `origin` or `NEXT_PUBLIC_APP_URL`.

## GitHub

### Overview
- VCS provider (repos, PRs, issues); App installation; MCP tooling.

### Customer Capabilities
- Connect GitHub account/app; select repos/branches; create PRs/issues; view execution logs.

### Deployment/Config
- `GITHUB_APP_ID`, `GITHUB_PRIVATE_KEY`.
- `GITHUB_APP_CLIENT_ID`, `GITHUB_APP_CLIENT_SECRET` (or `SUPABASE_AUTH_GITHUB_CLIENT_*` when delegating).
- Optional legacy: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`.

### Code & Routes
- UI page: `/tps/github/app-install` (copy installation/code values).
- Server VCS callback/API: `/api/vcs/github/callback`, OAuth initiation under `/api/vcs/[provider]/oauth` (tests in `uapi/app/api/vcs/[provider]/**/__tests__`).
- VCS client: `packages/api/src/vcs/github-service.ts`.

### Data & Sync
- User connections table in Supabase (see migrations); VCS fetchers in `uapi/app/hooks/useVCSData`.

### Development Notes
- In UI, GitHub is treated as a provider in VCS selectors; mock support via `uapi/app/api/deliverables/route-with-engi-mocks.ts` (accessed via `/api/executions?type=pipeline:deliverables`).

## GitLab

### Overview
- VCS provider support (repos/issues/PR equivalents).

### Deployment/Config
- GitLab client/app credentials (env names mirror GitHub patterns when used).

### Code & Routes
- Provider wired via `packages/generic-agents/vcs`, `packages/gitlab`.

## Bitbucket

### Overview
- VCS provider support.

### Code & Routes
- Provider package: `packages/bitbucket/*` (includes MCP tooling variant).
- README shows clientId usage; tests demonstrate endpoints and payloads.

## Twilio

### Overview
- SMS webhook → pipeline execution; live stream viewer overlay.

### Customer Capabilities
- Text a number; receive link to view pipeline execution progress.

### Deployment/Config
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`, `NEXT_PUBLIC_TWILIO_PHONE` (display only).

### Code & Routes
- Inbound webhook/API: `uapi/app/api/chat/sms/route.ts` (validates signature).
- Live stream API: `uapi/app/api/sms/stream/route.ts`.
- Viewer page: `/tps/twilio/sms/[runId]`.

### Data & Sync
- Short‑lived tokens appended to viewer URL; no login friction.

## Notion

### Overview
- Knowledge source integration; SSO candidate; MCP tools (planned/partial).

### Customer Capabilities
- Connect workspace; attach page URLs as context; search/pick content.

### Deployment/Config
- Notion OAuth client id/secret (see `internal-docs/INTEGRATIONS.md` and public docs `public-docs/integration-notion.md`).

### Code & Routes
- UI connects pane: `uapi/app/orbitals/components/OrbitalsConnectsPane.tsx` (endpoints under `/api/integrations/notion/*`).
- Public docs and images under `public-docs/integration-notion.md`.

### Data & Sync
- Attached URLs tokenized; markdown extraction; optional embeddings.

## AWS

### Overview
- MCP tools for Lambda, S3, CloudWatch, Terraform.

### Customer Capabilities
- Provide credentials to enable tools (AI Documents MCP setup phase).

### Deployment/Config
- Standard AWS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, optional shared config/credentials files).

### Code & Routes
- Package: `packages/aws/*` (README with examples).
- Execution storage adapters mention S3; artifacts handle S3/Supabase fallback.

### Development Notes
- Tools exposed via MCP wrappers (see `packages/tools-generics/src/mcp`).

## OpenAI

### Overview
- Powers `.ai/` AI Documents (see `internal-docs/AI-DOCUMENTS-SYSTEM-DESIGN.md`) via embeddings + LLM completion, plus general agent prompting.

### Deployment/Config
- `OPENAI_API_KEY`.

### Code & Routes
- Capture-learnings agent under `packages/pipelines/deliverable/src/agents/digest/capture-learnings-agent.ts` (proposes AGENTS.md/PRODUCT.md edits). Embedding helpers live in `packages/prompts` + `packages/tools-generics`.

## Google (OAuth)

### Overview
- Optional SSO provider through Supabase OAuth.

### Deployment/Config
- Configure Google provider in Supabase; no separate routes needed.

### Code
- Social buttons in `uapi/components/base/engi/auth/SocialLoginButton.tsx`.

## Figma

### Overview
- Content source (attachments), potential MCP.

### Customer Capabilities
- Attach Figma frames; used as context for deliverables.

## Vercel (MCP – planned/partial)

### Overview
- Mentioned in mocks; future MCP surface for deployments.

## MCP Providers (Generic Tools)

All MCP tools are implemented as Tool classes using `wrapMCPTool` from `packages/tools-generics/src/mcp/MCPToolWrapper.ts`. Concrete providers live under `packages/generic-tools/mcps-tools/*` and may depend on their functionality packages (e.g., `packages/aws`, `packages/bitbucket`).

### Aurora Postgres
- Overview: Natural‑language SQL and execution for Amazon Aurora Postgres.
- Code: `packages/generic-tools/mcps-tools/aurora-postgres/src/index.ts`
- Config: Standard Postgres envs (`PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`).

### AWS Location
- Overview: Geospatial queries and services.
- Code: `packages/generic-tools/mcps-tools/aws-location/src/*`
- Config: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`.

### AWS Terraform
- Overview: Terraform automation across AWS infrastructure.
- Code: `packages/generic-tools/mcps-tools/aws-terraform/src/*`
- Config: AWS credentials; Terraform workspace variables where applicable.

### CircleCI
- Overview: Pipelines/jobs information and triggers.
- Code: `packages/generic-tools/mcps-tools/circleci/src/*`
- Config: `CIRCLECI_TOKEN`.

### Cloudflare
- Overview: DNS, KV, Workers, deployments.
- Code: `packages/generic-tools/mcps-tools/cloudflare/src/*`
- Config: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` (and `ZONE_ID` for DNS).

### Docker
- Overview: Build/run image operations for local/remote Docker engines.
- Code: `packages/generic-tools/mcps-tools/docker/src/*`
- Config: `DOCKER_HOST` (and TLS vars if needed: `DOCKER_CERT_PATH`, `DOCKER_TLS_VERIFY`).

### Figma
- Overview: Fetch frames/files metadata for attachments/contexts.
- Code: `packages/generic-tools/mcps-tools/figma/src/*`
- Config: `FIGMA_TOKEN`.

### Firebase
- Overview: Firestore and auth operations via MCP tools.
- Code: `packages/generic-tools/mcps-tools/firebase/src/*`
- Config: `GOOGLE_APPLICATION_CREDENTIALS` or Firebase service account JSON; project id.

### Git Repo Research
- Overview: Read‑only repository research helpers (indexes/insights).
- Code: `packages/generic-tools/mcps-tools/git-repo-research/src/*`
- Config: none by default; relies on repo access via VCS provider tools.

### GitHub MCP
- Overview: GitHub operations via MCP (repos, issues, PRs).
- Code: `packages/generic-tools/mcps-tools/github/src/*`
- Config: `GITHUB_APP_ID`, `GITHUB_PRIVATE_KEY`, client creds or PAT depending on endpoints.

### GitLab MCP
- Overview: GitLab API operations.
- Code: `packages/generic-tools/mcps-tools/gitlab/src/*`
- Config: `GITLAB_TOKEN`, `GITLAB_BASE_URL` (for self‑hosted).

### Jira
- Overview: Issue/project operations.
- Code: `packages/generic-tools/mcps-tools/jira/src/*`, `packages/jira/*`
- Config: `JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN`.

### Kubernetes
- Overview: Cluster resource queries/ops.
- Code: `packages/generic-tools/mcps-tools/kubernetes/src/*`
- Config: `KUBECONFIG` or in‑cluster credentials.

### MySQL
- Overview: SQL execution/queries.
- Code: `packages/generic-tools/mcps-tools/mysql/src/*`
- Config: `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`.

### PostgreSQL
- Overview: SQL execution/queries for Postgres.
- Code: `packages/generic-tools/mcps-tools/postgresql/src/*`
- Config: Standard Postgres envs (`PG*`).

### Notion MCP
- Overview: Notion workspace/page operations.
- Code: `packages/generic-tools/mcps-tools/notion/src/*`, `packages/notion/*`
- Config: `NOTION_OAUTH_CLIENT_ID`, `NOTION_OAUTH_CLIENT_SECRET` or `NOTION_TOKEN`.

### Supabase MCP
- Overview: Database operations via Supabase from MCP.
- Code: `packages/generic-tools/mcps-tools/supabase/src/*`
- Config: Supabase keys (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).

### Vercel MCP
- Overview: Deployment and events.
- Code: `packages/generic-tools/mcps-tools/vercel/src/*`
- Config: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

---

## Conventions
- All UI callback/utility surfaces live under `/tps/[service]/...`.
- Core product page is `/executions` (tabbed by `type`).
- API callbacks remain under `/api/...` (e.g., `/api/vcs/github/callback`).

## Deployment Checklists
- Supabase keys present; URL set; email OTP redirect points to `/tps/supabase/callback`.
- Stripe secret + product IDs configured; webhooks (external infra) deliver credits.
- VCS providers configured: GitHub App ID/private key/client creds.
- Twilio webhook secret configured; phone number set.
- OpenAI key configured for embeddings/LLM.
- Optional: Notion OAuth, AWS credentials, Figma tokens, etc.
