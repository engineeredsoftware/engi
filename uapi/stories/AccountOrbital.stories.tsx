import type { Meta, StoryObj } from "@storybook/react";

import AccountOrbital from "../app/orbitals/components/OrbitalsAccount";

const meta: Meta<typeof AccountOrbital> = {
  title: "Bitcode/Auxillaries/Account",
  component: AccountOrbital,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    initialData: {
      profile: {
        email: "demo@bitcode.dev",
        username: "demo_user",
        display_name: "Demo User",
      },
      githubConnection: { username: "demo" },
      btdBalance: 42,
      btcFeeBalance: 0.042,
      modelPreferences: { preferred: "gpt-4o" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AccountOrbital>;

export const Primary: Story = {
  render: (args) => (
    <div className="h-screen w-full bg-neutral-900 flex items-center justify-center">
      <AccountOrbital {...args} onClose={() => {}} />
    </div>
  ),
};
