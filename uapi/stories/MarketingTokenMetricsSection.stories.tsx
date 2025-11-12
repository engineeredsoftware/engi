import type { Meta, StoryObj } from "@storybook/react";
import MarketingTokenMetricsSection from "../app/(root)/components/MarketingTokenMetricsSection";

const meta: Meta<typeof MarketingTokenMetricsSection> = {
  title: "Marketing/TokenMetricsSection",
  component: MarketingTokenMetricsSection,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof MarketingTokenMetricsSection>;

export const Default: Story = { render: () => <MarketingTokenMetricsSection /> };
