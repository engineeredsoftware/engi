"use client";

import React from 'react';

export type PillType =
  | 'phase'
  | 'agent'
  | 'step'
  | 'failsafe'
  | 'generation'
  | 'tool';

interface PathPillProps {
  label: string | number | React.ReactNode;
  type: PillType;
  className?: string;
}

// Utility class generator – keeps style footprint tiny while allowing
// future token-based overrides.
const BASE =
  'inline-flex items-center justify-center px-2 py-[1px] text-[0.67rem] font-medium uppercase tracking-wider rounded-sm ring-1 ring-inset flex-shrink-0 select-none shadow-[inset_0_0_4px_var(--tw-ring-color)]';

const typeToClasses: Record<PillType, string> = {
  phase: `${BASE} bg-gradient-to-r from-gray-600/30 to-gray-600/10 text-gray-100 ring-gray-500/40`,
  agent: `${BASE} bg-gradient-to-r from-sky-600/40 to-sky-600/10 text-sky-100 ring-sky-500/40`,
  step: `${BASE} bg-gradient-to-r from-emerald-600/40 to-emerald-600/10 text-emerald-100 ring-emerald-500/40`,
  failsafe: `${BASE} bg-gradient-to-r from-purple-600/40 to-purple-600/10 text-purple-100 ring-purple-500/40`,
  generation: `${BASE} bg-gradient-to-r from-amber-600/40 to-amber-600/10 text-amber-100 ring-amber-500/40`,
  tool: `${BASE} bg-gradient-to-r from-indigo-600/40 to-indigo-600/10 text-indigo-100 ring-indigo-500/40`,
};
// Optional icon per pill value ------------------------------------------------
import {
  GearIcon,
  MagnifyingGlassIcon,
  Pencil2Icon,
  CheckCircledIcon,
  RocketIcon,
  ClipboardIcon,
  MagicWandIcon,
  MixerHorizontalIcon,
  LightningBoltIcon,
  StackIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChatBubbleIcon,
  ScissorsIcon,
  LayersIcon,
} from '@radix-ui/react-icons';

const PhaseIcon: Record<string, React.ComponentType<any>> = {
  Setup: GearIcon,
  Discovery: MagnifyingGlassIcon,
  Implementation: Pencil2Icon,
  Validation: CheckCircledIcon,
  Finish: RocketIcon,
};

const StepIcon: Record<string, React.ComponentType<any>> = {
  Plan: ClipboardIcon,
  Generate: MagicWandIcon,
  Refine: MixerHorizontalIcon,
  Intensify: LightningBoltIcon,
};

const FailsafeIcon: Record<string, React.ComponentType<any>> = {
  'Prepare Context': StackIcon,
  'Handle Input': ArrowLeftIcon,
  'Handle Output': ArrowRightIcon,
};

const GenerationIcon: Record<string, React.ComponentType<any>> = {
  Reason: ChatBubbleIcon,
  Judge: ScissorsIcon,
  Structure: LayersIcon,
};

function getIcon(type: PillType, label: string): React.ComponentType<any> | null {
  switch (type) {
    case 'phase':
      return PhaseIcon[label as keyof typeof PhaseIcon] || null;
    case 'step':
      return StepIcon[label as keyof typeof StepIcon] || null;
    case 'failsafe':
      return FailsafeIcon[label as keyof typeof FailsafeIcon] || null;
    case 'generation':
      return GenerationIcon[label as keyof typeof GenerationIcon] || null;
    default:
      return null;
  }
}

export function PathPill({ label, type, className = '' }: PathPillProps) {
  const text = typeof label === 'string' ? label.toUpperCase() : label;
  const Icon = typeof label === 'string' ? getIcon(type, label) : null;

  return (
    <span className={`${typeToClasses[type]} flex gap-1 items-center ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {text}
    </span>
  );
}
