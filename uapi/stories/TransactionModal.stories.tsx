import type { Meta, StoryObj } from "@storybook/react";

import TransactionModal from "../app/marketplace/components/TransactionModal";

const meta: Meta<typeof TransactionModal> = {
  title: "Kitchen Sink/Marketplace/TransactionModal",
  component: TransactionModal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    cost: 250,
    message: "Transaction Successful",
  },
};

export default meta;

type Story = StoryObj<typeof TransactionModal>;

export const Primary: Story = {
  render: (args) => (
    <TransactionModal {...args} onClose={() => {}} />
  ),
};
