import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@bitcode/supabase';
import { createClient } from '@bitcode/supabase/ssr/server';

import {
  ENABLE_MOCKS,
  MOCK_USER_TEMPLATES,
  MOCK_USER_TEMPLATES_SCENARIO,
} from '@/config/featureFlags';
import userTemplatesDefaultMock from '@/mocks/user-template-preferences-default.json';
import userTemplatesEmptyMock from '@/mocks/user-template-preferences-empty.json';

const EMPTY_TEMPLATE_PREFERENCES = {
  deliverable_templates: {},
  ai_document_templates: {},
};

function getMockTemplatePreferences() {
  switch (MOCK_USER_TEMPLATES_SCENARIO) {
    case 'empty':
      return userTemplatesEmptyMock;
    default:
      return userTemplatesDefaultMock;
  }
}

export const runtime = 'nodejs';

export async function GET() {
  if (ENABLE_MOCKS && MOCK_USER_TEMPLATES) {
    return NextResponse.json(getMockTemplatePreferences());
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(EMPTY_TEMPLATE_PREFERENCES);
  }

  const { data, error: selectError } = await supabaseAdmin
    .from('user_template_preferences')
    .select('deliverable_templates, ai_document_templates')
    .eq('user_id', user.id)
    .maybeSingle();

  if (selectError) {
    return NextResponse.json(
      { error: selectError.message || 'Failed to load template preferences' },
      { status: 500 },
    );
  }

  return NextResponse.json(data || EMPTY_TEMPLATE_PREFERENCES);
}

export async function POST(request: Request) {
  if (ENABLE_MOCKS && MOCK_USER_TEMPLATES) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const payload =
    body && typeof body === 'object'
      ? {
          deliverable_templates:
            typeof (body as Record<string, unknown>).deliverable_templates === 'object' &&
            (body as Record<string, unknown>).deliverable_templates !== null
              ? (body as Record<string, unknown>).deliverable_templates
              : null,
          ai_document_templates:
            typeof (body as Record<string, unknown>).ai_document_templates === 'object' &&
            (body as Record<string, unknown>).ai_document_templates !== null
              ? (body as Record<string, unknown>).ai_document_templates
              : null,
        }
      : {
          deliverable_templates: null,
          ai_document_templates: null,
        };

  if (!payload.deliverable_templates || !payload.ai_document_templates) {
    return NextResponse.json({ error: 'Invalid template preferences format' }, { status: 400 });
  }

  const { error: upsertError } = await supabaseAdmin.from('user_template_preferences').upsert(
    {
      user_id: user.id,
      deliverable_templates: payload.deliverable_templates,
      ai_document_templates: payload.ai_document_templates,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  );

  if (upsertError) {
    return NextResponse.json(
      { error: upsertError.message || 'Failed to update template preferences' },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
