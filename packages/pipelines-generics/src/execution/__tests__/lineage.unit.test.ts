import {
  PipelineExecution,
  inferPipelineExecutionLineage
} from '../PipelineExecution';
import { factoryPipelineExecution } from '../pipeline-types';

describe('PipelineExecution lineage', () => {
  it('infers live lineage for ad hoc execution', () => {
    const lineage = inferPipelineExecutionLineage('ad_hoc');
    expect(lineage).toEqual({
      pipelineName: 'ad_hoc',
      family: 'ad_hoc',
      posture: 'live',
      admittedSurface: 'conversations',
    });
  });

  it('infers retained reference lineage for deliverable execution', () => {
    const lineage = inferPipelineExecutionLineage('deliverable');
    expect(lineage).toEqual({
      pipelineName: 'deliverable',
      family: 'deliverable',
      posture: 'reference',
      admittedSurface: 'retained_deliverable_reference',
    });
  });

  it('stores lineage on root and child pipeline executions', () => {
    const execution = factoryPipelineExecution('deliverable');
    const child = execution.child('phase-0');

    expect(execution.lineage.family).toBe('deliverable');
    expect(execution.get('pipeline', 'posture')).toBe('reference');
    expect(execution.get('execution', 'lineage')).toEqual(execution.lineage);

    expect(child.lineage).toEqual(execution.lineage);
    expect(child.get('pipeline', 'family')).toBe('deliverable');
  });

  it('accepts explicit lineage overrides', () => {
    const execution = new PipelineExecution('custom-run', undefined, {
      pipelineName: 'bitcode-measure',
      family: 'custom',
      posture: 'live',
      admittedSurface: 'bitcode_terminal',
    });

    expect(execution.lineage.posture).toBe('live');
    expect(execution.get('pipeline', 'admittedSurface')).toBe('bitcode_terminal');
  });
});
