import type { Meta, StoryObj } from "@storybook/react";

import ExecutionOnTheFlyInstructions from "@/app/executions/components/ExecutionOnTheFlyInstructions";

const meta: Meta<typeof RunInstructions> = {
  title: "Executions/OnTheFlyInstructions",
  component: ExecutionOnTheFlyInstructions,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    runId: "demo-run-1",
    runKind: "deliverable",
  },
};

export default meta;

type Story = StoryObj<typeof RunInstructions>;

export const Primary: Story = {
  render: (args) => (
    <div className="max-w-xl mx-auto p-6 bg-neutral-900">
      <ExecutionOnTheFlyInstructions {...args} />
    </div>
  ),
};
