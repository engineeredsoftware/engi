import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ExecutionNeedInput from '@/components/base/bitcode/execution/ExecutionNeedInput';

const meta = {
  title: 'Kitchen-Sink/ExecutionNeedInput',
  component: ExecutionNeedInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    isProcessing: { control: 'boolean' },
    need: { control: 'text' },
    placeholder: { control: 'text' },
  },
  args: {
    isProcessing: false,
    need: '',
    placeholder: 'Definition of Need…',
  },
} satisfies Meta<typeof ExecutionNeedInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.need);
    return (
      <ExecutionNeedInput
        {...args}
        definitionOfNeed={value}
        onChange={setValue}
        attachments={[]}
      />
    );
  },
};
