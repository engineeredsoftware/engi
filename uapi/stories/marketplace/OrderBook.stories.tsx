import type { Meta, StoryObj } from '@storybook/react';
import OrderBook, { OrderBookFilters } from '@/app/marketplace/OrderBook';
import { action } from '@storybook/addon-actions';

const sampleOrders = [
  { id: '1', type: 'upgrade', asset: 'knowledge_extension', side: 'sell', price: 100, quantity: 5, owner: 'alice' },
  { id: '2', type: 'deliverable', asset: 'pr', side: 'buy', price: 150, quantity: 2, owner: 'bob' },
  { id: '3', type: 'upgrade', asset: 'knowledge_extension', side: 'buy', price: 120, quantity: 1, owner: 'carol' },
];

const meta = {
  title: 'Marketplace/OrderBook',
  component: OrderBook,
  tags: ['autodocs'],
  args: {
    initialListings: sampleOrders,
    filters: {},
  },
} satisfies Meta<typeof OrderBook>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
// Backwards-compatibility alias for the former Static story ID
export const Static: Story = {};

export const Empty: Story = {
  args: {
    initialListings: [],
  },
};

export const FilterBuy: Story = {
  args: {
    initialListings: sampleOrders,
    filters: { side: 'buy' },
  },
};

export const FilterSell: Story = {
  args: {
    initialListings: sampleOrders,
    filters: { side: 'sell' },
  },
};

export const NoResults: Story = {
  args: {
    initialListings: sampleOrders,
    filters: { search: 'xyz' },
  },
};