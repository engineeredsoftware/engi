import type { Meta, StoryObj } from "@storybook/react";

import RichTextInput from "../app/components/conversations/ConversationsEnhancedRichTextInput";

const meta: Meta<typeof RichTextInput> = {
  title: "Kitchen Sink/Conversations/EnhancedRichTextInput",
  component: RichTextInput,
  parameters: {
    layout: "padded",
  },
  args: {
    placeholder: "Type instruction…",
    enablePickers: false,
  },
};

export default meta;

type Story = StoryObj<typeof RichTextInput>;

export const Primary: Story = {
  render: (args) => (
    <div className="max-w-lg mx-auto p-4 bg-neutral-900 text-white">
      <RichTextInput {...args} onSend={() => {}} />
    </div>
  ),
};
