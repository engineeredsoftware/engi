import type { Meta, StoryObj } from "@storybook/react";
import MarketingUpgradesConnectsSection from "../app/(root)/components/MarketingUpgradesConnectsSection";

const meta: Meta<typeof MarketingUpgradesConnectsSection> = {
  title: "Marketing/UpgradesConnectsSection",
  component: MarketingUpgradesConnectsSection,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof MarketingUpgradesConnectsSection>;

export const Default: Story = { render: () => <MarketingUpgradesConnectsSection /> };
