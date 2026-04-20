import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@bitcode/supabase';
import { createClient } from '@bitcode/supabase/ssr/server';

import {
  buildAuxillaryOnboardingPayload,
  type AuxillaryOnboardingUpdatePayload,
  normalizeCompletedAuxillaryPane,
  parseStoredAuxillarySteps,
  serializeAuxillarySteps,
} from '@/app/auxillaries/auxillary-onboarding-contract';
import { buildMockOnboardingData, isUserOrbitalMockMode } from '@/lib/mock-review-mode';

export const runtime = 'nodejs';

const DEFAULT_COMPLETED_STEPS = [] as const;

export async function GET() {
  if (isUserOrbitalMockMode()) {
    return NextResponse.json(buildMockOnboardingData());
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json(buildAuxillaryOnboardingPayload([...DEFAULT_COMPLETED_STEPS]), { status: 401 });
  }

  const { data: profile } = await supabaseAdmin
    .from('user_profiles')
    .select('onboarded_steps')
    .eq('user_id', user.id)
    .maybeSingle();

  return NextResponse.json(
    buildAuxillaryOnboardingPayload(parseStoredAuxillarySteps(profile?.onboarded_steps)),
  );
}

export async function POST(request: Request) {
  if (isUserOrbitalMockMode()) {
    return NextResponse.json(buildMockOnboardingData());
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: AuxillaryOnboardingUpdatePayload = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const completedStep = normalizeCompletedAuxillaryPane(body.completedPane ?? body.completedStep);

  const { data: profile } = await supabaseAdmin
    .from('user_profiles')
    .select('onboarded_steps')
    .eq('user_id', user.id)
    .maybeSingle();

  const completedSteps = parseStoredAuxillarySteps(profile?.onboarded_steps);
  const nextCompletedSteps =
    completedStep && !completedSteps.includes(completedStep)
      ? [...completedSteps, completedStep]
      : completedSteps;

  const { error: updateError } = await supabaseAdmin
    .from('user_profiles')
    .update({
      onboarded_steps: serializeAuxillarySteps(nextCompletedSteps),
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json(buildAuxillaryOnboardingPayload(nextCompletedSteps));
}
