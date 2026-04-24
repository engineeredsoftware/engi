import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import ConversationsEnhancedRichTextInput from '@/app/conversations/components/ConversationsEnhancedRichTextInput';

jest.mock('@/app/conversations/components/pickers/deliverable-picker', () => () => null);
jest.mock('@/app/conversations/components/pickers/attachment-picker', () => () => null);
jest.mock('@/app/conversations/components/pickers/vcs-source-picker', () => () => null);
jest.mock('@/app/conversations/components/pickers/pipeline-run-picker', () => ({
  __esModule: true,
  default: function MockPipelineRunPicker({ onSelect }: { onSelect: (target: any) => void }) {
    return (
      <button
        type="button"
        onClick={() =>
          onSelect({
            conversationId: 'conv-destination',
            pipelineId: 'run-settlement-1',
            conversationTitle: 'Need board',
            pipelineTitle: 'Settlement lane',
            pipelineType: 'pipeline:asset-pack',
            type: 'settlement_target',
          })
        }
      >
        Pick output destination
      </button>
    );
  },
}));

describe('ConversationsEnhancedRichTextInput', () => {
  it('serializes output destinations as canonical destination tokens', () => {
    const onSend = jest.fn();
    const { container } = render(
      <ConversationsEnhancedRichTextInput
        onSend={onSend}
        currentConversationId="conv-destination"
      />,
    );

    const textarea = container.querySelector('textarea');
    expect(textarea).toBeTruthy();

    fireEvent.change(textarea!, {
      target: {
        value: 'Route settlement to !',
        selectionStart: 'Route settlement to !'.length,
        selectionEnd: 'Route settlement to !'.length,
      },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Pick output destination' }));
    fireEvent.click(container.querySelector('.send-button') as HTMLButtonElement);

    expect(onSend).toHaveBeenCalledWith(
      expect.stringContaining('Need board:Settlement lane'),
      [
        expect.objectContaining({
          type: 'destination',
          value: 'Need board:Settlement lane',
          metadata: expect.objectContaining({
            attachment_id: 'run-settlement-1',
            category: 'integration',
            type: 'settlement_target',
            conversationId: 'conv-destination',
            pipelineId: 'run-settlement-1',
          }),
        }),
      ],
    );
  });
});
