import { NextResponse } from 'next/server';

import { createClient } from '@bitcode/supabase/ssr/server';
import { TemplatesService } from '@bitcode/templates-generics';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ templates: [] });
  }

  const url = new URL(request.url);
  const type = url.searchParams.get('type') || undefined;
  const templatesService = new TemplatesService(supabase as any);

  try {
    const templates = await templatesService.getDeliverableTemplates(user.id, type);
    return NextResponse.json({ templates });
  } catch (templatesError) {
    const message =
      templatesError instanceof Error
        ? templatesError.message
        : 'Failed to load deliverable templates';

    return NextResponse.json({ error: message, templates: [] }, { status: 500 });
  }
}
