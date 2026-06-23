import path from 'path';

/** @type { import('storybook').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    config.module.rules.unshift({
      test: /\.(js|jsx)$/,
      include: [
        path.resolve(import.meta.dirname, '../stories'),
        path.resolve(import.meta.dirname, '../src')
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: { chrome: '100' } }],
            ['@babel/preset-react', { runtime: 'automatic' }]
          ],
        },
      },
    });

    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
      include: path.resolve(import.meta.dirname, '../'),
    });

    return config;
  },
};

export default config;
