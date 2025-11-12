import type { Meta, StoryObj } from "@storybook/react";

import FiltersPanel from "../app/marketplace/components/FiltersPanel";

const meta: Meta<typeof FiltersPanel> = {
  title: "Kitchen Sink/Marketplace/FiltersPanel",
  component: FiltersPanel,
};

export default meta;

type Story = StoryObj<typeof FiltersPanel>;

export const Primary: Story = {
  render: () => (
    <div className="p-4 bg-neutral-900 text-white">
      <FiltersPanel
        onSearch={() => {}}
        onTypeChange={() => {}}
        onSideChange={() => {}}
        onAssetChange={() => {}}
      />
    </div>
  ),
};
