import type { Meta, StoryObj } from "@storybook/react";
import MarketingTestimonialsSection from "../app/(root)/components/MarketingTestimonialsSection";

const meta: Meta<typeof MarketingTestimonialsSection> = {
  title: "Marketing/TestimonialsSection",
  component: MarketingTestimonialsSection,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof MarketingTestimonialsSection>;

export const Default: Story = { render: () => <MarketingTestimonialsSection /> };
