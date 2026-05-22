import {
  BTD_MCP_TOOL_CONTRACT_IDS,
  BTD_MCP_TOOL_CONTRACT_REQUIRED_PROOF_ROOT_FIELDS,
  buildBtdMcpToolContract,
  buildBtdMcpToolContractInputs,
  buildBtdMcpToolContractRegistry,
  getBtdMcpToolContract,
} from '../src/mcp-tool-contract';

describe('MCP tool contract registry', () => {
  it('publishes the package-owned AssetPack create tool contract', () => {
    const registry = buildBtdMcpToolContractRegistry();

    expect(registry.kind).toBe('btd.mcp_tool_contract_registry');
    expect(registry.schemaId).toBe('bitcode.mcpToolContractRegistry.v1');
    expect(registry.toolCount).toBe(1);
    expect(registry.missingToolIds).toEqual([]);
    expect(registry.observedToolIds).toEqual([...BTD_MCP_TOOL_CONTRACT_IDS]);
    expect(registry.sourceSafety).toMatchObject({
      sourceSafe: true,
      protectedSourceVisible: false,
      containsSecret: false,
      containsProtectedSource: false,
    });

    const [tool] = registry.tools;
    expect(tool.toolId).toBe('bitcode://pipelines/asset-pack/create');
    expect(tool.inputSchemaId).toBe('bitcode.mcp.assetPackCreate.input.v1');
    expect(tool.outputSchemaId).toBe('bitcode.mcp.assetPackCreate.output.v1');
    expect(tool.authPolicyId).toBe('interface.authorization.pipeline-permission');
    expect(tool.requiredPermissions).toEqual(['pipelines.create']);
    expect(tool.sourceSafetyClass).toBe('protected-source-locked');
  });

  it('carries proof-root fields, request roots, response roots, denied states, and examples', () => {
    const contract = getBtdMcpToolContract('bitcode://pipelines/asset-pack/create');

    expect(contract.contractRoot).toMatch(/^btd-mcp-tool-contract:[a-f0-9]{24}$/);
    expect(contract.proofRootFields).toEqual(
      expect.arrayContaining([...BTD_MCP_TOOL_CONTRACT_REQUIRED_PROOF_ROOT_FIELDS]),
    );
    expect(contract.requestRootFields).toEqual(
      expect.arrayContaining(['task', 'repository', 'attachments', 'connections', 'subtype']),
    );
    expect(contract.responseRootFields).toEqual(
      expect.arrayContaining(['runId', 'assetPackEvidenceId', 'writeAdmission', 'outputMeaning']),
    );
    expect(contract.deniedStates.map((state) => state.code)).toEqual(
      expect.arrayContaining([
        'MISSING_API_KEY',
        'INSUFFICIENT_PERMISSIONS',
        'PROVIDER_BINDING_REQUIRED',
        'SCHEMA_VALIDATION_FAILED',
        'RATE_LIMITED',
        'UNKNOWN_TOOL',
      ]),
    );
    expect(contract.examples.map((example) => example.posture)).toEqual(
      expect.arrayContaining([
        'success_queued',
        'denied_auth',
        'denied_permission',
        'denied_provider_binding',
      ]),
    );
  });

  it('fails closed when the required MCP tool id is missing', () => {
    expect(() => buildBtdMcpToolContractRegistry({ tools: [] })).toThrow(
      /missing tool ids: bitcode:\/\/pipelines\/asset-pack\/create/,
    );
  });

  it('fails closed when proof-root fields omit a required field', () => {
    const [input] = buildBtdMcpToolContractInputs();

    expect(() =>
      buildBtdMcpToolContract({
        ...input,
        proofRootFields: ['toolId'],
      }),
    ).toThrow(/missing proof-root fields/);
  });

  it('fails closed when pipelines.create is not required', () => {
    const [input] = buildBtdMcpToolContractInputs();

    expect(() =>
      buildBtdMcpToolContract({
        ...input,
        requiredPermissions: ['pipelines.read'],
      }),
    ).toThrow(/must require pipelines\.create permission/);
  });

  it('fails closed on secret-shaped or protected-source contract text', () => {
    const [input] = buildBtdMcpToolContractInputs();

    expect(() =>
      buildBtdMcpToolContract({
        ...input,
        summary: 'raw source can be exposed through MCP',
      }),
    ).toThrow(/must not contain secrets or protected source/);
  });
});
