import { access } from 'node:fs/promises';
import path from 'node:path';

import MarketingEngiVideoCard from '../(root)/components/MarketingEngiVideoCard';
import PublicShellFrame from '../(root)/components/PublicShellFrame';
import { MARKETING_OPERATOR_GUIDE_SOURCES } from '../(root)/components/marketing-operator-guide-assets';
import Footer from '@/components/base/engi/layout/footer';
import { BITCODE_PUBLIC_COPY } from '@/components/base/engi/layout/bitcode-public-copy';

async function resolveOperatorGuideSourceIndex() {
  for (const [candidateIndex, candidateSource] of MARKETING_OPERATOR_GUIDE_SOURCES.entries()) {
    try {
      await access(path.join(process.cwd(), candidateSource.relativeSourcePath));
      return candidateIndex;
    } catch {
      // Ignore missing public assets and continue through the ordered compatibility candidates.
    }
  }

  return null;
}

export default async function DemoVideoPage() {
  const playableSourceIndex = await resolveOperatorGuideSourceIndex();

  return (
    <PublicShellFrame>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_30%),linear-gradient(180deg,#04101a_0%,#030816_45%,#02060d_100%)] text-white">
        <main className="mx-auto flex w-full max-w-[1100px] flex-col gap-8 px-4 py-16 phone:px-5 tablet:px-6 laptop:px-8">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-200/70">
              {BITCODE_PUBLIC_COPY.guideRoute.eyebrow}
            </p>
            <h1 className="max-w-[16ch] text-[2.35rem] font-semibold leading-[0.96] tracking-[-0.025em] text-white phone:text-[2.9rem] tablet:text-[3.6rem]">
              {BITCODE_PUBLIC_COPY.guideRoute.heading}
            </h1>
            <p className="max-w-[42rem] text-[17px] leading-8 text-white/78">
              {BITCODE_PUBLIC_COPY.guideRoute.body}
            </p>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-black/30 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl">
            <MarketingEngiVideoCard
              initialPlayableSourceIndex={playableSourceIndex}
              initialSourceResolved
            />
          </div>
        </main>

        <Footer showPrimaryContent={false} className="border-white/10 bg-[#02060d]/72 backdrop-blur-xl" />
      </div>
    </PublicShellFrame>
  );
}
