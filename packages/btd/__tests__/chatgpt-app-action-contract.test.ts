import {
  BTD_CHATGPT_APP_ACTION_CONTRACT_IDS,
  BTD_CHATGPT_APP_ACTION_REQUIRED_PROOF_ROOT_FIELDS,
  BTD_CHATGPT_APP_REQUIRED_FLOW_OBJECTS,
  buildBtdChatGptAppActionContract,
  buildBtdChatGptAppActionContractInputs,
  buildBtdChatGptAppActionContractRegistry,
  getBtdChatGptAppActionContract,
  renderBtdChatGptAppSourceSafeResponse,
} from '../src/chatgpt-app-action-contract';

describe('ChatGPT App action contract registry', () => {
  it('publishes package-owned contracts for the full Reading action sequence', () => {
    const registry = buildBtdChatGptAppActionContractRegistry();

    expect(registry.kind).toBe('btd.chatgpt_app_action_contract_registry');
    expect(registry.schemaId).toBe('bitcode.chatGptAppActionContractRegistry.v1');
    expect(registry.actionCount).toBe(7);
    expect(registry.missingActionIds).toEqual([]);
    expect(registry.observedActionIds).toEqual([...BTD_CHATGPT_APP_ACTION_CONTRACT_IDS].sort());
    expect(registry.sourceSafety).toMatchObject({
      sourceSafe: true,
      protectedSourceVisible: false,
      containsSecret: false,
      containsProtectedSource: false,
    });

    expect(registry.actions.map((action) => action.flowObject)).toEqual(
      expect.arrayContaining([...BTD_CHATGPT_APP_REQUIRED_FLOW_OBJECTS]),
    );
  });

  it('carries schemas, proof roots, source-safe renderers, denied states, and examples', () => {
    const contract = getBtdChatGptAppActionContract('bitcode_deliver_asset_pack');

    expect(contract.contractRoot).toMatch(/^btd-chatgpt-app-action-contract:[a-f0-9]{24}$/);
    expect(contract.inputSchemaId).toBe('bitcode.chatgpt.bitcode_deliver_asset_pack.input.v1');
    expect(contract.outputSchemaId).toBe('bitcode.chatgpt.bitcode_deliver_asset_pack.output.v1');
    expect(contract.sourceSafetyClass).toBe('locked-assetpack-delivery');
    expect(contract.proofRootFields).toEqual(
      expect.arrayContaining([...BTD_CHATGPT_APP_ACTION_REQUIRED_PROOF_ROOT_FIELDS]),
    );
    expect(contract.requestRootFields).toEqual(
      expect.arrayContaining(['confirmed', 'deliveryTarget', 'readLicenseId', 'settlementRoot']),
    );
    expect(contract.responseRootFields).toEqual(
      expect.arrayContaining(['deliveryRoot', 'deliveryState', 'nextAction']),
    );
    expect(contract.deniedStates.map((state) => state.code)).toEqual(
      expect.arrayContaining([
        'SCHEMA_VALIDATION_FAILED',
        'SETTLEMENT_REQUIRED',
        'READ_LICENSE_REQUIRED',
        'ORGANIZATION_AUTHORITY_REQUIRED',
        'CONFIRMATION_REQUIRED',
      ]),
    );
    expect(contract.examples.map((example) => example.posture)).toEqual(
      expect.arrayContaining(['success_source_safe', 'denied_delivery']),
    );
  });

  it('renders source-safe accepted responses with proof-root projection', () => {
    const response = renderBtdChatGptAppSourceSafeResponse({
      actionId: 'bitcode_review_asset_pack_preview',
      status: 'accepted',
      requestRoot: 'request-root-preview',
      summary: 'AssetPack preview accepted for fee quotation.',
      visibleFields: {
        assetPackPreviewRoot: 'asset-pack-preview-root',
        fitQuality: 'excellent',
        nextAction: 'quote-fee',
      },
      proofRootProjection: {
        writeAdmission: 'not-required-for-preview-review',
      },
    });

    expect(response).toMatchObject({
      kind: 'btd.chatgpt_app_source_safe_response',
      actionId: 'bitcode_review_asset_pack_preview',
      flowObject: 'asset_pack_preview',
      status: 'accepted',
      sourceSafety: {
        sourceSafe: true,
        protectedSourceVisible: false,
        containsSecret: false,
        containsProtectedSource: false,
      },
      proofRootProjection: expect.objectContaining({
        actionId: 'bitcode_review_asset_pack_preview',
        requestRoot: 'request-root-preview',
        sourceSafeRendererId: 'chatgpt.sourceSafeRenderer.bitcode_review_asset_pack_preview',
      }),
    });
    const forbiddenSourcePattern = new RegExp(
      `raw source|private source|${['sk', 'proj'].join('-')}|${['sb', 'secret'].join('_')}__`,
      'i',
    );
    expect(JSON.stringify(response.visibleFields)).not.toMatch(forbiddenSourcePattern);
  });

  it('renders readable denied responses with repair actions', () => {
    const response = renderBtdChatGptAppSourceSafeResponse({
      actionId: 'bitcode_deliver_asset_pack',
      status: 'denied',
      deniedStateCode: 'SETTLEMENT_REQUIRED',
      requestRoot: 'request-root-delivery',
      visibleFields: {
        deliveryState: 'blocked',
      },
    });

    expect(response.status).toBe('denied');
    expect(response.summary).toContain('Settlement finality is required');
    expect(response.deniedState).toMatchObject({
      code: 'SETTLEMENT_REQUIRED',
      repairAction: 'wait-for-settlement-finality-and-readback-synchronization',
    });
    expect(response.repairActions).toEqual([
      'wait-for-settlement-finality-and-readback-synchronization',
    ]);
  });

  it('fails closed when a required ChatGPT action id is missing', () => {
    expect(() => buildBtdChatGptAppActionContractRegistry({ actions: [] })).toThrow(
      /missing action ids: bitcode_request_read/,
    );
  });

  it('fails closed when proof roots omit a required field', () => {
    const [input] = buildBtdChatGptAppActionContractInputs();

    expect(() =>
      buildBtdChatGptAppActionContract({
        ...input,
        proofRootFields: ['actionId'],
      }),
    ).toThrow(/missing proof-root fields/);
  });

  it('fails closed on secret-shaped or locked-content contract text', () => {
    const [input] = buildBtdChatGptAppActionContractInputs();

    expect(() =>
      buildBtdChatGptAppActionContract({
        ...input,
        description: 'raw source can be shown in ChatGPT',
      }),
    ).toThrow(/must not contain secrets or locked source contents/);
  });
});
