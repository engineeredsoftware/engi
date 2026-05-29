"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { AlertCircle, CircleDashed, ShieldCheck } from "lucide-react";

type ProductRouteTone = "emerald" | "sky" | "violet";

type ToneClasses = {
  page: string;
  headerBorder: string;
  eyebrow: string;
  activeStep: string;
  inactiveStep: string;
  focusRing: string;
  panelAccent: string;
};

const TONE_CLASSES: Record<ProductRouteTone, ToneClasses> = {
  emerald: {
    page: "bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_30%),linear-gradient(180deg,#050915_0%,#02050d_100%)]",
    headerBorder: "border-emerald-300/15",
    eyebrow: "text-emerald-200/80",
    activeStep:
      "border-emerald-300/38 bg-emerald-300/12 shadow-[0_0_24px_rgba(16,185,129,0.12)]",
    inactiveStep:
      "border-white/10 bg-white/[0.035] hover:border-emerald-300/24 hover:bg-emerald-300/[0.06]",
    focusRing: "focus-visible:ring-emerald-300/55",
    panelAccent:
      "border-emerald-300/15 bg-emerald-300/[0.04] text-emerald-100/85",
  },
  sky: {
    page: "bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_30%),linear-gradient(180deg,#050915_0%,#02050d_100%)]",
    headerBorder: "border-sky-300/15",
    eyebrow: "text-sky-200/80",
    activeStep:
      "border-sky-300/38 bg-sky-300/12 shadow-[0_0_24px_rgba(56,189,248,0.12)]",
    inactiveStep:
      "border-white/10 bg-white/[0.035] hover:border-sky-300/24 hover:bg-sky-300/[0.06]",
    focusRing: "focus-visible:ring-sky-300/55",
    panelAccent: "border-sky-300/15 bg-sky-300/[0.04] text-sky-100/85",
  },
  violet: {
    page: "bg-[radial-gradient(circle_at_top_left,rgba(167,139,250,0.13),transparent_30%),linear-gradient(180deg,#050915_0%,#02050d_100%)]",
    headerBorder: "border-violet-300/15",
    eyebrow: "text-violet-200/80",
    activeStep:
      "border-violet-300/38 bg-violet-300/12 shadow-[0_0_24px_rgba(167,139,250,0.12)]",
    inactiveStep:
      "border-white/10 bg-white/[0.035] hover:border-violet-300/24 hover:bg-violet-300/[0.06]",
    focusRing: "focus-visible:ring-violet-300/55",
    panelAccent: "border-violet-300/15 bg-violet-300/[0.04] text-violet-100/85",
  },
};

export type ProductRouteMetric = {
  label: string;
  value: React.ReactNode;
};

export type ProductRouteStep<StepId extends string = string> = {
  id: StepId;
  label: string;
  state: string;
  lowDetailGuidance?: string;
};

type ProductRouteShellProps = {
  testId: string;
  tone: ProductRouteTone;
  label: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  metrics: ProductRouteMetric[];
  children: React.ReactNode;
};

