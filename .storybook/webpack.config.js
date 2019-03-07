const path = require("path");

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.css$/,
    include: path.resolve(__dirname, "../src"),
    loader: 'postcss-loader',
  });
  config.resolve.extensions.push(".less");

  return config;
};
