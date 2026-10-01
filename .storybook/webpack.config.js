const path = require("path");
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = ({ config, mode }) => {
  config.plugins.push(new AntdDayjsWebpackPlugin());
  config.module.rules.push({
    test: /\.css$/,
    include: path.resolve(__dirname, "../src"),
    loader: 'postcss-loader',
  });
  config.resolve.extensions.push(".less");

  return config;
};
