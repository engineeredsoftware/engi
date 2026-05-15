import { normalizeTerminalClosureControlState } from '@/app/terminal/terminal-closure-controls';

describe('normalizeTerminalClosureControlState', () => {
  it('builds closure operation posture from command and closure state', () => {
    const state = normalizeTerminalClosureControlState(
      {
        scenario: 'scenario-auth',
        projection: 'buyer',
        branchMode: 'patch',
        scenarioOptions: [],
        projectionOptions: [],
        branchOptions: [],
        heroLede: '',
        heroTip: '',
        status: 'Measuring read, resolving the active deposit/read profile, staging branch artifacts, and settling journal diff…',
        flowGuideLabel: 'Hide flow guide',
        flowGuideOpen: true,
        flowGuideStepIndex: 1,
        flowGuideStepCount: 6,
        shellReady: true,
      },
      {
        canonLabel: 'production workspace posture',
        verification: {
          id: 'verification',
          label: 'Verification + ranked candidates',
          summary: 'Verification state',
          metrics: [
            { label: 'Candidates', value: '5' },
            { label: 'Selected assets', value: '2' },
            { label: 'Branch-ready', value: '2' },
            { label: 'Settlement-ready', value: '1' },
          ],
          rows: [
            { label: 'Verification state', value: 'allowed-with-policy' },
            { label: 'Primary closure', value: 'verification precedes branch + settlement' },
          ],
          chips: [],
        },
        branch: {
          id: 'branch',
          label: 'Branch artifacts',
          summary: 'Branch summary',
          metrics: [
            { label: 'Visible artifacts', value: '7' },
            { label: 'Proof families', value: '4' },
            { label: 'Replay artifacts', value: '8' },
            { label: 'Projection', value: 'buyer' },
          ],
          rows: [
            { label: 'Branch', value: 'bitcode/auth-rollback' },
            { label: 'Branch mode', value: 'patch' },
            { label: 'Read lifecycle', value: 'ready' },
            { label: 'Confidentiality', value: 'bounded-public' },
          ],
          chips: ['BITCODE_READ.md'],
        },
        settlement: {
          id: 'settlement',
          label: 'Settlement + proof',
          summary: 'Settlement summary',
          metrics: [
            { label: 'Credited assets', value: '2' },
            { label: 'Participating assets', value: '3' },
            { label: 'Debit lines', value: '2' },
            { label: 'Settlement lines', value: '4' },
          ],
          rows: [
            { label: 'Bundle', value: 'bundle-001' },
            { label: 'Proof families', value: '4' },
            { label: 'Proof posture', value: 'theorem closed' },
          ],
          chips: ['selection-materialization'],
        },
        ledger: {
          id: 'ledger',
          label: 'Ledger + run history',
          summary: 'Ledger summary',
          metrics: [
            { label: 'Accounts', value: '2' },
            { label: 'History items', value: '1' },
            { label: 'Visible accounts', value: '2' },
            { label: 'Recent runs', value: '1' },
          ],
          rows: [{ label: 'buyer pools', value: '120 BTD' }],
          chips: ['bundle-001'],
        },
      },
    );

    expect(state.statusTone).toBe('running');
    expect(state.primaryActionLabel).toBe('Re-run closure');
    expect(state.hasSettlementBundle).toBe(true);
    expect(state.bundleId).toBe('bundle-001');
    expect(state.flowGuideDetail).toContain('step 2 of 6');
  });

  it('falls back safely when closure state is missing', () => {
    const state = normalizeTerminalClosureControlState(null, null);

    expect(state.primaryActionLabel).toBe('Make Bitcode branch');
    expect(state.statusTone).toBe('attention');
    expect(state.bundleId).toBe('—');
  });
});
