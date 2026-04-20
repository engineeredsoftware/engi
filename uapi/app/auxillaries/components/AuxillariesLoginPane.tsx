"use client";

import React from 'react';

import LoginForm from '@/components/base/engi/auth/LoginForm';
import {
  AUXILLARIES_ACCESS_LABEL,
  AUXILLARIES_LIST_LABEL,
} from './auxillary-pane-meta';

interface AuxillariesLoginPaneProps {
  onClose?: () => void;
  onToggle?: () => void;
  surfaceVariant?: 'default' | 'contained';
}

export default function AuxillariesLoginPane({
  onClose,
  onToggle,
  surfaceVariant = 'default',
}: AuxillariesLoginPaneProps) {
  const isContainedSurface = surfaceVariant === 'contained';

  return (
    <div className={`orbital-auth-shell ${isContainedSurface ? 'orbital-auth-shell-contained' : ''}`}>
      <div className="orbital-auth-grid">
        <aside className="orbital-auth-aside">
          <div className="orbital-auth-intro-card rounded-[1.6rem] border border-emerald-400/16 bg-emerald-400/8 px-5 py-5">
            <p className="text-[0.66rem] uppercase tracking-[0.22em] text-emerald-200/78">
              {AUXILLARIES_ACCESS_LABEL}
            </p>
            <h2 className="mt-3 text-[1.65rem] font-semibold tracking-[-0.04em] text-white">
              Open {AUXILLARIES_LIST_LABEL}
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/74">
              Sign in to reopen transactions, conversations, and the four Bitcode auxillaries without
              losing the current transaction context.
            </p>
          </div>

          <div className={`orbital-auth-support-grid ${isContainedSurface ? 'orbital-auth-support-grid-contained' : ''}`}>
            <div className="orbital-auth-support-card rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-emerald-200/74">
                Primary path
              </p>
              <p className="mt-2 text-sm leading-7 text-white/74">
                Email code remains the most direct way to reopen Bitcode and continue from the
                current transactions context.
              </p>
            </div>

            <div className="orbital-auth-support-card rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-white/72">
                Connected providers
              </p>
              <p className="mt-2 text-sm leading-7 text-white/74">
                GitHub and Google stay available here. Wallet binding continues inside Profile and
                $BTD after Auxillaries open.
              </p>
            </div>

            <div className="orbital-auth-support-card orbital-auth-support-card-wide rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-white/72">
                Auxillaries after sign-in
              </p>
              <ul className="mt-2 space-y-2 text-sm leading-7 text-white/74">
                <li>Transactions and selected detail stay where you left them.</li>
                <li>Conversations reopen only when you need deeper writing or coordination.</li>
                <li>Connects, Interfaces, Profile, and $BTD stay available as the four auxillaries.</li>
              </ul>
            </div>
          </div>
        </aside>

        <section className="orbital-auth-form">
          <LoginForm onClose={onClose} onToggle={onToggle} surfaceVariant={surfaceVariant} />
        </section>
      </div>
    </div>
  );
}
