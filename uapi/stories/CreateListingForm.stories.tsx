import type { Meta, StoryObj } from "@storybook/react";

import CreateListingForm from "../app/marketplace/components/CreateListingForm";

const meta: Meta<typeof CreateListingForm> = {
  title: "Kitchen Sink/Marketplace/CreateListingForm",
  component: CreateListingForm,
  args: {
    sourceItems: [
      {
        id: "d1",
        label: "Payments API PR",
        type: "shippable",
        asset: "pr",
      },
      {
        id: "u1",
        label: "Rust Macros Cookbook",
        type: "upgrade",
        asset: "knowledge_extension",
      },
    ],
    initialData: {
      deliverable_id: "d1",
      type: "shippable",
      asset: "pr",
      side: "sell",
      price: 750,
      quantity: 1,
      duration: "1d",
    },
  },
};

export default meta;

type Story = StoryObj<typeof CreateListingForm>;

export const Primary: Story = {
  render: (args) => (
    <div className="max-w-lg mx-auto p-6 bg-neutral-900 text-white">
      <CreateListingForm {...args} onSubmit={() => {}} />
    </div>
  ),
};
