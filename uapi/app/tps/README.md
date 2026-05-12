# /tps Naming Conventions

- All third‑party UI pages live under `/tps/[service]/...`.
- Prefer explicit service names (e.g., `supabase`, `github`, `twilio`, `wallet`).
- Child paths describe the surface (`callback`, `app-install`, `sms/[runId]`, `wallet/[flow]`).
- Keep Bitcode product pages under `/terminal`, retained execution bridges under `/executions`, and admitted Evidence Document surfaces under Bitcode-owned routes — do not mix them with third-party service overlays.

Examples
- `/tps/supabase/callback` – Auth OTP/OAuth callback overlay
- `/tps/wallet/connect` – Wallet connection or settlement overlay
- `/tps/github/callback` – GitHub App user-authorization callback handler
- `/tps/github/app-install` – GitHub App installation/setup handler
- `/tps/twilio/sms/[runId]` – SMS run viewer

Transition policy
- Retained callback pages (`/login/callback`, `/github/callback`, `/sms/view/[runId]`) permanently redirect (308) to the new `/tps/...` routes.
- Retained GitHub setup pages (`/github/setup`) permanently redirect (308) to `/tps/github/app-install` and preserve `installation_id`, `setup_action`, `state`, `target_id`, and `target_type`.
