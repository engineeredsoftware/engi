import { ShieldCheck, Layers } from 'lucide-react';
import MarketingSectionWrapper from './MarketingSectionWrapper';
import MarketingEngiVideoCard from './MarketingEngiVideoCard';

const docHighlights = [
  {
    title: '.ai/PRODUCT.md',
    description: 'Product intent stays precise and Bitcode rewrites it live during the conversation.'
  },
  {
    title: '.ai/AGENTS.md',
    description: 'Captures rituals and seeking questions so every collaboration compounds.'
  },
  {
    title: '.ai/MCPS.md',
    description: 'Documents MCP tool access, confirmations, and DevOps guardrails.'
  }
];

const processTrack = [
  { label: 'Inputs', value: 'Figma frames · Loom transcripts · `.ai` docs · repo history' },
  { label: 'Orchestration', value: 'Plan → Try → Refine steps with automatic MCP tool routing' },
  { label: 'Outputs', value: 'Plans, diffs, deployments, and `.ai` updates in one chat thread' }
];

const toolGroups = [
  {
    phase: 'Design intelligence',
    summary: 'Keep design intent and collaboration rituals ahead of implementation.',
    tools: [
      { id: 'depict_design_asset', usage: 'Turn visuals into citations Bitcode can reference later.' },
      { id: 'design_code', usage: 'Regenerate `.ai/PRODUCT.md` from digest or new ideas.' },
      { id: 'code_design', usage: 'Translate approved intent into implementation steps + patch shells.' },
      { id: 'improve_developing_behavior', usage: 'Capture new rituals inside `.ai/AGENTS.md`.' }
    ]
  },
  {
    phase: 'Code & research',
    summary: 'Study the repo and market signals before writing a single line.',
    tools: [
      { id: 'answer_codebase_query', usage: 'Regex-grade searches with annotated matches and guidance.' },
      { id: 'answer_codeweb_query', usage: 'Exa-backed research lists for external proof and inspiration.' },
      { id: 'read_code_changes_from_vcs', usage: 'Summarise fresh commits before proposing new work.' },
      { id: 'write_code_changes_to_vcs', usage: 'Create repos or push scoped diffs with confirmation gates.' }
    ]
  },
  {
    phase: 'Ops & delivery',
    summary: 'Narrate status, deploy, and adjust infrastructure without leaving ChatGPT.',
    tools: [
      { id: 'use_vercel_read_external_mcp', usage: 'List deployments, inspect events, and share live build context.' },
      { id: 'use_vercel_write_external_mcp', usage: 'Request preview deploys, domains, and billing actions intentionally.' },
      { id: 'use_aws_read_external_mcp', usage: 'Invoke Lambda, fetch S3, read Dynamo, or pull logs.' },
      { id: 'use_aws_write_external_mcp', usage: 'Upload artefacts or seed data into AWS with confirmation loops.' }
    ]
  }
];

export default function MarketingEngiHero() {
  return (
    <MarketingSectionWrapper className="min-h-[calc(100vh-4rem)] pt-16 pb-16">
      <div className="grid gap-10 laptop:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] laptop:items-start">
        <div className="flex flex-col gap-6">
          <div className="space-y-4 text-left max-w-2xl">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
              <Layers className="h-3 w-3" /> Bitcode · ChatGPT App
            </span>
            <div className="space-y-3">
              <h1 className="text-4xl phone:text-5xl tablet:text-[54px] font-semibold leading-tight text-white">
                <span className="bg-gradient-to-r from-emerald-200 via-white to-emerald-200 bg-clip-text text-transparent">
                  Ship software by conversing with Bitcode—not by coding.
                </span>
              </h1>
              <p className="text-base tablet:text-lg leading-relaxed text-emerald-100/85">
                Bitcode sits inside ChatGPT as an MCP server. You narrate `.ai` documents, Bitcode orchestrates planning,
                repo work, research, and DevOps, and the entire loop stays in the chat.
              </p>
              <p className="text-[13px] leading-relaxed text-emerald-100/70">
                Every turn assumes the first instinct is wrong—Bitcode forces deeper reading, minimalist planning,
                and zero-regression execution.
              </p>
            </div>
          </div>

          <div className="grid gap-4 tablet:grid-cols-3">
            {docHighlights.map((doc) => (
              <div
                key={doc.title}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_10px_30px_rgba(15,118,110,0.15)]"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200/80">{doc.title}</p>
                <p className="mt-2 text-[13px] leading-snug text-emerald-100/80">{doc.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 sm:flex sm:items-center sm:justify-between">
            <div className="space-y-3">
              {processTrack.map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald-300/80">{item.label}</span>
                  <p className="text-sm text-emerald-100/85">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12px] text-emerald-100/65 sm:mt-0 sm:max-w-xs">
              Everything is auditable: Bitcode leaves the conversation with the exact plan, diff, deployment log,
              and `.ai` update it produced.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-slate-900/85 p-3 shadow-[0_25px_60px_rgba(3,93,82,0.35)]">
            <div className="rounded-2xl bg-black/40 p-2 shadow-inner">
              <MarketingEngiVideoCard />
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-emerald-200/80">
              Recorded walkthrough · Every step stays visible
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_0_35px_rgba(6,95,70,0.25)]">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-200/80">
              <ShieldCheck className="h-4 w-4" /> MCP tool reference
            </p>
            <p className="mt-2 text-base font-semibold text-white">Everything you need, already wired up.</p>
            <div className="mt-4 space-y-4 max-h-[420px] overflow-y-auto pr-1">
              {toolGroups.map((group) => (
                <div key={group.phase} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200/70">{group.phase}</p>
                  <p className="mt-1 text-sm text-emerald-100/80">{group.summary}</p>
                  <div className="mt-3 space-y-2">
                    {group.tools.map((tool) => (
                      <div key={tool.id} className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-2">
                        <code className="block font-mono text-[11px] text-emerald-200">{tool.id}</code>
                        <p className="text-[12px] leading-snug text-emerald-100/80">{tool.usage}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12px] text-emerald-100/65">
              The Bitcode ChatGPT App stays simple on the surface so the dense parts—the tools—remain powerful.
            </p>
          </div>
        </div>
      </div>
    </MarketingSectionWrapper>
  );
}
