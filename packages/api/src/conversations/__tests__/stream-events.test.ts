import {
  attachConversationStreamEvent,
  buildConversationPipelineLogEvent,
  buildConversationStreamEvent,
} from '../stream-events';

describe('conversation stream events', () => {
  it('builds source-safe metadata for a model delta stream event', () => {
    const event = buildConversationStreamEvent({
      eventKind: 'model_delta',
      legacySseType: 'token',
      runId: 'run-1',
      conversationId: 'conv-1',
      sequence: 1,
      collapsedStatus: 'Assistant model delta streamed',
      metadata: {
        chunkLength: 12,
        rawPrompt: 'must not serialize',
        providerToken: 'must not serialize',
      },
    });

    expect(event.eventId).toMatch(/^conversation-stream-event:[a-f0-9]{24}$/);
    expect(event.proofRoots.eventRoot).toMatch(/^conversation-stream-proof:[a-f0-9]{24}$/);
    expect(event.sourceSafetyClass).toBe('source_safe_conversation_stream_event_metadata');
    expect(event.promptDisclosurePosture).toBe('prompt_template_id_only');
    expect(event.resultDisclosurePosture).toBe('parsed_result_shape_only');
    expect(event.redactionPosture.protectedSourceVisible).toBe(false);
    expect(event.redactionPosture.rawModelResponseVisible).toBe(false);
    expect(event.redactionPosture.unpaidAssetPackSourceVisible).toBe(false);
    expect(event.redactionPosture.globalLedgerAuthorityClaimed).toBe(false);
    expect(JSON.stringify(event.expandedMetadata)).not.toContain('must not serialize');
  });

  it('adapts stream events into rich execution log rows', () => {
    const event = buildConversationStreamEvent({
      eventKind: 'proof_root',
      legacySseType: 'pipeline_event',
      runId: 'run-2',
      conversationId: 'conv-2',
      sequence: 3,
      collapsedStatus: 'Conversation stream proof roots anchored',
      metadata: { route: 'conversation_thread_stream' },
    });

    const payload = attachConversationStreamEvent({
      type: 'pipeline_event',
      data: { runId: 'run-2', event: buildConversationPipelineLogEvent(event) },
    }, event);

    expect(payload.conversationStreamEvent.eventKind).toBe('proof_root');
    expect(payload.data.event.message).toBe('Conversation stream proof roots anchored');
    expect(payload.data.event.status.executionState.outputSchema).toBe('ConversationStreamEvent:proof_root');
    expect(payload.data.event.status.metadata.proofRoots).toEqual(event.proofRoots);
  });
});
