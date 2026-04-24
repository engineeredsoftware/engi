import { SETUP_AGENTS } from '@bitcode/pipeline-asset-pack';
import { DANGER_WALL_AGENT } from '@bitcode/generic-agents-danger-wall';
import { FETCH_UPGRADES_AGENT } from '@bitcode/pipeline-asset-pack';

describe('SETUP_AGENTS sequence', () => {
  it('includes FetchPastAI DocumentsAgent alongside DangerWall in group 4', () => {
    const group = SETUP_AGENTS[3];
    const names = group.map(a => a.name);
    expect(names).toContain(DANGER_WALL_AGENT.dangerCheck.name);
    expect(names).toContain(FETCH_UPGRADES_AGENT.name);
  });
});