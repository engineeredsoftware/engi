'use client';

import { openOrbital } from '@/app/orbitals/components/OrbitalsProvider';

interface ApplicationOpenOrbitalsButtonProps {
  className?: string;
  label?: string;
}

export default function ApplicationOpenOrbitalsButton({
  className = 'rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-left text-sm font-medium text-neutral-100 transition hover:border-white/20 hover:bg-white/10',
  label = 'Open Orbitals',
}: ApplicationOpenOrbitalsButtonProps) {
  return (
    <button
      type="button"
      onClick={() => openOrbital('login', 'connects')}
      className={className}
    >
      {label}
    </button>
  );
}
