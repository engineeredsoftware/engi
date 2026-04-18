'use client';

import { openOrbital } from '@/app/orbitals/components/OrbitalsProvider';

import ApplicationWorkspaceCard from './ApplicationWorkspaceCard';
import { APPLICATION_WORKSPACE_EXPLAINERS } from './application-workspace-explainers';
import { APPLICATION_ACTIONS, APPLICATION_EXPERIENCES } from './application-experience-architecture';
import { jumpToShellSection } from './application-shell-reading';

interface ApplicationExperienceFrameProps {
  onOpenConversations: () => void;
}

export default function ApplicationExperienceFrame({ onOpenConversations }: ApplicationExperienceFrameProps) {
  return (
    <ApplicationWorkspaceCard
      kicker="Workspace model"
      title="Read the ledger, then open deeper modes only when needed"
      summary="Keep transactions and selected detail primary, then move into conversations or orbitals only when you need drafting, coordination, or configuration."
      explainer={APPLICATION_WORKSPACE_EXPLAINERS.experienceMap}
    >
      <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
          <p className="text-emerald-300/85">Read window</p>
          <p className="mt-2 text-neutral-200">transactions + selected detail</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
          <p className="text-emerald-300/85">Write posture</p>
          <p className="mt-2 text-neutral-200">give + need + configuring</p>
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
                  Focus transactions
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
                  onClick={() => openOrbital('login', 'connects')}
                  className="rounded-[1.3rem] border border-white/12 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/20 hover:bg-white/10"
                >
                  Open Orbitals fullscreen
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
          Verification, branch artifacts, settlement, proofs, deliverables, and history stay connected as one working
          chain instead of scattering across separate destinations.
        </p>
      </div>

      <div className="mt-6 rounded-[1.6rem] border border-emerald-400/15 bg-[linear-gradient(180deg,rgba(8,14,28,0.92),rgba(5,10,20,0.9))] px-5 py-5">
        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/80">Production realism</p>
        <p className="mt-3 text-sm leading-6 text-neutral-300">
          Bitcode is built for open, auditable, formal operation across producers, consumers, investors, partners, and
          researchers, with modular and observable system surfaces tuned toward throughput, quality, cost, and trust.
        </p>
      </div>
    </ApplicationWorkspaceCard>
  );
}
