import type { Meta, StoryObj } from "@storybook/react";
import MarketingPipelineShowcase from "../app/(root)/components/MarketingPipelineShowcase";

const meta: Meta<typeof MarketingPipelineShowcase> = {
  title: "Marketing/PipelineShowcase",
  component: MarketingPipelineShowcase,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof MarketingPipelineShowcase>;

export const Default: Story = { render: () => <MarketingPipelineShowcase /> };
