import type { Meta, StoryObj } from '@storybook/react';
import OrderForm from '@/app/marketplace/components/OrderForm';
import { action } from '@storybook/addon-actions';

const sampleListing = {
  id: 'abc123',
  type: 'shippable' as const,
  asset: 'pr' as const,
  side: 'sell' as const,
  price: 200,
  quantity: 10,
  owner: 'alice',
  status: 'open',
  created_at: new Date().toISOString(),
};

const meta = {
  title: 'Marketplace/OrderForm',
  component: OrderForm,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Buy: Story = {
  args: {
    listing: { ...sampleListing, side: 'sell' },
    initialData: { quantity: 1, executedPrice: sampleListing.price, userId: 'testUser' },
    onSubmit: action('placeOrder'),
  },
};

export const Sell: Story = {
  args: {
    listing: { ...sampleListing, side: 'buy' },
    initialData: { quantity: 1, executedPrice: sampleListing.price, userId: 'testUser' },
    onSubmit: action('placeOrder'),
  },
};
