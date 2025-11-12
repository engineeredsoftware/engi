import type { Meta, StoryObj } from "@storybook/react";
import MarketingCtaContactSection from "../app/(root)/components/MarketingCtaContactSection";

const meta: Meta<typeof MarketingCtaContactSection> = {
  title: "Marketing/CtaContactSection",
  component: MarketingCtaContactSection,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof MarketingCtaContactSection>;

export const Default: Story = { render: () => <MarketingCtaContactSection /> };
