import type { Meta, StoryObj } from "@storybook/react";

import OrderBook, { Listing } from "../app/marketplace/OrderBook";

const sampleListings: Listing[] = [
  {
    id: "l1",
    type: "upgrade",
    asset: "knowledge_extension",
    side: "sell",
    price: 250,
    quantity: 3,
    owner: "alice",
    measure: 88,
    technologies: ["react", "typescript", "tailwind"],
    title: "React Performance Toolkit",
  },
  {
    id: "l2",
    type: "deliverable",
    asset: "pr",
    side: "buy",
    price: 500,
    quantity: 2,
    owner: "bob",
    measure: 92,
    technologies: ["python", "supabase"],
    title: "FastAPI Auth PR",
  },
];

const meta: Meta<typeof OrderBook> = {
  title: "Kitchen Sink/Marketplace/OrderBook",
  component: OrderBook,
  parameters: { layout: "fullscreen" },
  args: {
    initialListings: sampleListings,
  },
};

export default meta;

type Story = StoryObj<typeof OrderBook>;

export const Primary: Story = {
  render: (args) => (
    <div className="p-6 bg-neutral-900 text-white h-screen w-full">
      <OrderBook {...args} onSelect={() => {}} />
    </div>
  ),
};
