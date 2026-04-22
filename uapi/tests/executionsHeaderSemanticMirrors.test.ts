import {
  getHeaderDeliveryMechanism,
  getHeaderWrittenAssets,
  mergeHeaderDeliverables,
  type HeaderFinalWorkSummary,
} from '@/app/executions/components/ExecutionsCompleteHeaderContent';

describe('executions header semantic mirrors', () => {
  it('prefers written assets for summary and file changes', () => {
    const finalWorkSummary: HeaderFinalWorkSummary = {
      writtenAssets: {
        summary: 'Stable written asset summary.',
        fileChanges: {
          edited: 3,
          created: 1,
          deleted: 0,
          paths: ['src/index.ts'],
        },
      },
      deliveryMechanism: {
        pullRequest: {
          title: 'Delivery PR',
          url: 'https://example.com/pr/4',
          number: 4,
        },
      },
    };

    expect(getHeaderWrittenAssets(finalWorkSummary)?.summary).toBe('Stable written asset summary.');
    expect(getHeaderDeliveryMechanism(finalWorkSummary)?.pullRequest?.title).toBe('Delivery PR');
    expect(
      mergeHeaderDeliverables(
        getHeaderWrittenAssets(finalWorkSummary),
        getHeaderDeliveryMechanism(finalWorkSummary),
      ),
    ).toEqual({
      pullRequest: {
        title: 'Delivery PR',
        url: 'https://example.com/pr/4',
        number: 4,
      },
      pullRequestReviews: null,
      comments: null,
      issues: null,
      fileChanges: {
        edited: 3,
        created: 1,
        deleted: 0,
        paths: ['src/index.ts'],
      },
      summary: 'Stable written asset summary.',
    });
  });

  it('falls back through compatibility deliverables when explicit mirrors are absent', () => {
    const finalWorkSummary: HeaderFinalWorkSummary = {
      deliverables: {
        summary: 'Compatibility summary.',
        comments: [{ title: 'Compatibility comment', url: 'https://example.com/comment/2', number: 2 }],
      },
    };

    expect(getHeaderWrittenAssets(finalWorkSummary)?.summary).toBe('Compatibility summary.');
    expect(getHeaderDeliveryMechanism(finalWorkSummary)?.comments?.[0]?.title).toBe('Compatibility comment');
  });
});
