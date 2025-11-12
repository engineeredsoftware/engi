import type { Meta, StoryObj } from "@storybook/react";

import OnboardingPane from "../app/orbitals/components/Orbital";

const steps = ["profile", "connects", "credits", "models"] as const;
type Step = typeof steps[number];

const meta: Meta<typeof OnboardingPane> = {
  title: "Kitchen Sink/Orbitals/Onboarding",
  component: OnboardingPane,
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

type Story = StoryObj<typeof OnboardingPane>;

export const Primary: Story = {
  render: (args) => (
    <div className="h-screen w-full bg-neutral-900 flex items-center justify-center">
      <OnboardingPane
        {...args}
        onStepClick={() => {}}
        renderStepContent={() => <div className="text-white">Step Content</div>}
      />
    </div>
  ),
};
