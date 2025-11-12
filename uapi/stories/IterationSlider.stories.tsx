import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IterationSlider } from '../app/components/IterationSlider';

const meta: Meta<typeof IterationSlider> = {
  title: 'Components/IterationSlider',
  component: IterationSlider,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number', min: 3, max: 1000, step: 1 } },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof IterationSlider>;

export const Default: Story = {
  args: {
    value: 3,
    disabled: false,
  },
  render: (args) => {
    const [val, setVal] = useState<number>(args.value);
    return <IterationSlider {...args} value={val} onChange={setVal} />;
  },
};

export const Disabled: Story = {
  args: {
    value: 500,
    disabled: true,
  },
  render: (args) => {
    const [val, setVal] = useState<number>(args.value);
    return <IterationSlider {...args} value={val} onChange={setVal} />;
  },
};