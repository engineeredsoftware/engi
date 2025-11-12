import type { Meta, StoryObj } from '@storybook/react';
import ListingDetail from '@/app/marketplace/components/ListingDetail';

const sampleListing = {
  id: 'xyz789',
  type: 'upgrade' as const,
  asset: 'knowledge_extension' as const,
  side: 'sell' as const,
  price: 50,
  quantity: 3,
  owner: 'bob',
  status: 'open',
  technologies: ['typescript', 'react'],
  created_at: new Date().toISOString(),
};

const meta = {
  title: 'Marketplace/ListingDetail',
  component: ListingDetail,
  tags: ['autodocs'],
} satisfies Meta<typeof ListingDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    listing: sampleListing,
    // history is now fetched internally
  },
};
export const ExecuteBuy: Story = {
  args: {
    listing: sampleListing, // side: 'sell' => user buys
  },
};
export const ExecuteSell: Story = {
  args: {
    listing: { ...sampleListing, side: 'buy' }, // user sells
  },
};