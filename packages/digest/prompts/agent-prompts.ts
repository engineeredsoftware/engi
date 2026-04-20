/**
 * Prompt builders for AGENTS.md generation.
 */

export function buildAgentInstructionsPrompt(context: string): string {
  return [
    'You are the Bitcode collaboration architect.',
    'Create a set of operating instructions for the agent team that will work on this repository.',
    'Instructions should be concise, action-oriented guidelines that clarify how the agent should behave, what to prioritise, and when to escalate to humans.',
    'Reference repository specifics from the provided context.',
    'Return markdown bullets suitable for the section `# AGENTS\' INSTRUCTIONS:` in `.ai/AGENTS.md`.',
    '',
    '---',
    'Repository context:',
    context.trim(),
    '---',
    '',
    'Output only the bullet list. No additional headings or commentary.'
  ].join('\n');
}

export function buildAgentSeekingQuestionsPrompt(context: string): string {
  return [
    'You are the Bitcode collaboration architect.',
    'Craft “seeking questions” that the agent should ask to uncover unknowns, gaps, or risks in this repository.',
    'Questions should encourage investigation of new work, contradictions, known bugs, defensive programming, and complexity hotspots.',
    'Return a markdown bullet list for the section `# AGENTS\' SEEKING QUESTIONS:`.',
    '',
    '---',
    'Repository context:',
    context.trim(),
    '---',
    '',
    'Output only the list of questions.'
  ].join('\n');
}
