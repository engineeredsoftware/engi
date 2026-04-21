# /tps Naming Conventions

- All third‑party UI pages live under `/tps/[service]/...`.
- Prefer explicit service names (e.g., `supabase`, `stripe`, `github`, `twilio`).
- Child paths describe the surface (`callback`, `checkout`, `app-install`, `sms/[runId]`).
- Keep product pages under `/deliverables` and `/ai_documents` — do not mix.

Examples
- `/tps/supabase/callback` – Auth OTP/OAuth callback overlay
- `/tps/stripe/checkout` – Stripe return overlay
- `/tps/github/app-install` – GitHub App installation/verification overlay
- `/tps/twilio/sms/[runId]` – SMS run viewer

Transition policy
- Legacy callback pages (`/login/callback`, `/github/callback`, `/sms/view/[runId]`) permanently redirect (308) to the new `/tps/...` routes.
