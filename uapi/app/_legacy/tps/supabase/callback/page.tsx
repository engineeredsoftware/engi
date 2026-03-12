import dynamic from 'next/dynamic';

// Reuse existing client UI for auth callback
const LoginCallbackClient = dynamic(
  () => import('@/app/login/callback/LoginCallbackClient'),
  {
    ssr: false,
    loading: () => (
      <div
        className="callback-overlay"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 9999, backgroundColor: 'black', pointerEvents: 'auto',
        }}
      />
    ),
  }
);

interface AuthCallbackPageProps {
  searchParams: {
    code?: string | string[];
    token_hash?: string | string[];
    next?: string | string[];
    error?: string | string[];
    error_description?: string | string[];
    error_code?: string | string[];
  };
}

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function AuthCallbackPage({ searchParams }: AuthCallbackPageProps) {
  if (searchParams.error || searchParams.error_description || searchParams.error_code) {
    const msg =
      (Array.isArray(searchParams.error_description) ? searchParams.error_description[0] : searchParams.error_description) ||
      (Array.isArray(searchParams.error) ? searchParams.error[0] : searchParams.error) ||
      'Authentication failed';
    redirect('/?loginError=' + encodeURIComponent(msg));
  }

  const rawParam = searchParams.code ?? searchParams.token_hash;
  const code = Array.isArray(rawParam) ? rawParam[0] : rawParam || '';

  const nextParamRaw = searchParams.next;
  const nextParam = Array.isArray(nextParamRaw) ? nextParamRaw[0] : nextParamRaw || '/';

  const allCookies = cookies();
  const hasSessionCookie = allCookies.get('sb-access-token');
  if (!hasSessionCookie && searchParams.token_hash) {
    const th = Array.isArray(searchParams.token_hash) ? searchParams.token_hash[0] : searchParams.token_hash;
    const url = `/auth/confirm?token_hash=${encodeURIComponent(th)}&type=email&next=${encodeURIComponent(nextParam)}`;
    redirect(url);
  }

  return (
    <div
      className="callback-overlay"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999, backgroundColor: 'black', pointerEvents: 'auto',
      }}
    >
      <LoginCallbackClient code={code} nextPath={nextParam} />
    </div>
  );
}
