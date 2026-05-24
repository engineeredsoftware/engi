import {
  DEPLOYMENT_HOST_CAPABILITY_IDS,
  DEPLOYMENT_HOST_CAPABILITY_REQUIRED_ROW_FIELDS,
  ENVIRONMENT_LANE_CONTRACT_IDS,
  ENVIRONMENT_LANE_CONTRACT_REQUIRED_ROW_FIELDS,
  buildDeploymentHostCapabilityCatalog,
  buildDeploymentHostCapabilityRow,
  buildDeploymentHostCapabilityRows,
  buildEnvironmentLaneContract,
  buildEnvironmentLaneContractRows,
  buildEnvironmentLaneContracts,
} from '../src/deployment-host-capability-catalog';

describe('deployment host capability and environment lane catalog', () => {
  it('catalogs website, API, MCP API, ChatGPT App, workers, observers, broadcasters, proof services, repair jobs, and storage projections', () => {
    const catalog = buildDeploymentHostCapabilityCatalog();

    expect(catalog.kind).toBe('bitcode.deployment_host_capability_catalog');
    expect(catalog.schemaId).toBe('bitcode.deploymentHostCapabilityCatalog.v1');
    expect(catalog.rowCount).toBe(12);
    expect(catalog.missingHostIds).toEqual([]);
    expect(catalog.requiredHostIds).toEqual([...DEPLOYMENT_HOST_CAPABILITY_IDS]);
    expect(catalog.rows.map((row) => row.hostId)).toEqual([
      'website',
      'api',
      'mcp_api',
      'chatgpt_app',
      'pipeline_workers',
      'runtime_observers',
      'ledger_broadcasters',
      'proof_services',
      'repair_jobs',
      'object_storage',
      'database_projection',
      'ledger_projection',
    ]);
    expect(catalog.rows.every((row) => row.sourceSafety.sourceSafe)).toBe(true);
    expect(catalog.rows.every((row) => !row.sourceSafety.containsSecret)).toBe(true);
    expect(catalog.rows.every((row) => !row.sourceSafety.containsProtectedSource)).toBe(true);
  });

  it('requires owner, runtime, package, secret-family, storage, proof, failure, repair, and telemetry fields for each host row', () => {
    const catalog = buildDeploymentHostCapabilityCatalog();

    for (const row of catalog.rows) {
      for (const field of DEPLOYMENT_HOST_CAPABILITY_REQUIRED_ROW_FIELDS) {
        expect(row[field]).toBeTruthy();
      }
      expect(row.rowRoot).toMatch(/^deployment-host-capability-row:[a-f0-9]{24}$/);
      expect(row.telemetryProofHookId).toMatch(/^deployment\.telemetry\./);
    }
    expect(catalog.catalogRoot).toMatch(/^deployment-host-capability-catalog:[a-f0-9]{24}$/);
  });

  it('catalogs local, regtest, signet, staging-testnet, public testnet, mainnet dry run, and blocked value-bearing mainnet lanes', () => {
    const lanes = buildEnvironmentLaneContracts();

    expect(lanes.kind).toBe('bitcode.environment_lane_contracts');
    expect(lanes.schemaId).toBe('bitcode.environmentLaneContracts.v1');
    expect(lanes.laneCount).toBe(7);
    expect(lanes.missingLaneIds).toEqual([]);
    expect(lanes.requiredLaneIds).toEqual([...ENVIRONMENT_LANE_CONTRACT_IDS]);
    expect(lanes.lanes.map((lane) => lane.laneId)).toEqual([
      'local',
      'regtest',
      'signet',
      'staging-testnet',
      'public-testnet',
      'mainnet-ready-dry-run',
      'value-bearing-mainnet',
    ]);
    expect(lanes.valueBearingMainnetBlocked).toBe(true);
    expect(lanes.laneContractRoot).toMatch(/^environment-lane-contracts:[a-f0-9]{24}$/);
  });

  it('keeps value-bearing mainnet visible as blocked and without admitted runtime hosts', () => {
    const lanes = buildEnvironmentLaneContracts();
    const mainnet = lanes.lanes.find((lane) => lane.laneId === 'value-bearing-mainnet');

    expect(mainnet).toBeTruthy();
    expect(mainnet?.bitcoinNetworkPosture).toBe('mainnet');
    expect(mainnet?.valueBearingAdmission).toBe('blocked_future_canon_required');
    expect(mainnet?.walletPolicy).toBe('mainnet_value_blocked');
    expect(mainnet?.admittedHostIds).toEqual([]);
    expect(mainnet?.failureMode).toBe('value-bearing-mainnet-requested-before-canonical-admission');
  });

  it('requires Bitcoin, Supabase, Vercel, value-bearing, retention, wallet, proof, failure, repair, and telemetry fields for each lane', () => {
    const lanes = buildEnvironmentLaneContracts();

    for (const lane of lanes.lanes) {
      for (const field of ENVIRONMENT_LANE_CONTRACT_REQUIRED_ROW_FIELDS) {
        expect(lane[field]).toBeTruthy();
      }
      expect(lane.laneRoot).toMatch(/^environment-lane-contract:[a-f0-9]{24}$/);
      expect(lane.telemetryProofHookId).toMatch(/^deployment\.telemetry\.lane\./);
    }
  });

  it('fails closed when a required deployment host row is missing', () => {
    const rows = buildDeploymentHostCapabilityRows().filter((row) => row.hostId !== 'api');

    expect(() => buildDeploymentHostCapabilityCatalog({ rows })).toThrow(/missing host ids: api/);
  });

  it('fails closed on duplicate deployment host ids', () => {
    const rows = buildDeploymentHostCapabilityRows();

    expect(() => buildDeploymentHostCapabilityCatalog({ rows: [...rows, rows[0]] })).toThrow(
      /duplicate host ids: website/,
    );
  });

  it('fails closed when value-bearing mainnet admits hosts or stops being blocked', () => {
    const lanes = buildEnvironmentLaneContractRows();
    const changed = lanes.map((lane) =>
      lane.laneId === 'value-bearing-mainnet'
        ? {
            ...lane,
            valueBearingAdmission: 'dry_run_only' as const,
            admittedHostIds: ['api'] as const,
          }
        : lane,
    );

    expect(() => buildEnvironmentLaneContracts({ lanes: changed })).toThrow(
      /value-bearing-mainnet must remain blocked/,
    );
  });

  it('fails closed when mainnet-ready dry run is made value-bearing', () => {
    const lane = buildEnvironmentLaneContractRows().find(
      (row) => row.laneId === 'mainnet-ready-dry-run',
    );

    expect(lane).toBeTruthy();
    expect(() =>
      buildEnvironmentLaneContract({
        ...lane!,
        valueBearingAdmission: 'not_value_bearing',
      }),
    ).toThrow(/mainnet-ready-dry-run must be dry-run only/);
  });

  it('fails closed on secret-shaped or non-disclosable source catalog text', () => {
    const [firstRow] = buildDeploymentHostCapabilityRows();

    expect(() =>
      buildDeploymentHostCapabilityRow({
        ...firstRow,
        failureMode: 'sk-proj-abcdefghijklmnop1234567890',
      }),
    ).toThrow(/must not contain secrets or non-disclosable source/);
  });
});
