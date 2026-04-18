'use client';

import { openOrbital } from '@/app/orbitals/components/OrbitalsProvider';
import {
  getOrbitalOpenActionLabel,
  type ConcreteOrbitalPane,
} from '@/app/orbitals/components/orbital-pane-meta';

interface ApplicationOpenOrbitalsButtonProps {
  className?: string;
  label?: string;
  step?: ConcreteOrbitalPane;
}

export default function ApplicationOpenOrbitalsButton({
  className = 'rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-left text-sm font-medium text-neutral-100 transition hover:border-white/20 hover:bg-white/10',
  label,
  step,
}: ApplicationOpenOrbitalsButtonProps) {
  const resolvedLabel = label || getOrbitalOpenActionLabel(step);

  return (
    <button
      type="button"
      onClick={() => openOrbital('login', step ?? 'connects')}
      className={className}
    >
      {resolvedLabel}
    </button>
  );
}
