module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === "production" ? "/rlviz" : "/",
  pages: {
    index: {
      entry: "src/main.js",
      title: "GridWorld RL"
    }
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
      analyzerPort: process.env.VUE_CLI_MODERN_BUILD ? 8723 : 9923
    }
  }
};
