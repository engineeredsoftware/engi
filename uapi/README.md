# Engi-2 uAPI

This directory (`uapi/`) contains the Next.js API and UI pages for:
- Deliverables pipeline (expert agents for PRs, reviews, issue comments)
- AI Documents (AGENTS.md + MCPS.md overlays for knowledge + tool intelligence)
- User onboarding, profile management, and payments

## Development
Before you begin, create a local environment configuration:

### Installing Dependencies

 We maintain a standalone `package-lock.json` inside `uapi/`. To install dependencies for the UI app:

- Using npm:
  ```bash
  cd uapi
  npm install
  ```

Using pnpm:
```bash
# Install all workspace packages from the repo root
pnpm install
# Then install UI-specific dev dependencies
cd uapi
pnpm install
```

1. Environment Variables
   - Copy the example file and fill in your credentials:
     ```bash
     cd uapi
     cp .env.example .env.local
     ```
   - Open `.env.local` and set:
     ```text
     NEXT_PUBLIC_SUPABASE_URL=<your Supabase project URL>
     NEXT_PUBLIC_SUPABASE_ANON_KEY=<your Supabase anon/public API key>
     OPENAI_API_KEY=<your OpenAI secret key>
     NEXT_PUBLIC_ENABLE_MOCKS=true
     NEXT_PUBLIC_MOCK_CHAT_STREAM=true
     EMAIL_SMTP_URL=<your SMTP connection URL, e.g. smtp://user:pass@smtp.example.com:587>
     CONTACT_SUPPORT_EMAIL=<your support email address>
     ```
   - `NEXT_PUBLIC_ENABLE_MOCKS` and `NEXT_PUBLIC_MOCK_CHAT_STREAM` will serve mock chat responses when true. Set them to `false` to use real OpenAI streams.

2. Install dependencies:
   ```bash
   cd uapi
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev       # starts Next.js server at http://localhost:${PORT:-3000}
   ```
4. Run Storybook to explore UI components:
   ```bash
   npm run storybook
   ```
   Storybook will be available at http://localhost:6006.
   Build static Storybook:
   ```bash
   npm run build-storybook
   ```

5. (Optional) Override Storybook port:
   ```bash
   STORYBOOK_PORT=7000 npm run storybook
   ```
   Storybook will be available at http://localhost:7000.

6. (Optional) Use a custom port for development:
   ```bash
   PORT=3001 npm run dev
   ```

## Testing

### Unit & Integration (Jest)
Run all non-E2E tests. By default the Supabase client is mocked out in tests. To run these tests against a real local Supabase/Postgres backend:
```bash
USE_REAL_DB=true \
  SUPABASE_URL=<local-url> \
  NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key> \
  SUPABASE_SERVICE_ROLE_KEY=<service-role-key> \
  npm test
```
To run with the default mocks:
```bash
npm test
```
You can configure mock responses per table in your test files by calling:
```ts
// in your Jest test or beforeEach
// clear previous mocks
clearSupabaseResponses();
// set a happy-path response for 'user_profiles'
setSupabaseResponse('user_profiles', { data: { id: 'u1', name: 'Alice' }, error: null });
// set an error for another table
setSupabaseResponse('user_credits', { data: null, error: { message: 'no credits' } });
```

### API E2E (Headless)
```bash
npm run test:e2e:api
```

### UI E2E (Playwright)
Install browsers (once):
```bash
npx playwright install
```
Run UI tests across all device viewports (phone, tablet, laptop, widescreen):
```bash
# install if needed
npx playwright install
# run all devices
npx playwright test
```

To run a subset of devices, specify each one as a project:
```bash
# only phone and tablet
npx playwright test --project=phone --project=tablet
```

### Visual Regression (Playwright)
```bash
# Update visual snapshots across all device viewports
npx playwright test --update-snapshots
```
Snapshots live under `tests/e2e/__snapshots__/`.

## Scripts Summary
In the `uapi/` directory, the following scripts are available:

-### Development
- `npm run dev` - Start Next.js dev server (main app + admin) at http://localhost:${PORT:-3000} (override via PORT env)
- `npm run dev:debug` - Start dev server with Node.js inspector
- `PORT=<port> npm run dev` - Start dev server on custom port
- `npm run start` - Run production server

### Storybook
- `npm run storybook` - Start Storybook at http://localhost:${STORYBOOK_PORT:-6006}
- `npm run build-storybook` - Build static Storybook

### Documentation Screenshots
- Prerequisite: install dev dependencies (including Playwright) in the `uapi` workspace:
  ```bash
  cd uapi
  npm install
  ```
