const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.less$/,
    include: path.resolve(__dirname, "../src"),
    loaders: [
      'style-loader',
      'css-loader',
      'less-loader',
    ]
  });
  defaultConfig.resolve.extensions.push(".less");

  return defaultConfig;
};