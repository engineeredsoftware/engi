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
          pipeline: 'ReadFitsFindingSynthesis',
          phaseId: 'ReadFitsFindingSynthesis.discovery',
          agentId: 'ReadFitsFindingSynthesis.discovery.finding-fits',
          ptrrStepId: 'ReadFitsFindingSynthesis.discovery.finding-fits.try',
          ptrrStepName: 'try',
          outputSchema: 'DepositoryFitsResult',
        }}
        isStreamingComplete={false}
        generationCount={2}
        error={null}
        runId="run-tool-header"
      />,
    );

    expect(screen.getByText('bitcode.asset-pack.verification')).toBeTruthy();
    expect(screen.getAllByText('ReadFitsFindingSynthesis').length).toBeGreaterThan(0);
    expect(screen.getByText('ReadFitsFindingSynthesis.discovery')).toBeTruthy();
    expect(screen.getByText('discovery.finding-fits.try')).toBeTruthy();
    expect(screen.getByText('DepositoryFitsResult')).toBeTruthy();
  });
});
