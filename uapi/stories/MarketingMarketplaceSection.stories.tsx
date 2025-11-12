import type { Meta, StoryObj } from "@storybook/react";
import MarketingMarketplaceSection from "../app/(root)/components/MarketingMarketplaceSection";

const meta: Meta<typeof MarketingMarketplaceSection> = {
  title: "Marketing/MarketplaceSection",
  component: MarketingMarketplaceSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof MarketingMarketplaceSection>;

export const Default: Story = {
  render: () => <MarketingMarketplaceSection disableTickerFetch />, 
};
