const delegatedGet = jest.fn();
const delegatedPost = jest.fn();
const delegatedDelete = jest.fn();

jest.mock('@bitcode/api/src/routes/deliverables', () => ({
  GET: delegatedGet,
  POST: delegatedPost,
  DELETE: delegatedDelete,
}));

import * as route from '@/app/api/executions/route';

describe('/api/executions route delegation', () => {
  it('re-exports the canonical deliverables handlers', () => {
    expect(route.GET).toBe(delegatedGet);
    expect(route.POST).toBe(delegatedPost);
    expect(route.DELETE).toBe(delegatedDelete);
  });
});
