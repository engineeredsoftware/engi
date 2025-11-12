import type { Meta, StoryObj } from '@storybook/react';
import FiltersPanel from '@/app/marketplace/components/FiltersPanel';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Marketplace/FiltersPanel',
  component: FiltersPanel,
  tags: ['autodocs'],
} satisfies Meta<typeof FiltersPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearch: action('onSearch'),
    onTypeChange: action('onTypeChange'),
    onSideChange: action('onSideChange'),
  },
};