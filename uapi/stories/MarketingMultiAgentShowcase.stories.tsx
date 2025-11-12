import type { Meta, StoryObj } from "@storybook/react";
import MarketingMultiAgentShowcase from "../app/(root)/components/MarketingMultiAgentShowcase";

const meta: Meta<typeof MarketingMultiAgentShowcase> = {
  title: "Marketing/MultiAgentShowcase",
  component: MarketingMultiAgentShowcase,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof MarketingMultiAgentShowcase>;

export const Default: Story = { render: () => <MarketingMultiAgentShowcase /> };
