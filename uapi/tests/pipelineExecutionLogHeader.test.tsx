import React from 'react';
import { render, screen } from '@testing-library/react';

import { PipelineExecutionLogHeader } from '@/components/base/bitcode/execution/pipeline-execution-log-header';

describe('PipelineExecutionLogHeader', () => {
  it('renders current tool identity when the stream execution state includes a tool', () => {
    render(
      <PipelineExecutionLogHeader
        isProcessing={true}
        executionState={{
          phase: 'Discovery' as any,
          agent: 'bitcode-read-risk-admission',
          step: 'try' as any,
          generation: 'structured-output' as any,
          tool: 'bitcode.asset-pack.verification',
        }}
        isStreamingComplete={false}
        generationCount={2}
        error={null}
        runId="run-tool-header"
      />,
    );

    expect(screen.getByText('bitcode.asset-pack.verification')).toBeTruthy();
  });
});
