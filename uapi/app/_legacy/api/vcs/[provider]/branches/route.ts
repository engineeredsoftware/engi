import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// TODO: VCS-core package needs to be implemented
// import { VCSFactory } from '@engi/vcs';

export async function GET(
  request: Request,
  { params }: { params: { provider: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { provider } = params;
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');
    
    if (!owner || !repo) {
      return NextResponse.json({ 
        error: 'Missing required parameters: owner and repo' 
      }, { status: 400 });
    }

    // TODO: Implement VCS branch fetching when vcs-core is available
    // For now, return stub data
    return NextResponse.json({
      branches: [
        { name: 'main', protected: true },
        { name: 'develop', protected: false }
      ],
      message: 'VCS integration not yet implemented - returning stub data'
    });

  } catch (error) {
    console.error('Error fetching branches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch branches' },
      { status: 500 }
    );
  }
}