import {
  BTD_INTERFACE_INTEGRATION_REQUIRED_OBJECT_FAMILIES,
  BTD_INTERFACE_INTEGRATION_REQUIRED_SURFACES,
  type BtdInterfaceIntegrationRecordInput,
} from '@bitcode/btd/interface-integration-contract';

export type TerminalInterfaceIntegrationRegressionSummary = {
  surfaces: typeof BTD_INTERFACE_INTEGRATION_REQUIRED_SURFACES;
  objectFamilies: typeof BTD_INTERFACE_INTEGRATION_REQUIRED_OBJECT_FAMILIES;
  lowDetailSourceSafe: true;
  transactionCockpitRegression: false;
  routeLocalReimplementation: false;
  records: BtdInterfaceIntegrationRecordInput[];
};

const recordDefaults = {
  packageOwned: true,
  routeLocalReimplementation: false,
  sourceSafeLowDetailIntact: true,
  transactionCockpitRegression: false,
  notes: ['Terminal consumes package-owned Protocol objects through a source-safe contract'],
} as const;

export function buildTerminalInterfaceIntegrationRegressionRecords(): BtdInterfaceIntegrationRecordInput[] {
  return [
    {
      ...recordDefaults,
      surface: 'terminal',
      consumerId: 'terminal-transaction-cockpit',
      packageExport: '@bitcode/btd/interface-integration-contract',
      adapterPath: 'uapi/app/terminal/terminal-interface-integration-regression.ts',
      objectFamilies: ['btd_registry', 'read_access', 'terminal_journal'],
      proofRoot: 'terminal-interface-regression-proof-root',
    },
    {
      ...recordDefaults,
      surface: 'api',
      consumerId: 'btd-api-route-boundary',
      packageExport: '@bitcode/btd',
      adapterPath: 'packages/api/src/routes/btd-crypto.ts',
      objectFamilies: ['btd_receipts', 'btc_fee_operation', 'ledger_projection', 'protocol_telemetry'],
      proofRoot: 'api-interface-regression-proof-root',
    },
    {
      ...recordDefaults,
      surface: 'mcp',
      consumerId: 'bitcode-mcp-interface',
      packageExport: '@bitcode/btd/interface-integration-contract',
      adapterPath: 'packages/executions-mcp/src/mcp-server/src/interface-integration.ts',
      objectFamilies: ['source_to_shares_proof', 'organization_authority'],
      proofRoot: 'mcp-interface-regression-proof-root',
    },
    {
      ...recordDefaults,
      surface: 'chatgpt_app',
      consumerId: 'bitcode-chatgpt-app-interface',
      packageExport: '@bitcode/btd/interface-integration-contract',
      adapterPath: 'packages/chatgptapp/src/interface-integration.ts',
      objectFamilies: ['read_access', 'organization_authority'],
      proofRoot: 'chatgpt-interface-regression-proof-root',
    },
    {
      ...recordDefaults,
      surface: 'auxillaries_hook',
      consumerId: 'auxillaries-interface-hook',
      packageExport: '@bitcode/btd/interface-integration-contract',
      adapterPath: 'uapi/app/terminal/terminal-interface-integration-regression.ts',
      objectFamilies: ['btd_registry', 'organization_authority'],
      proofRoot: 'auxillaries-interface-regression-proof-root',
    },
    {
      ...recordDefaults,
      surface: 'exchange_hook',
      consumerId: 'exchange-interface-hook',
      packageExport: '@bitcode/btd/interface-integration-contract',
      adapterPath: 'uapi/app/terminal/terminal-interface-integration-regression.ts',
      objectFamilies: ['btd_receipts', 'btc_fee_operation', 'ledger_projection'],
      proofRoot: 'exchange-interface-regression-proof-root',
    },
  ];
}

export function buildTerminalInterfaceIntegrationRegressionSummary(): TerminalInterfaceIntegrationRegressionSummary {
  return {
    surfaces: BTD_INTERFACE_INTEGRATION_REQUIRED_SURFACES,
    objectFamilies: BTD_INTERFACE_INTEGRATION_REQUIRED_OBJECT_FAMILIES,
    lowDetailSourceSafe: true,
    transactionCockpitRegression: false,
    routeLocalReimplementation: false,
    records: buildTerminalInterfaceIntegrationRegressionRecords(),
  };
}
