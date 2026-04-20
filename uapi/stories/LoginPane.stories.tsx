import type { Meta, StoryObj } from "@storybook/react";

import AuxillariesLoginPane from "../app/auxillaries/components/AuxillariesLoginPane";

const meta: Meta<typeof AuxillariesLoginPane> = {
  title: "Kitchen Sink/Auxillaries/Login",
  component: AuxillariesLoginPane,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof AuxillariesLoginPane>;

export const Primary: Story = {
  render: () => (
      <div className="h-screen w-full bg-neutral-900 flex items-center justify-center">
      <AuxillariesLoginPane onClose={() => {}} onToggle={() => {}} />
    </div>
  ),
};
