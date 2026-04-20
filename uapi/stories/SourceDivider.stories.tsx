import type { Meta, StoryObj } from "@storybook/react";

import SourceDivider from "../app/components/conversations/ConversationsSourceDivider";

const meta: Meta<typeof SourceDivider> = {
  title: "Kitchen Sink/Conversations/SourceDivider",
  component: SourceDivider,
  args: {
    repoSlug: "engineeredsoftware/bitcode",
    branch: "main",
    commitSha: "abcdef1234567890",
  },
};

export default meta;

type Story = StoryObj<typeof SourceDivider>;

export const Primary: Story = {
  render: (args) => (
    <div className="p-6 bg-neutral-900 text-white">
      <SourceDivider {...args} />
    </div>
  ),
};
