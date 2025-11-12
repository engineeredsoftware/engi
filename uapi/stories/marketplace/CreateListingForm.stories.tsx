import type { Meta, StoryObj } from '@storybook/react';
import CreateListingForm from '@/app/marketplace/components/CreateListingForm';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Marketplace/CreateListingForm',
  component: CreateListingForm,
  tags: ['autodocs'],
} satisfies Meta<typeof CreateListingForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: action('createListing'),
    sourceItems: [
      { id: 'd1', label: 'Auth Refactor PR', type: 'deliverable', asset: 'pr' },
      { id: 'u1', label: 'Rust Error Patterns', type: 'upgrade', asset: 'knowledge_extension' },
    ],
  },
};

export const BuyListingPreset: Story = {
  args: {
    onSubmit: action('createListing'),
    sourceItems: [
      { id: 'u1', label: 'Rust Error Patterns', type: 'upgrade', asset: 'knowledge_extension' },
    ],
    initialData: {
      deliverable_id: 'u1',
      type: 'upgrade',
      asset: 'knowledge_extension',
      side: 'buy',
      price: 120,
      quantity: 1,
      duration: '1d',
    },
  },
};

export const SellListingPreset: Story = {
  args: {
    onSubmit: action('createListing'),
    sourceItems: [
      { id: 'd1', label: 'Auth Refactor PR', type: 'deliverable', asset: 'pr' },
    ],
    initialData: {
      deliverable_id: 'd1',
      type: 'deliverable',
      asset: 'pr',
      side: 'sell',
      price: 320,
      quantity: 2,
      duration: 'infinite',
    },
  },
};

export const Static: Story = Default;