- `npm run generate-doc-screenshot-stubs` - Scan public-docs, find image placeholders, and generate stub Storybook stories under `uapi/stories/auto`. Fill in the stubs with appropriate component imports and rendering logic.
- `npm run complete-doc-stories` - Replace all auto-generated stub stories with functional stories that render the actual documentation screenshots.
- `npm run capture-doc-screenshots` - Capture screenshots for the completed stories and save to `public-docs/images` using Playwright.

### Linting
- `npm run lint` - Run ESLint

### Testing
- `npm test` - Run Jest unit & integration tests
- `npm run test:watch` - Jest watch mode
- `npm run test:e2e:api` - Playwright API E2E tests
- `npm run test:e2e:ui` - Playwright UI E2E tests
- `npm run test:e2e:visual` - Playwright visual regression tests
- `npx playwright install` - Install Playwright browsers
- `npx playwright test --update-snapshots` - Update visual snapshots

For more details, see:
- [Local Development & QA Checklist](../docs/DEVELOPMENT_AND_QA.md)
- [Visual Testing Guide](../TESTING_VISUAL.md)
- [Visual Test Checklist](../VISUAL_TEST_CHECKLIST.md)
- [Orbitals Overlay ADR](./ORBITALS.md)

## Key API Routes
- GET /api/get-title?url=…
- GET/POST /api/orbitals/profile
- POST /api/orbitals/credits
- GET/POST /api/orbitals/connections/github
- GET/POST /api/executions?type=pipeline:deliverables|pipeline:measure (see [internal-docs/DELIVERABLES.md](../internal-docs/DELIVERABLES.md))
- DELETE /api/executions/{runId}?type=pipeline:deliverables|pipeline:measure (cancel)
- POST /api/stripe (webhook)

## Key UI Pages
- `/executions?type=pipeline:deliverables` - Main pipeline interface (see [internal-docs/DELIVERABLES.md](../internal-docs/DELIVERABLES.md)); legacy `/deliverables` is rewritten by middleware
- `/executions?type=pipeline:measure`; legacy `/ai_documents` is rewritten by middleware
- `/auth/confirm`
- `/orbitals/users` – Opens Orbitals to Users (profile)
- `/orbitals/connects` – Opens Orbitals to Connects
- `/orbitals/models` – Opens Orbitals to Models
- `/orbitals/credits` – Opens Orbitals to Credits

## Orbitals Overlay (Windows + Panes)

The Orbitals experience is a client overlay with two top-level windows and four panes:

- Windows (toggle button at top-left):
  - `SignInWindow`: authentication (login) surface.
  - `SignUpWindow`: onboarding/account surface that contains the 4 Orbitals panes.
- Panes (aka "Orbitals" inside SignUpWindow):
  - Users (Profile)
  - Connects (Integrations)
  - Models (AI configuration)
  - Credits (Balance, usage)

Concepts and APIs:

- Component entry: `@/app/orbitals/components/index` (default export `Orbital`).
- Provider: `@/app/orbitals/components/OrbitalsProvider` exposes `openOrbital`, `closeOrbital`, `prefetchOrbital`.
  - `openOrbital(window?: 'SignInWindow' | 'SignUpWindow', step?: 'profile' | 'connects' | 'models' | 'credits')`
  - `closeOrbital()` closes the overlay.
  - `prefetchOrbital()` warms up code-split chunks and key requests.
- Global events (fire anywhere):
  - `window.dispatchEvent(new CustomEvent('open-orbitals', { detail: { window: 'SignInWindow' | 'SignUpWindow', step?: OrbitalPane } }))`
  - `window.dispatchEvent(new CustomEvent('close-orbitals'))`
- Deep links: visiting `/orbitals/(users|connects|models|credits)` opens `SignUpWindow` with the matching pane (note: `users` maps to `profile`).
- Headers: each pane uses a singular Orbital header component for consistent copy/UX:
  - Base: `OrbitalsOrbitalHeader`
  - Specialized: `OrbitalsUsersOrbitalHeader`, `OrbitalsConnectsOrbitalHeader`, `OrbitalsModelsOrbitalHeader`, `OrbitalsCreditsOrbitalHeader`
- Types:
  - `OrbitalPane = 'profile' | 'connects' | 'models' | 'credits' | null`
  - `window?: 'SignInWindow' | 'SignUpWindow'` (prop on the overlay root)

Naming conventions:

- Experience prefix: `orbitals-*` for overlay/container classes.
- Per-orbital pane prefixes: `orbitals-users-*`, `orbitals-connects-*`, `orbitals-models-*`, `orbitals-credits-*`.
- CSS Modules animations use `:global { @keyframes ... }` for purity.


Please ensure stable `data-testid` attributes on selectors and buttons to support E2E/visual tests.
