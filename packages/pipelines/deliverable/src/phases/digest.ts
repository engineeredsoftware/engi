/**
 * Digest Phase - AGENTS.md Learning Capture
 *
 * User-gated iteration on AGENTS.md with captured learnings.
 * Agent proposes Q&A updates, user reviews, provides feedback.
 * When satisfied, user clicks "Ship" → execution complete.
 */

import { createPhaseRunner } from '@engi/pipelines-generics';

export const digestPhase = createPhaseRunner({
  phaseName: 'digest',
  sequence: [
    {
      agent: 'digest:capture-learnings',
      description: 'Capturing learnings in AGENTS.md',
      input: {
        executionResults: '{{develop.results}}',
        fileChanges: '{{file-changes.stats}}',
        currentAgentsMd: '{{file:.ai/AGENTS.md}}',
        userFeedback: '{{digest.feedback}}'
      }
    }
  ],
  allowShortCircuit: false,
  parallelizationStrategy: 'sequential'
});
