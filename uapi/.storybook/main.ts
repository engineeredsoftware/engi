import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  // Resolve monorepo path aliases from tsconfig
  webpackFinal: async (config) => {
    const path = require('path');
    const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({ extensions: config.resolve.extensions })
    );
    config.resolve.alias = config.resolve.alias || {};
    // Legacy generic-agents alias to unified @engi/agents
    const agentPkgPath = path.resolve(
      __dirname,
      '..',
      'packages',
      'agent-generics',
      'src',
      'index.ts'
    );
    config.resolve.alias['@engi/generic-agents'] = agentPkgPath;
    config.resolve.alias['@engi/agents'] = agentPkgPath;

    // Map newly added email templates package to its source so Storybook can import without prebuild
    const emailPkgPath = path.resolve(__dirname, '..', 'packages', 'email-templates', 'src', 'index.ts');
    config.resolve.alias['@engi/email-templates'] = emailPkgPath;
    return config;
  },
};
export default config;
