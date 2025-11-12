import type { Meta, StoryObj } from "@storybook/react";
import MarketingWalkthroughSection from "../app/(root)/components/MarketingWalkthroughSection";

const meta: Meta<typeof MarketingWalkthroughSection> = {
  title: "Marketing/WalkthroughSection",
  component: MarketingWalkthroughSection,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof MarketingWalkthroughSection>;

export const Default: Story = { render: () => <MarketingWalkthroughSection /> };
