import type { Meta, StoryObj } from "@storybook/react";

import TechnologyBadges from "../app/marketplace/components/TechnologyBadges";

const meta: Meta<typeof TechnologyBadges> = {
  title: "Kitchen Sink/Marketplace/TechnologyBadges",
  component: TechnologyBadges,
  args: {
    tech: ["react", "typescript", "tailwind", "supabase", "rust"],
    max: 4,
  },
};

export default meta;

type Story = StoryObj<typeof TechnologyBadges>;

export const Primary: Story = {
  render: (args) => (
    <div className="p-4 bg-neutral-900 text-white">
      <TechnologyBadges {...args} />
    </div>
  ),
};
