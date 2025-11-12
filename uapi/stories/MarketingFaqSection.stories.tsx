import type { Meta, StoryObj } from "@storybook/react";
import MarketingFaqSection from "../app/(root)/components/MarketingFaqSection";

const meta: Meta<typeof MarketingFaqSection> = {
  title: "Marketing/FaqSection",
  component: MarketingFaqSection,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof MarketingFaqSection>;

export const Default: Story = { render: () => <MarketingFaqSection /> };
