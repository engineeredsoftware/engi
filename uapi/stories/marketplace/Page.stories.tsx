import type { Meta, StoryObj } from '@storybook/react';
import MarketplacePage from '@/app/marketplace/page';

const meta = {
  title: 'Marketplace/Page',
  component: MarketplacePage,
  tags: ['autodocs'],
} satisfies Meta<typeof MarketplacePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // Stub fetch to return sample listings for the full page experience
  decorators: [
    (StoryFn) => {
    // Stub fetch only for listings; preserve original fetch
    const originalFetch = window.fetch;
    // @ts-ignore
    window.fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input.url;
      if (url.endsWith('/api/marketplace/listings')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ listings: [
            { id: '1', type: 'upgrade', asset: 'knowledge_extension', side: 'sell', price: 100, quantity: 5, owner: 'alice' },
            { id: '2', type: 'deliverable', asset: 'pr', side: 'buy', price: 150, quantity: 2, owner: 'bob' },
            { id: '3', type: 'upgrade', asset: 'knowledge_extension', side: 'buy', price: 120, quantity: 1, owner: 'carol' },
          ] }),
        });
      }
      return originalFetch(input, init);
    };
    return <StoryFn />;
    },
  ],
};