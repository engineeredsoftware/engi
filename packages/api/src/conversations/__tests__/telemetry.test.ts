import {
  assertConversationTelemetryProofHookSourceSafe,
  buildConversationTelemetryProofHook,
} from '../telemetry';
import { buildConversationPipelineLogEvent, buildConversationStreamEvent } from '../stream-events';

describe('conversation telemetry proof hooks', () => {
  it('builds source-safe dashboard and runbook proof hooks without protected payloads', () => {
    const hook = buildConversationTelemetryProofHook({
      eventFamily: 'tool',
      eventKind: 'conversation.tool.started',
      status: 'started',
      conversationId: 'conv-1',
      runId: 'run-1',
      correlationIds: {
        conversationId: 'conv-1',
        runId: 'run-1',
        token_type: 'classification-only',
        toolInput: { rawPrompt: 'must not serialize' },
      },
      metadata: {
        toolName: 'repository-selector',
        token_type: 'classification-only',
        providerToken: 'sk-proj-not-allowed-in-telemetry',
        protectedSource: 'must not serialize',
      },
    });

    expect(hook.eventId).toMatch(/^conversation-telemetry:[a-f0-9]{24}$/);
    expect(hook.eventFamily).toBe('tool');
    expect(hook.dashboardPanel).toBe('conversation.dashboard.tool-policy');
    expect(hook.runbookId).toBe('runbook.conversation.tool-policy-denial');
    expect(hook.sourceSafetyClass).toBe('source_safe_conversation_telemetry_metadata');
    expect(hook.redactionPosture).toBe('proof_roots_ids_counts_states_and_redacted_error_classes_only');
    expect(hook.expandedMetadata.token_type).toBe('classification-only');
    expect(JSON.stringify(hook)).not.toContain('must not serialize');
    expect(JSON.stringify(hook)).not.toContain('sk-proj-not-allowed-in-telemetry');
    expect(assertConversationTelemetryProofHookSourceSafe(hook)).toEqual({
      admitted: true,
      reason: 'source_safe_conversation_telemetry_proof_hook',
    });
  });

  it('redacts private key PEM-shaped telemetry metadata before truncation', () => {
    const hook = buildConversationTelemetryProofHook({
      eventFamily: 'session',
      eventKind: 'conversation.session.info',
      status: 'started',
      metadata: {
        pem: [
          'prefix',
          '-----BEGIN OPENSSH PRIVATE KEY-----',
          'abcdefghijklmnopqrstuvwxyz1234567890',
          '-----END OPENSSH PRIVATE KEY-----',
          'suffix',
        ].join('\n'),
        unclosed: `${'-----BEGIN PRIVATE KEY-----'.repeat(200)}tail`,
      },
    });

    const serialized = JSON.stringify(hook);
    expect(serialized).toContain('[redacted:conversation-telemetry-secret]');
    expect(serialized).not.toContain('abcdefghijklmnopqrstuvwxyz1234567890');
    expect(serialized).not.toContain('tail');
    expect(assertConversationTelemetryProofHookSourceSafe(hook)).toEqual({
      admitted: true,
      reason: 'source_safe_conversation_telemetry_proof_hook',
    });
  });

  it('attaches telemetry proof hooks to conversation stream execution rows', () => {
    const event = buildConversationStreamEvent({
      eventKind: 'completion_decision',
      legacySseType: 'done',
      runId: 'run-2',
      conversationId: 'conv-2',
      sequence: 5,
      collapsedStatus: 'Assistant completion persisted',
      metadata: {
        messageId: 'msg-2',
      },
    });

    const logEvent = buildConversationPipelineLogEvent(event);

    expect(event.telemetryProofHook.eventFamily).toBe('completion');
    expect(event.telemetryProofHook.dashboardPanel).toBe('conversation.dashboard.completion-quality');
    expect(event.telemetryProofHook.runbookId).toBe('runbook.conversation.completion-repair');
    expect(logEvent.status.metadata.telemetryProofHook).toEqual(event.telemetryProofHook);
    expect(logEvent.status.metadata.dashboardPanel).toBe('conversation.dashboard.completion-quality');
    expect(logEvent.status.metadata.runbookId).toBe('runbook.conversation.completion-repair');
  });
});
