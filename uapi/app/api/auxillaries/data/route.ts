import { createClient } from '@bitcode/supabase/ssr/server';
import { NextResponse } from 'next/server';

import {
  buildAnonymousAuxillaryData,
  buildAuxillaryDataPayload,
} from '@/app/auxillaries/auxillary-onboarding-contract';
import { buildMockOrbitalData, isUserOrbitalMockMode } from '@/lib/mock-review-mode';

export const runtime = 'nodejs';

export async function GET(_request: Request) {
  if (isUserOrbitalMockMode()) {
    return NextResponse.json(buildMockOrbitalData());
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json(buildAnonymousAuxillaryData());
  }

  const [profileResult, githubConnectionResult, creditsResult, preferencesResult] = await Promise.all([
    supabase.from('user_profiles').select('*').eq('user_id', user.id).maybeSingle(),
    supabase
      .from('user_connections')
      .select('connection_data')
      .eq('user_id', user.id)
      .eq('provider', 'github')
      .maybeSingle(),
    supabase.from('user_credits').select('credits').eq('user_id', user.id).single(),
    supabase.from('user_model_preferences').select('preferences').eq('user_id', user.id).single(),
  ]);

  const profile = profileResult.data ?? null;
  const githubConnection = githubConnectionResult.data?.connection_data ?? null;
  const credits = typeof creditsResult.data?.credits === 'number' ? creditsResult.data.credits : 0;
  const modelPreferences = preferencesResult.data?.preferences ?? null;

  return NextResponse.json(buildAuxillaryDataPayload({
    profile,
    githubConnection,
    credits,
    modelPreferences,
    onboardedSteps: (profile as { onboarded_steps?: unknown } | null)?.onboarded_steps,
  }));
}
