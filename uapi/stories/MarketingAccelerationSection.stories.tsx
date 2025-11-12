import type { Meta, StoryObj } from "@storybook/react";
import MarketingAccelerationSection from "../app/(root)/components/MarketingAccelerationSection";

const meta: Meta<typeof MarketingAccelerationSection> = {
  title: "Marketing/AccelerationSection",
  component: MarketingAccelerationSection,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof MarketingAccelerationSection>;

export const Default: Story = { render: () => <MarketingAccelerationSection /> };
