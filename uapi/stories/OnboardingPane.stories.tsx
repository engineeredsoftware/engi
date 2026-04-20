import type { Meta, StoryObj } from "@storybook/react";

import AuxillariesContent from "../app/auxillaries/components/AuxillariesContent";

const steps = ["profile", "connects", "credits", "models"] as const;
type Step = typeof steps[number];

const meta: Meta<typeof AuxillariesContent> = {
  title: "Kitchen Sink/Auxillaries/Onboarding",
  component: AuxillariesContent,
  args: {
    steps: steps as unknown as string[],
    currentStep: "profile" as Step,
    completedSteps: [] as Step[],
    availableSteps: steps as unknown as string[],
    showContent: false,
    showSuccessAnimation: false,
  },
};

export default meta;

type Story = StoryObj<typeof AuxillariesContent>;

export const Primary: Story = {
  render: (args) => (
    <div className="h-screen w-full bg-neutral-900 flex items-center justify-center">
      <AuxillariesContent
        {...args}
        onStepClick={() => {}}
        renderStepContent={() => <div className="text-white">Step Content</div>}
      />
    </div>
  ),
};
