// uapi/stories/Stage.stories.tsx

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ProcessLogHeader } from '@/app/executions/components/ExecutionProcessLogHeader';
import { ProcessLog } from '@/app/executions/components/ExecutionProcessLog';
import ExecutionOnTheFlyInstructions from '@/app/executions/components/ExecutionOnTheFlyInstructions';

const sampleOutput = `
Setup: Initializing run... (Generation)
Discovery: Scanning components for domain context... (Generation)
Tool: Authenticated with cloud provider (tool use)
Implementation: Generated code snippet without tests (Generation) – incorrect
Validation: Running lint checks... (Generation)
On-the-fly: Please regenerate snippet with unit tests (OTF)
Tool: Deployed snapshot to staging (tool use)
Finish: Finalizing AssetPack receipt... (Generation)
`;

const outputDetails: Record<string, any> = {
  'Setup: Initializing run... (Generation)': { status: { executionState: { phase: 'Setup', agent: 'InitAgent', step: 'init', failsafe: 'prepare_concise_context', generation: 'reason' } } },
  'Discovery: Scanning components for domain context... (Generation)': { status: { executionState: { phase: 'Discovery', agent: 'ScanAgent', step: 'scan', failsafe: 'chunk_then_sum', generation: 'judge' } } },
  'Tool: Authenticated with cloud provider (tool use)': { status: { executionState: { phase: 'Discovery', agent: 'AuthAgent', step: 'authenticate', failsafe: 'stitch_until_complete', generation: 'structured_output' } } },
  'Implementation: Generated code snippet without tests (Generation) – incorrect': { status: { executionState: { phase: 'Implementation', agent: 'CodeGenAgent', step: 'generateSnippet', failsafe: 'prepare_concise_context', generation: 'reason' } } },
  'Validation: Running lint checks... (Generation)': { status: { executionState: { phase: 'Validation', agent: 'LintAgent', step: 'runLint', failsafe: 'chunk_then_sum', generation: 'judge' } } },
  'On-the-fly: Please regenerate snippet with unit tests (OTF)': { type: 'user_otf_instruction', id: 'otf1', content: 'Please regenerate snippet with unit tests', attachments: [], state: 'accepted', ts: new Date().toISOString() },
  'Tool: Deployed snapshot to staging (tool use)': { status: { executionState: { phase: 'Finish', agent: 'DeliverAgent', step: 'deliver', failsafe: 'stitch_until_complete', generation: 'structured_output' } } },
  'Finish: Finalizing AssetPack receipt... (Generation)': { status: { executionState: { phase: 'Finish', agent: 'DeliverAgent', step: 'finalize', failsafe: 'prepare_concise_context', generation: 'structured_output' } } },
};

const meta: Meta = {
  title: 'Stage/Active Run',
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveRun: Story = {
  render: () => {
    const [scrolled, setScrolled] = useState(false);
    return (
      <div
        style={{
          background: 'theme(colors.slate.900)',
          padding: '2rem',
          color: 'theme(colors.white)',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ width: '800px' }}>
          <h2 style={{ color: 'theme(colors.brand.emerald-bright)', marginBottom: '1rem' }}>Pipeline Logs</h2>
          <ProcessLogHeader
            isProcessing={true}
            executionState={{ phase: 'Implementation', agent: 'CodeGenAgent', step: 'generateSnippet', failsafe: 'prepare_concise_context', generation: 'reason' }}
            isStreamingComplete={false}
            generationCount={6}
            error={null}
          />
          <ProcessLog
            output={sampleOutput}
            isProcessing={true}
            error={null}
            outputDetails={outputDetails}
            onRetry={action('retry')}
            onDismissError={action('dismiss')}
            userHasScrolled={scrolled}
            setUserHasScrolled={setScrolled}
            ref={null as any}
          />
          <h2 style={{ color: 'theme(colors.brand.emerald-bright)', margin: '2rem 0 0.5rem' }}>On-the-Fly Instruction</h2>
          <div style={{ background: 'theme(colors.slate.800)', padding: '1rem', borderRadius: '8px' }}>
          <ExecutionOnTheFlyInstructions runId="demo-run-1" runKind="asset-pack" onNewInstruction={action('newInstruction')} />
          </div>
        </div>
      </div>
    );
  },
};
