"use client";

import React from "react";

import Logo from "@/components/base/engi/branding/logo";

export type NavSurface = "application" | "orbitals" | "conversations" | null;

interface NavBrandProps {
  animated?: boolean;
  onClick: () => void;
  surface: NavSurface;
}

const SURFACE_COPY: Record<Exclude<NavSurface, null>, { eyebrow: string; title: string }> = {
  application: {
    eyebrow: "Bitcode",
    title: "transactions terminal",
  },
  orbitals: {
    eyebrow: "Bitcode",
    title: "orbitals",
  },
  conversations: {
    eyebrow: "Bitcode",
    title: "conversations",
  },
};

export default function NavBrand({ animated = true, onClick, surface }: NavBrandProps) {
  const surfaceCopy = surface ? SURFACE_COPY[surface] : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-w-0 items-center gap-3 cursor-pointer bg-transparent text-left ${animated ? "nav-logo-animated" : "opacity-0"}`}
    >
      <div
        className={
          surfaceCopy
            ? "flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.2rem] border border-emerald-400/18 bg-[linear-gradient(180deg,rgba(101,254,183,0.16),rgba(101,254,183,0.06))] shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
            : ""
        }
      >
        <Logo beta={!surfaceCopy} height="h-9" width="w-9" />
      </div>
      {surfaceCopy ? (
        <div className="min-w-0">
          <p className="text-[0.58rem] uppercase tracking-[0.24em] text-emerald-300/80 sm:text-[0.62rem]">
            {surfaceCopy.eyebrow}
          </p>
          <p className="mt-1 truncate text-[0.84rem] text-neutral-200 sm:text-sm">{surfaceCopy.title}</p>
        </div>
      ) : null}
    </button>
  );
}
