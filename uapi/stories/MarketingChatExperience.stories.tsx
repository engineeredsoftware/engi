import type { Meta, StoryObj } from "@storybook/react";
import MarketingChatExperience from "../app/(root)/components/MarketingChatExperience";

const meta: Meta<typeof MarketingChatExperience> = {
  title: "Marketing/ChatExperience",
  component: MarketingChatExperience,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof MarketingChatExperience>;

export const Default: Story = { render: () => <MarketingChatExperience /> };
