const config = {
  // Required
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  stories: ['../stories/*.stories.js'],
  // Optional
  addons: ['@storybook/addon-actions'],
};

export default config;
