'use strict';

const fs = require('fs-extra');
const path = require('path');
exports.onPostBuild = () => {
  fs.copySync(path.join(__dirname, '/src/locales'), path.join(__dirname, '/public/locales'));
};

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {

  const config = getConfig();
  config.optimization.splitChunks.cacheGroups.shared = false;
  config.resolve.fallback = {
    fs: false,
  };

  actions.setWebpackConfig({
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
  });

  /* Fixed module not resolved in webpack with this way */

  // if (stage === 'build-html' || stage === 'develop-html') {
  //   actions.setWebpackConfig({
  //     module: {
  //       rules: [
  //         {
  //           test: /agora-rtc-sdk-ng/,
  //           use: loaders.null(),
  //         },
  //       ],
  //     },
  //   });
  // }


  // Turn off source maps in production
  if (config.mode === 'production') {
    actions.setWebpackConfig({
      devtool: false,
    });
  }
};
