import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ExecutionPageHeader from '@/app/executions/components/ExecutionPageHeader';
import { templates as defaultTemplates } from '@/config/templates';

const sampleDeliverables = {
  pullRequest: {
    url: 'https://github.com/openai/react/pull/574',
    number: 574,
    title: 'Improve accessibility on Button component',
    description: 'Adds ARIA labels and keyboard support to the Button component to meet WCAG 2.1 standards. Includes unit tests and documentation updates.',
    status: 'open',
    createdAt: '2025-04-28T10:15:00Z',
  },
  pullRequestReviews: [
    {
      url: 'https://github.com/openai/react/pull/570#pullrequestreview-1024',
      number: 570,
      title: 'Review: Tooltip enhancements',
      content: `Reviewed the tooltip feature. The positioning logic is solid, but consider debouncing hover events to improve performance. See code snippet:
      \`\`\`js
      useEffect(() => {
        const handler = debounce(showTooltip, 100);
        element.addEventListener('mouseover', handler);
        return () => element.removeEventListener('mouseover', handler);
      }, []);
      \`\`\`
      `,
      status: 'approved',
      createdAt: '2025-04-27T14:30:00Z',
    },
    {
      url: 'https://github.com/openai/react/pull/568#pullrequestreview-987',
      number: 568,
      title: 'Review: Table responsive layout',
      content: `The responsive table changes look good, but ensure mobile rows have sufficient touch target size. Suggest adding padding:
      \`\`\`css
      @media (max-width: 640px) {
        .table-cell { padding: 12px; }
      }
      \`\`\`
      `,
      status: 'changes_requested',
      createdAt: '2025-04-26T09:45:00Z',
    },
  ],
  issues: [
    {
      url: 'https://github.com/openai/react/issues/45',
      number: 45,
      title: 'Crash when rendering Modal in SSR',
      description: `When using Next.js SSR, rendering the Modal component causes a hydration mismatch. Reproduction:
1. Create Next.js app
2. Import Modal in a server-rendered page
3. Observe console error: Hydration failed null vs object
`,
      status: 'open',
      createdAt: '2025-04-25T08:00:00Z',
    },
    {
      url: 'https://github.com/openai/react/issues/42',
      number: 42,
      title: 'Feature request: Dark mode support',
      description: `Add built-in dark mode theming for core components. Ideally controlled via context or CSS variables.`,
      status: 'planned',
      createdAt: '2025-04-20T12:10:00Z',
    },
  ],
  comments: [
    {
      url: 'https://github.com/openai/react/issues/45#issuecomment-2048',
      number: 2048,
      title: 'Clarification on SSR bug',
      content: `Could you provide the Next.js version and React version? This helps pinpoint if it's a framework mismatch.`,
      status: 'open',
      createdAt: '2025-04-25T09:15:00Z',
    },
    {
      url: 'https://github.com/openai/react/issues/42#issuecomment-2030',
      number: 2030,
      title: 'Suggestion: use CSS variables',
      content: `I suggest leveraging CSS variables for color tokens. E.g., --color-background, --color-text so end-users can override easily.`,
      status: 'open',
      createdAt: '2025-04-22T16:40:00Z',
    },
  ],
  fileChanges: {
    edited: 5,
    created: 2,
    deleted: 0,
    paths: [
      'src/components/Button/Button.tsx',
      'src/components/Button/Button.test.tsx',
      'src/styles/theme.css',
    ],
    charDiff: { edited: 350, created: 120, deleted: 20 },
  },
  summary: `The pipeline execution completed successfully.
- Accessibility improvements applied
- 7 new tests added
- Dark mode feature planned for next iteration`,
};

const sampleStats = {
  time: '3m 12s',
  tokens: { input: 1500, output: 800, total: 2300 },
  credits: 0.12,
};

const sampleRepoSnapshot = {
  org: 'openai',
  repo: 'react',
  branch: 'main',
  commit: 'd4e5f6a7',
};

const meta = {
  title: 'Executions/ExecutionPageHeader',
  component: ExecutionPageHeader,
  tags: ['autodocs'],
  argTypes: {
    executionStatus: { control: { type: 'radio' }, options: ['execute', 'executing', 'executed'] },
    deliverables: { control: 'object' },
    processingStats: { control: 'object' },
    repoSnapshot: { control: 'object' },
    showSourceEdu: { control: 'boolean' },
    showAttachmentsEdu: { control: 'boolean' },
    showComputeEdu: { control: 'boolean' },
    showMultiAgentEdu: { control: 'boolean' },
    showEnhanceEdu: { control: 'boolean' },
    showSaveTemplateEdu: { control: 'boolean' },
    showExecuteButtonEdu: { control: 'boolean' },
    templates: { control: 'object' },
  },
} satisfies Meta<typeof ExecutionPageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Execute: Story = {
  args: {
    executionStatus: 'execute',
    onExecuteDeliverableClickSetTask: action('onExecuteDeliverableClickSetTask'),
    showSourceEdu: false,
    showAttachmentsEdu: false,
    showComputeEdu: false,
    showMultiAgentEdu: false,
    showEnhanceEdu: false,
    showSaveTemplateEdu: false,
    showExecuteButtonEdu: false,
    templates: defaultTemplates,
    onTemplateSelect: action('onTemplateSelect'),
  },
};

