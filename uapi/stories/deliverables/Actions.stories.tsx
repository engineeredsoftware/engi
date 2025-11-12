import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PreprocessToggle as ToggleButton } from '@/components/base/engi/execution/preprocess-toggle';
import ExecuteButton from '@/components/base/engi/execution/execute-button';

const meta = {
  title: 'Executions/Actions',
  component: ExecuteButton,
  tags: ['autodocs'],
  argTypes: {
    multiEnabled: { control: 'boolean' },
    computeEnabled: { control: 'boolean' },
    isProcessing: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof ExecuteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: ({ multiEnabled, computeEnabled, ...buttonArgs }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <ToggleButton
        enabled={multiEnabled}
        onToggle={action('toggle-multi')}
        type="multi"
      />
      <ExecuteButton
        isProcessing={buttonArgs.isProcessing}
        onSubmit={action('onSubmit')}
        disabled={buttonArgs.disabled}
      />
      <ToggleButton
        enabled={computeEnabled}
        onToggle={action('toggle-compute')}
        type="compute"
      />
    </div>
  ),
};

export const Default: Story = {
  ...Template,
  args: {
    multiEnabled: false,
    computeEnabled: false,
    isProcessing: false,
    disabled: false,
  },
};

export const Processing: Story = {
  ...Template,
  args: {
    multiEnabled: false,
    computeEnabled: false,
    isProcessing: true,
    disabled: false,
  },
};

// All actions enabled (toggles ON, button enabled & idle)
export const AllEnabled: Story = {
  ...Template,
  args: {
    multiEnabled: true,
    computeEnabled: true,
    isProcessing: false,
    disabled: false,
  },
};

// Button disabled due to external constraint (e.g. insufficient credits)
export const Disabled: Story = {
  ...Template,
  args: {
    multiEnabled: false,
    computeEnabled: false,
    isProcessing: false,
    disabled: true,
  },
};
