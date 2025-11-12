import type { Meta, StoryObj } from "@storybook/react";

import AccountOrbital from "../app/orbitals/components/OrbitalAccount";

const meta: Meta<typeof AccountOrbital> = {
  title: "Kitchen Sink/Orbitals/Account",
  component: AccountOrbital,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    initialData: {
      profile: {
        email: "demo@engi.ai",
        username: "demo_user",
        display_name: "Demo User",
      },
      githubConnection: { username: "demo" },
      credits: 42,
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
