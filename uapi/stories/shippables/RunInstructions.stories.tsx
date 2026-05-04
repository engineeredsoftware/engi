import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ExecutionInstructions from '@/app/executions/components/ExecutionsInstructions';

// ---------------------------------------------------------------------------
// Helpers – stub fetch + EventSource so stories run without a backend.
// ---------------------------------------------------------------------------

// Simple in–memory store of instructions so POST updates show up instantly.
const inMemoryInstructions: any[] = [
  {
    id: '1',
    content: 'Refactor the utils module for better testability',
    attachments: null,
    state: 'accepted',
    created_at: new Date(Date.now() - 61000).toISOString(),
  },
  {
    id: '2',
    content: 'Add logging around the database layer',
    attachments: null,
    state: 'pending',
    created_at: new Date(Date.now() - 30000).toISOString(),
  },
];

if (typeof globalThis.fetch === 'undefined') {
  // In the Storybook preview environment we override global fetch once.
  globalThis.fetch = async (input: RequestInfo) => {
    const url = typeof input === 'string' ? input : input.toString();
    if (url.includes('/api/executions/instructions')) {
      return new Response(JSON.stringify(inMemoryInstructions.slice()), { status: 200 });
    }
    if (url.includes('/api/upgrades/instructions')) {
      return new Response(JSON.stringify(inMemoryInstructions.slice()), { status: 200 });
    }
    if (input instanceof Request && input.method === 'POST') {
      // Quick-and-dirty POST handler – push into the list.
      const body = await input.clone().json();
      const newInst = {
        id: String(Date.now()),
        content: body.content,
        attachments: body.attachments || null,
        state: 'accepted',
        created_at: new Date().toISOString(),
      };
      inMemoryInstructions.push(newInst);
      return new Response(JSON.stringify(newInst), { status: 201 });
    }
    return new Response('{}', { status: 200 });
  };
}

if (typeof globalThis.EventSource === 'undefined') {
  class DummyES {
    url: string;
    onmessage: ((ev: MessageEvent) => void) | null = null;
    onerror: ((ev: MessageEvent) => void) | null = null;
    constructor(url: string) {
      this.url = url;
    }
    close() {}
  }
  // @ts-ignore – assign to global
  globalThis.EventSource = DummyES;
}

// ---------------------------------------------------------------------------
// Story meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Shippables/RunInstructions',
  component: ExecutionInstructions,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
} satisfies Meta<typeof ExecutionInstructions>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Empty: Story = {
  name: 'Empty list',
  render: () => (
    <div style={{ width: 420 }}>
      <ExecutionInstructions runId="storybook-run-empty" runKind="asset-pack" />
    </div>
  ),
};

export const WithInstructions: Story = {
  name: 'With existing instructions',
  render: () => (
    <div style={{ width: 420 }}>
      <ExecutionInstructions runId="storybook-run-full" runKind="asset-pack" />
    </div>
  ),
};

export const WithProcessLogAbove: Story = {
  name: 'With process log above',
  render: () => {
    // Use same process log sample from existing story
    const sampleOutput = `Setup: Initializing...\nImplementation: Generating...\nValidation: All tests passed`;
    const { ProcessLog } = require('@/app/executions/components/ExecutionsProcessLog');
    const { ProcessLogHeader } = require('@/app/executions/components/ExecutionsProcessLogHeader');
    return (
      <div style={{ width: 600 }}>
        <ProcessLogHeader
          isProcessing={false}
          executionState={{ phase: 'complete' }}
          isStreamingComplete={true}
          generationCount={3}
          error={null}
        />
        <ProcessLog
          output={sampleOutput}
          isProcessing={false}
          error={null}
          outputDetails={{}}
          onRetry={() => {}}
          onDismissError={() => {}}
          userHasScrolled={false}
          setUserHasScrolled={() => {}}
          ref={null as any}
        />
        <ExecutionInstructions runId="storybook-run-with-log" runKind="asset-pack" />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
//  Additional variants – pending & rejected states, plus attachments
// ---------------------------------------------------------------------------

export const MixedStates: Story = {
  name: 'Mixed – accepted, pending & rejected',
  render: () => {
    // Seed the in-memory list with mixed states
    inMemoryInstructions.length = 0;
    inMemoryInstructions.push(
      {
        id: 'a1',
        content: 'Refactor auth middleware to enable multi-tenant support',
        attachments: null,
        state: 'accepted',
        created_at: new Date(Date.now() - 120000).toISOString(),
      },
      {
        id: 'a2',
        content: 'Add journaling for all write ops',
        attachments: null,
        state: 'pending',
        created_at: new Date(Date.now() - 60000).toISOString(),
      },
      {
        id: 'a3',
        content: 'Rewrite UI in Vue 3',
        attachments: null,
        state: 'rejected',
        created_at: new Date(Date.now() - 30000).toISOString(),
      },
    );
    return (
      <div style={{ width: 420 }}>
        <ExecutionInstructions runId="storybook-run-mixed" runKind="asset-pack" />
      </div>
    );
  },
};

export const WithAttachments: Story = {
  name: 'Instruction with attachments',
  render: () => {
    inMemoryInstructions.length = 0;
    inMemoryInstructions.push({
      id: 'b1',
      content: 'Consider this profiling flamegraph for hotspot detection',
      attachments: [
        {
          id: 'att-1',
          type: 'image',
          url: 'https://placehold.co/400x200?text=Flamegraph',
        },
      ],
      state: 'accepted',
      created_at: new Date().toISOString(),
    });
    return (
      <div style={{ width: 420 }}>
        <ExecutionInstructions runId="storybook-run-attach" runKind="asset-pack" />
      </div>
    );
  },
};

export const LongList: Story = {
  name: 'Long list (scroll)',
  render: () => {
    inMemoryInstructions.length = 0;
    for (let i = 0; i < 40; i++) {
      inMemoryInstructions.push({
        id: String(i),
        content: `Instruction #${i + 1} – adjust param ${i % 5}`,
        attachments: null,
        state: 'accepted',
        created_at: new Date(Date.now() - i * 15000).toISOString(),
      });
    }
    return (
      <div style={{ width: 420 }}>
        <ExecutionInstructions runId="storybook-run-long" runKind="asset-pack" />
      </div>
    );
  },
};
