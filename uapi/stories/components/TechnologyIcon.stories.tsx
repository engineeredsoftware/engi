import type { Meta, StoryObj } from '@storybook/react';
import TechnologyIcon from '@/app/(root)/components/technologies-icons';

const meta: Meta<typeof TechnologyIcon> = {
  title: 'Components/TechnologyIcon',
  component: TechnologyIcon,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'select', options: [
      'csharp','python','javascript','typescript','rust','solidity','solang','substrate','cpp','c','css','docker','html','react','mdx','ios'
    ] },
    className: { control: 'text' },
  },
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof TechnologyIcon>;

export const Default: Story = {
  args: {
    value: 'javascript',
    className: '',
  },
};
export const Python: Story = {
  args: {
    value: 'python',
  },
};
export const DefaultIcon: Story = {
  args: {
    value: 'unknown',
  },
};