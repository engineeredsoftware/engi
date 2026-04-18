"use client";

import React from "react";

type OrbitalsStatTone = "default" | "emerald" | "sky" | "violet" | "amber";

const TONE_ACCENTS: Record<OrbitalsStatTone, string> = {
  default: "text-white/72",
  emerald: "text-emerald-200/76",
  sky: "text-sky-200/76",
  violet: "text-violet-200/76",
  amber: "text-amber-200/76",
};

export interface OrbitalsStatItem {
  label: string;
  value: string;
  detail?: string;
  tone?: OrbitalsStatTone;
}

interface OrbitalsStatGridProps {
  items: OrbitalsStatItem[];
  columns?: 2 | 3 | 4;
}

export default function OrbitalsStatGrid({
  items,
  columns = 2,
}: OrbitalsStatGridProps) {
  const gridClassName =
    columns === 4
      ? "tablet:grid-cols-2 desktop:grid-cols-4"
      : columns === 3
        ? "tablet:grid-cols-3"
        : "tablet:grid-cols-2";

  return (
    <div className={`grid gap-3 ${gridClassName}`}>
      {items.map((item) => (
        <article
          key={`${item.label}-${item.value}`}
          className="rounded-[20px] border border-white/8 bg-black/20 p-4"
        >
          <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${TONE_ACCENTS[item.tone || "default"]}`}>
            {item.label}
          </p>
          <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
          {item.detail ? (
            <p className="mt-2 text-sm leading-6 text-white/62">{item.detail}</p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
