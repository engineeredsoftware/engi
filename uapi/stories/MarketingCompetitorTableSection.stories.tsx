import type { Meta, StoryObj } from "@storybook/react";
import MarketingCompetitorTableSection from "../app/(root)/components/MarketingCompetitorTableSection";

const meta: Meta<typeof MarketingCompetitorTableSection> = {
  title: "Marketing/CompetitorTableSection",
  component: MarketingCompetitorTableSection,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof MarketingCompetitorTableSection>;

export const Default: Story = { render: () => <MarketingCompetitorTableSection /> };
