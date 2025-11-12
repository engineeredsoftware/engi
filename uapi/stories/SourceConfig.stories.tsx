import type { Meta, StoryObj } from "@storybook/react";

import SourceConfig from "../app/components/conversations/ConversationsSourceConfig";

const meta: Meta<typeof SourceConfig> = {
  title: "Kitchen Sink/Conversations/SourceConfig",
  component: SourceConfig,
  args: {
    initialRepoSlug: "engi-ai/engi-platform",
    initialBranch: "main",
    initialCommit: null,
  },
};

export default meta;

type Story = StoryObj<typeof SourceConfig>;

export const Primary: Story = {
  render: (args) => (
    <div className="max-w-md mx-auto p-4 bg-neutral-900 text-white">
      <SourceConfig {...args} onChange={() => {}} />
    </div>
  ),
};
