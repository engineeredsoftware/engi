"use client";

import { useState } from 'react';
import { Play } from 'lucide-react';

const DEMO_VIDEO_SRC = '/videos/engi-demo.mp4';
const DEMO_VIDEO_POSTER = '/marketing/engi-demo-poster.png';

export default function MarketingEngiVideoCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-3 rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-left shadow-[0_0_35px_rgba(16,185,129,0.2)] backdrop-blur">
        <span className="inline-flex w-fit items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">Demo video</span>
        <p className="text-sm text-emerald-100/80">Drop a Bitcode demo at <code className="text-emerald-200">public{DEMO_VIDEO_SRC}</code> to enable inline playback.</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.25),_rgba(15,23,42,0.95)_70%)] shadow-[0_0_45px_rgba(16,185,129,0.25)]">
      {isPlaying ? (
        <video
          className="h-full w-full object-cover"
          controls
          autoPlay
          poster={DEMO_VIDEO_POSTER}
          onError={() => setHasError(true)}
        >
          <source src={DEMO_VIDEO_SRC} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-900/70 via-slate-900/30 to-slate-900/80 p-10 text-center transition"
        >
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200 ring-2 ring-emerald-400/40 ring-offset-2 ring-offset-slate-950 transition group-hover:bg-emerald-500/30 group-hover:text-white">
            <Play className="ml-1 h-8 w-8" />
          </span>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-white">Watch Bitcode build software</p>
            <p className="text-sm text-emerald-100/80">Design-driven development, `.ai` documents, GitHub shipping—captured in a single ChatGPT session.</p>
          </div>
        </button>
      )}
    </div>
  );
}
