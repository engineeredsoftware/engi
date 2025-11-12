"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import RichTextInput from '@/app/conversations/components/ConversationsRichTextInput';
import ShimmerButton from '@/components/base/engi/effects/button-shimmer';
import { fetchDeliverableInstructions, postDeliverableInstruction } from '@/networking/api-client';

interface Instruction {
  id: string;
  content: string;
  attachments: any;
  state: string;
  created_at: string;
}
export interface ExecutionInstructionsProps {
  runId: string;
  runKind?: 'deliverable';
  onNewInstruction?: (inst: Instruction) => void;
  placeholder?: string;
  label?: string;
}

/**
 * Execution Instructions
 *
 * Unified instruction interface for executions.
 * Replaces "OTF Instructions" with simply "Instructions".
 * Works in both execution logs and conversation contexts.
 */
export default function ExecutionInstructions({
  runId,
  runKind = 'deliverable',
  onNewInstruction,
  placeholder = 'Provide instruction to guide execution...',
  label = 'Instructions'
}: ExecutionInstructionsProps) {
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    fetchDeliverableInstructions(runId)
      .then((data) => { if (mounted) setInstructions(data); })
      .catch(() => {})
      .finally(() => { if (mounted) setInitialLoading(false); });
    return () => { mounted = false; };
  }, [runId, runKind]);

  useEffect(() => {
    if (!runId) return;
    const type = 'pipeline:deliverables';
    const es = new EventSource(`/api/executions/stream?type=${encodeURIComponent(type)}&runId=${runId}&lastId=0`);
    es.onmessage = (evt) => {
      try {
        const payload = JSON.parse(evt.data);
        if (payload?.type === 'instruction') {
          setInstructions((prev) => prev.some((i) => i.id === payload.id) ? prev : [
            ...prev,
            {
              id: payload.id,
              content: payload.content,
              attachments: payload.attachments,
              state: payload.state || 'accepted',
              created_at: payload.ts || new Date().toISOString(),
            },
          ]);
          onNewInstruction?.(payload);
        }
      } catch {}
    };
    es.onerror = () => es.close();
    return () => es.close();
  }, [runId, runKind, onNewInstruction]);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const inst = await postDeliverableInstruction(runId, message);
      setInstructions((prev) => [...prev, inst]);
      onNewInstruction?.(inst);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    if (isNearBottom) el.scrollTop = el.scrollHeight;
  }, [instructions]);

  return (
    <div className="mt-4 space-y-4">
      {/* Label */}
      {label && (
        <h3 className="text-sm font-medium text-gray-300">{label}</h3>
      )}

      {/* Timeline of instructions */}
      <div ref={listRef} className="relative mb-4 max-h-60 overflow-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <ol className="space-y-4">
          {instructions.map((inst, idx) => {
            const badgeColor = inst.state === 'rejected' ? 'bg-red-600' : inst.state === 'pending' ? 'bg-yellow-600' : 'bg-emerald-600';
            return (
              <li key={inst.id} className="relative pl-6">
                {idx !== instructions.length - 1 && (<span className="absolute left-2 top-4 h-full w-px bg-gray-700" aria-hidden="true" />)}
                <span className={`absolute left-0 top-2.5 h-3 w-3 rounded-full ${badgeColor}`} aria-hidden="true" />
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-md p-3">
                  <div className="flex items-start justify-between gap-4">
                    <pre className="font-sans whitespace-pre-wrap text-sm text-gray-200 flex-1">{inst.content}</pre>
                    <span className="text-xs text-gray-400 whitespace-nowrap select-none pt-0.5">{new Date(inst.created_at).toLocaleTimeString()}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="flex items-stretch gap-2 h-12">
        <div className="flex-1 h-full">
          <RichTextInput onSend={handleSend} placeholder="Type instruction and press Enter…" disabled={loading} enablePickers={false} fullHeight={true} compact={true} className="h-full" />
        </div>
        <ShimmerButton aria-label="Send instruction" onClick={() => {
          const inputEl = document.querySelector('textarea, input[data-testid="rti"], textarea');
          const val = (inputEl as HTMLInputElement | HTMLTextAreaElement | null)?.value || '';
          if (val.trim()) handleSend(val);
        }} disabled={loading} borderRadius="8px" className="min-w-[6rem] self-stretch flex items-center justify-center px-4 py-0 shadow-none">
          {loading ? 'Sending…' : 'Instruct'}
        </ShimmerButton>
      </div>
      {loading && (<div className="flex items-center text-gray-400 mt-2"><Loader2 className="animate-spin mr-2" size={16} /> Sending...</div>)}
    </div>
  );
}
