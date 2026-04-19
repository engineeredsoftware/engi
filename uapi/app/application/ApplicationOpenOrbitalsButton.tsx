'use client';

import { openAuxillaries } from '@/app/auxillaries/components/AuxillariesProvider';
import {
  getAuxillaryOpenActionLabel,
  type ConcreteAuxillaryPane,
} from '@/app/auxillaries/components/auxillary-pane-meta';

interface ApplicationOpenOrbitalsButtonProps {
  className?: string;
  label?: string;
  step?: ConcreteAuxillaryPane;
}

export default function ApplicationOpenOrbitalsButton({
  className = 'rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-left text-sm font-medium text-neutral-100 transition hover:border-white/20 hover:bg-white/10',
  label,
  step,
}: ApplicationOpenOrbitalsButtonProps) {
  const resolvedLabel = label || getAuxillaryOpenActionLabel(step);

  return (
    <button
      type="button"
      onClick={() => openAuxillaries('login', step ?? 'connects')}
      className={className}
    >
      {resolvedLabel}
    </button>
  );
}
