import type { Meta, StoryObj } from "@storybook/react";
import MarketingPricingSection from "../app/(root)/components/MarketingPricingSection";

const meta: Meta<typeof MarketingPricingSection> = {
  title: "Marketing/PricingSection",
  component: MarketingPricingSection,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof MarketingPricingSection>;

export const Default: Story = { render: () => <MarketingPricingSection /> };
