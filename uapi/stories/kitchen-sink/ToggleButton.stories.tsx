import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { PreprocessToggle as ToggleButton } from '@/components/base/engi/execution/preprocess-toggle';

const meta = {
  title: 'Kitchen-Sink/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'dark' }, layout: 'centered' },
  argTypes: {
    enabled: { control: 'boolean' },
    type: { control: { type: 'radio' }, options: ['multi', 'compute'] },
  },
  args: {
    enabled: false,
    type: 'multi',
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
