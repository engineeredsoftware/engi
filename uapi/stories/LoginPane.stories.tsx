import type { Meta, StoryObj } from "@storybook/react";

import LoginPane from "../app/orbitals/components/OrbitalLoginPane";

const meta: Meta<typeof LoginPane> = {
  title: "Kitchen Sink/Orbitals/Login",
  component: LoginPane,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof LoginPane>;

export const Primary: Story = {
  render: () => (
    <div className="h-screen w-full bg-neutral-900 flex items-center justify-center">
      <LoginPane onClose={() => {}} onToggle={() => {}} />
    </div>
  ),
};
