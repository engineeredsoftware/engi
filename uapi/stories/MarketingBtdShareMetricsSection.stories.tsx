import type { Meta, StoryObj } from "@storybook/react";
import MarketingBtdShareMetricsSection from "../app/(root)/components/MarketingBtdShareMetricsSection";

const meta: Meta<typeof MarketingBtdShareMetricsSection> = {
  title: "Marketing/BTDShareMetricsSection",
  component: MarketingBtdShareMetricsSection,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof MarketingBtdShareMetricsSection>;

export const Default: Story = { render: () => <MarketingBtdShareMetricsSection /> };
