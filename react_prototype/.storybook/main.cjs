module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  "staticDirs": ["../src/stories/assets/images", "../src/stories/assets/styles"],
  "framework": {
    name: "@storybook/react-vite",
    options: {}
  },
  "core": {
    "disableTelemetry": true
  },
  "features": {
    "storyStoreV7": true
  },
  docs: {
    autodocs: true
  }
};