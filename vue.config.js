module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
      analyzerPort: process.env.VUE_CLI_MODERN_BUILD ? 8888 : 9999
    }
  }
};