export function ProductRouteShell({
  testId,
  tone,
  label,
  title,
  summary,
  icon: Icon,
  metrics,
  children,
}: ProductRouteShellProps) {
  const toneClasses = TONE_CLASSES[tone];

  return (
    <main
      data-testid={testId}
      className={`min-h-screen ${toneClasses.page} px-4 pb-24 pt-32 text-neutral-100 tablet:px-6 desktop:px-8`}
    >
      <div className="mx-auto grid w-full max-w-[1800px] gap-5">
        <header
          className={`grid gap-5 border ${toneClasses.headerBorder} bg-[linear-gradient(135deg,rgba(7,14,26,0.96),rgba(4,9,18,0.92))] px-5 py-5 shadow-[0_30px_100px_rgba(0,0,0,0.34)] xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.6fr)] xl:items-end`}
        >
          <div>
            <p
              className={`flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.34em] ${toneClasses.eyebrow}`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-neutral-300 tablet:text-base">
              {summary}
            </p>
          </div>
          <dl className="grid gap-2 text-xs uppercase tracking-[0.18em] text-neutral-300 tablet:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="border border-white/10 bg-white/[0.045] px-4 py-3"
              >
                <dt className="text-neutral-500">{metric.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-white">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </header>
        {children}
      </div>
    </main>
  );
}

type ProductRouteStepGridProps<StepId extends string> = {
  ariaLabel: string;
  activeStepId: StepId;
  steps: ProductRouteStep<StepId>[];
  tone: ProductRouteTone;
  testIdPrefix: string;
  stateDataAttribute: string;
  onSelect: (stepId: StepId) => void;
};

export function ProductRouteStepGrid<StepId extends string>({
  ariaLabel,
  activeStepId,
  steps,
  tone,
  testIdPrefix,
  stateDataAttribute,
  onSelect,
}: ProductRouteStepGridProps<StepId>) {
  const toneClasses = TONE_CLASSES[tone];

  return (
    <section className="grid gap-3 md:grid-cols-5" aria-label={ariaLabel}>
      {steps.map((step) => {
        const active = step.id === activeStepId;
        const stateAttribute = { [stateDataAttribute]: step.state };
        return (
          <button
            type="button"
            key={step.id}
            data-testid={`${testIdPrefix}-${step.id}`}
            aria-current={active ? "step" : undefined}
            onClick={() => onSelect(step.id)}
            className={`min-h-[9rem] border px-4 py-4 text-left outline-none transition focus-visible:ring-2 ${toneClasses.focusRing} ${
              active ? toneClasses.activeStep : toneClasses.inactiveStep
            }`}
            {...stateAttribute}
          >
            <span className="text-[0.6rem] uppercase tracking-[0.18em] text-neutral-500">
              {step.state}
            </span>
            <span className="mt-2 block text-sm font-semibold text-neutral-100">
              {step.label}
            </span>
            {step.lowDetailGuidance ? (
              <span className="mt-2 block text-xs leading-5 text-neutral-400">
                {step.lowDetailGuidance}
              </span>
            ) : null}
          </button>
        );
      })}
    </section>
  );
}

type ProductRouteStatePanelProps = {
  variant: "loading" | "empty" | "error";
  title: string;
  message: string;
  compact?: boolean;
};

export function ProductRouteStatePanel({
  variant,
  title,
  message,
  compact = false,
}: ProductRouteStatePanelProps) {
  const Icon =
    variant === "error"
      ? AlertCircle
      : variant === "loading"
        ? CircleDashed
        : ShieldCheck;
  const colorClass =
    variant === "error"
      ? "border-red-300/20 bg-red-300/10 text-red-100"
      : "border-white/10 bg-black/20 text-neutral-300";

  return (
    <div
      className={`border ${colorClass} ${compact ? "px-3 py-3" : "px-4 py-5"}`}
    >
      <div className="flex items-start gap-3">
        <Icon
          className={`mt-0.5 h-4 w-4 ${variant === "loading" ? "animate-spin" : ""}`}
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-medium text-current">{title}</p>
          <p className="mt-1 text-xs leading-5 text-current/80">{message}</p>
        </div>
      </div>
    </div>
  );
}

type ProductRouteDisclosureProps = {
  title: string;
  tone: ProductRouteTone;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function ProductRouteDisclosure({
  title,
  tone,
  children,
  defaultOpen = false,
}: ProductRouteDisclosureProps) {
  const toneClasses = TONE_CLASSES[tone];

  return (
    <details
      className={`border px-3 py-3 ${toneClasses.panelAccent}`}
      open={defaultOpen}
    >
      <summary className="cursor-pointer text-[0.62rem] uppercase tracking-[0.16em]">
        {title}
      </summary>
      <div className="mt-2 text-xs leading-5 text-neutral-300">{children}</div>
    </details>
  );
}
