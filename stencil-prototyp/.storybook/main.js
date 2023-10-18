/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  staticDirs: ["../src/stories/assets/images", "../src/stories/assets/styles"],
  framework: {
    name: "@storybook/html-webpack5",
    options: {},
  },
  core: {
    builder: "@storybook/builder-webpack5",
    disableTelemetry: true,
  },
  features: {
    storyStoreV7: true,
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
