const webpackMerge = require('webpack-merge');
const commonConfig = require('./config/webpack.common');

module.exports = env => {
  const envConfig = require(`./config/webpack.${env.mode}`);
  return webpackMerge({ mode: env.mode }, commonConfig, envConfig);
};