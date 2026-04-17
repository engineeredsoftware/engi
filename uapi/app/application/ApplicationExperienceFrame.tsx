'use client';

import { openOrbital } from '@/app/orbitals/components/OrbitalsProvider';

import { APPLICATION_ACTIONS, APPLICATION_EXPERIENCES } from './application-experience-architecture';
import { jumpToShellSection } from './application-shell-reading';

interface ApplicationExperienceFrameProps {
  onOpenConversations: () => void;
}

export default function ApplicationExperienceFrame({ onOpenConversations }: ApplicationExperienceFrameProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,8,18,0.94))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">V26 application architecture</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-[2.05rem]">
            Three main experiences. Two main actions.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 tablet:text-base">
            `/application` is the Bitcode master-detail experience. Conversations and orbitals are fullscreen modes entered
            from here. Inside master detail, the operator primarily works through two actions: give and need.
          </p>
        </div>

        <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Primary experience</p>
            <p className="mt-2 text-neutral-200">master detail</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Primary actions</p>
            <p className="mt-2 text-neutral-200">give + need</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {APPLICATION_EXPERIENCES.map((experience) => (
          <article key={experience.id} className="rounded-[1.6rem] border border-white/8 bg-black/20 px-5 py-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.66rem] uppercase tracking-[0.2em] text-emerald-300/75">{experience.badge}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{experience.label}</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-300">
                experience
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-300">{experience.description}</p>
            <div className="mt-5">
              {experience.id === 'master-detail' ? (
                <button
                  type="button"
                  onClick={() => jumpToShellSection(experience.targetId)}
                  className="rounded-[1.3rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
                >
                  Focus master detail
                </button>
              ) : experience.id === 'conversations' ? (
                <button
                  type="button"
                  onClick={onOpenConversations}
                  className="rounded-[1.3rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
                >
                  Open conversations
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openOrbital('account')}
                  className="rounded-[1.3rem] border border-white/12 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/20 hover:bg-white/10"
                >
                  Open orbitals
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {APPLICATION_ACTIONS.map((action) => (
          <article
            key={action.id}
            className="rounded-[1.6rem] border border-emerald-400/15 bg-[linear-gradient(180deg,rgba(8,14,28,0.92),rgba(5,10,20,0.9))] px-5 py-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.66rem] uppercase tracking-[0.2em] text-emerald-300/75">{action.badge}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{action.label}</h3>
              </div>
              <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-emerald-200">
                action
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-300">{action.description}</p>
            <div className="mt-5">
              <button
                type="button"
                onClick={() => jumpToShellSection(action.targetId)}
                className="rounded-[1.3rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
              >
                Focus {action.label.toLowerCase()}
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-[1.6rem] border border-white/8 bg-black/20 px-5 py-5">
        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Closure stages</p>
        <p className="mt-3 text-sm leading-6 text-neutral-300">
          Verification, branch artifacts, settlement, proofs, deliverables, and history remain first-class Bitcode
          surfaces, but they are closure stages within master detail rather than separate top-level experiences or actions.
        </p>
      </div>
    </section>
  );
}
