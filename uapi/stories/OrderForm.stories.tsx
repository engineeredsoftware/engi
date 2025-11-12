import type { Meta, StoryObj } from "@storybook/react";

import OrderForm from "../app/marketplace/components/OrderForm";
import { Listing } from "../app/marketplace/OrderBook";

const sampleListing: Listing = {
  id: "l1",
  type: "upgrade",
  asset: "knowledge_extension",
  side: "sell",
  price: 300,
  quantity: 5,
  owner: "alice",
  technologies: ["go", "rust"],
};

const meta: Meta<typeof OrderForm> = {
  title: "Kitchen Sink/Marketplace/OrderForm",
  component: OrderForm,
  args: {
    listing: sampleListing,
    variant: "order" as const,
    initialData: {
      quantity: 1,
      executedPrice: 300,
      duration: "1d",
    },
  },
};

export default meta;

type Story = StoryObj<typeof OrderForm>;

export const Primary: Story = {
  render: (args) => (
    <div className="p-6 bg-neutral-900 text-white max-w-md mx-auto">
      <OrderForm {...args} onSubmit={() => {}} />
    </div>
  ),
};
