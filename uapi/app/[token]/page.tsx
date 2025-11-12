import { redirect, notFound } from 'next/navigation'

interface TokenPageProps {
  params: {
    /**
     * The raw token string embedded directly in the path. Supabase OTP / confirmation
     * emails occasionally generate links of the form:
     *   https://your-site.com/eyJhbGciOiJIUzI1NiIs...
     * where the token itself becomes the first path segment.
     *
     * To provide a cohesive onboarding experience we immediately forward the user
     * to the existing /tps/supabase/callback route that presents a friendly UI for copying
     * the token into the verification form.
     */
    token: string
  }
}

/**
 * Catch-all route for bare tokens included directly in the URL path.
 *
 * When Supabase sends passwordless login or confirmation emails without an
 * explicit redirect URL, the message may include a link that consists of the
 * site URL followed by the raw JWT/OTP token. Visiting that link would
 * normally return a 404.  This route captures the token and redirects the
 * request to /tps/supabase/callback so the user can easily copy the token into the
 * verification field.
 */
export default function TokenPage({ params }: TokenPageProps) {
  const { token } = params

  // Safeguard: if for whatever reason the token is empty, just redirect home.
  if (!token) {
    redirect('/login')
  }

  /*
   * The route should only handle links that contain a *real* authentication
   * token produced by Supabase.  In practice those tokens are either:
   *   • A JWT string that contains at least two dot separators (header.payload.signature)
   *   • A long opaque hash (≥ 16 characters)
   *
   * Very short or common words (e.g. "/about", "/pricing", "/memo", …) are
   * clearly not valid tokens.  Allowing the dynamic `[token]` segment to catch
   * those paths would result in confusing, unexpected redirects to
   * `/tps/supabase/callback`.  To avoid that we add a simple heuristic that rejects
   * obviously invalid values and lets Next.js continue routing normally – this
   * will ultimately fall back to a 404 page or any other matching route the
   * application declares.
   */
  const isLikelyJwt = token.split('.').length >= 3
  const isLongRandomString = token.length >= 16

  if (!isLikelyJwt && !isLongRandomString) {
    // Not a valid token -> let the request be handled by the default matcher
    // rather than hijacking it.
    notFound()
  }

  // Forward to the dedicated callback screen where the user can copy the code.
  redirect(`/tps/supabase/callback?code=${encodeURIComponent(token)}`)
}
