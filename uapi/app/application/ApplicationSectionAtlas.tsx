'use client';

import { useMemo } from 'react';

import { normalizeApplicationSectionAtlas } from './application-section-atlas';
import { useApplicationShellBridge } from './application-shell-bridge';
import { jumpToShellSection } from './application-shell-reading';

type SectionPreview = {
  id: string;
  label: string;
  badge: string;
  preview: string;
  subheads: string[];
  itemCount: number;
};

export default function ApplicationSectionAtlas() {
  const { snapshot } = useApplicationShellBridge();
  const sections = useMemo<SectionPreview[]>(
    () => normalizeApplicationSectionAtlas(snapshot),
    [snapshot],
  );

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,11,22,0.96),rgba(4,8,18,0.94))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">Application section atlas</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-[2.05rem]">
            Route-local body read
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 tablet:text-base">
            Second-gate is now lifting the main Bitcode body into the application frame through semantic shell bridges.
            These cards summarize the current Bitcode sections so operators can read the workspace at application level
            before diving into the deeper underlying surfaces.
          </p>
        </div>

        <div className="grid gap-3 text-xs uppercase tracking-[0.2em] text-neutral-400 tablet:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Body owner</p>
            <p className="mt-2 text-neutral-200">route-local atlas cards</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Semantic source</p>
            <p className="mt-2 text-neutral-200">semantic core + closure surfaces</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {sections.map((section) => (
          <article key={section.id} className="rounded-[1.6rem] border border-white/8 bg-black/20 px-5 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-emerald-300/75">{section.label}</p>
                <p className="mt-2 text-sm leading-6 text-neutral-300">{section.preview}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 text-[0.64rem] uppercase tracking-[0.18em] text-neutral-400">
                {section.badge ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-neutral-200">
                    {section.badge}
                  </span>
                ) : null}
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-neutral-200">
                  {section.itemCount} live cards
                </span>
              </div>
            </div>

            {section.subheads.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {section.subheads.map((subhead) => (
                  <span
                    key={`${section.id}-${subhead}`}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-neutral-300"
                  >
                    {subhead}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-5">
              <button
                type="button"
                onClick={() => jumpToShellSection(section.id)}
                className="rounded-[1.3rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
              >
                Open {section.label}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
