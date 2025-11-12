import type { Meta, StoryObj } from "@storybook/react";
import MarketingScreenshotSection from "../app/(root)/components/MarketingScreenshotSection";

const meta: Meta<typeof MarketingScreenshotSection> = {
  title: "Marketing/ScreenshotSection",
  component: MarketingScreenshotSection,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof MarketingScreenshotSection>;

export const Default: Story = { render: () => <MarketingScreenshotSection /> };
