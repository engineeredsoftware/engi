import type { Meta, StoryObj } from "@storybook/react";

import ObuscatedInquisition from "../app/marketplace/components/ObuscatedInquisition";

const meta: Meta<typeof ObuscatedInquisition> = {
  title: "Kitchen Sink/Marketplace/ObuscatedInquisition",
  component: ObuscatedInquisition,
  args: {
    listingId: "l1",
  },
};

export default meta;

type Story = StoryObj<typeof ObuscatedInquisition>;

export const Primary: Story = {
  render: (args) => (
    <div className="max-w-md mx-auto p-4 bg-neutral-900 text-white">
      <ObuscatedInquisition {...args} />
    </div>
  ),
};