export const Executed: Story = {
  args: {
    executionStatus: 'executed',
    onExecuteDeliverableClickSetTask: action('onExecuteDeliverableClickSetTask'),
    showSourceEdu: false,
    showAttachmentsEdu: false,
    showComputeEdu: false,
    showMultiAgentEdu: false,
    showEnhanceEdu: false,
    showSaveTemplateEdu: false,
    showExecuteButtonEdu: false,
    templates: defaultTemplates,
    onTemplateSelect: action('onTemplateSelect'),
    deliverables: sampleDeliverables,
    processingStats: sampleStats,
    repoSnapshot: sampleRepoSnapshot,
  },
};

// ---------------------------------------------------------------------------
//  In-Progress state – run is still processing / streaming summary
// ---------------------------------------------------------------------------

export const Executing: Story = {
  args: {
    executionStatus: 'executing',
    onExecuteDeliverableClickSetTask: action('onExecuteDeliverableClickSetTask'),
    showSourceEdu: false,
    showAttachmentsEdu: false,
    showComputeEdu: false,
    showMultiAgentEdu: false,
    showEnhanceEdu: false,
    showSaveTemplateEdu: false,
    showExecuteButtonEdu: false,
    templates: defaultTemplates,
    onTemplateSelect: action('onTemplateSelect'),
    deliverables: sampleDeliverables,
    processingStats: {
      time: '2m 07s',
      tokens: { input: 900, output: 450, total: 1350 },
      credits: 0.09,
    },
    repoSnapshot: sampleRepoSnapshot,
  },
};

// ---------------------------------------------------------------------------
//  Educational overlay variants (new-Do mode with specific edu bubble open)
// ---------------------------------------------------------------------------

const eduBaseArgs = {
  executionStatus: 'execute' as const,
  onExecuteDeliverableClickSetTask: action('onExecuteDeliverableClickSetTask'),
  templates: defaultTemplates,
  onTemplateSelect: action('onTemplateSelect'),
};

export const SourceEdu: Story = {
  name: 'Execute – Source edu',
  args: {
    ...eduBaseArgs,
    showSourceEdu: true,
  },
};

export const AttachmentsEdu: Story = {
  name: 'Execute – Attachments edu',
  args: {
    ...eduBaseArgs,
    showAttachmentsEdu: true,
  },
};

export const MultiAgentEdu: Story = {
  name: 'Execute – Multi-agent edu',
  args: {
    ...eduBaseArgs,
    showMultiAgentEdu: true,
  },
};

export const ComputeEdu: Story = {
  name: 'Execute – Compute edu',
  args: {
    ...eduBaseArgs,
    showComputeEdu: true,
  },
};

export const ExecuteButtonEdu: Story = {
  name: 'Execute – Execute-button edu',
  args: {
    ...eduBaseArgs,
    showExecuteButtonEdu: true,
  },
};

export const SaveTemplateEdu: Story = {
  name: 'Execute – Save-template edu',
  args: {
    ...eduBaseArgs,
    showSaveTemplateEdu: true,
  },
};

export const EnhanceEdu: Story = {
  name: 'Execute – Enhance edu',
  args: {
    ...eduBaseArgs,
    showEnhanceEdu: true,
  },
};
// Fully configurable header story
export const Configurable: Story = {
  name: 'Configurable',
  args: {
    executionStatus: 'execute',
    onExecuteDeliverableClickSetTask: action('onExecuteDeliverableClickSetTask'),
    showSourceEdu: false,
    showAttachmentsEdu: false,
    showComputeEdu: false,
    showMultiAgentEdu: false,
    showEnhanceEdu: false,
    showSaveTemplateEdu: false,
    showExecuteButtonEdu: false,
    templates: defaultTemplates,
    onTemplateSelect: action('onTemplateSelect'),
    deliverables: sampleDeliverables,
    processingStats: sampleStats,
    repoSnapshot: sampleRepoSnapshot,
  },
  render: (args) => <ExecutionPageHeader {...args} />,
};
