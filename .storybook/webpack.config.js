const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.css$/,
    include: path.resolve(__dirname, "../src"),
    loader: 'postcss-loader',
  });
  defaultConfig.resolve.extensions.push(".less");

  return defaultConfig;
};