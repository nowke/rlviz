module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === "production" ? "/rlviz" : "/",
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
      analyzerPort: process.env.VUE_CLI_MODERN_BUILD ? 8888 : 9999
    }
  }
};
