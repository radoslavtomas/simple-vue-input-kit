module.exports = {
  banner: true,
  output: {
    extractCSS: false
  },
  plugins: {
    vue: {
      css: true
    },
    babel: {
      exclude: "node_modules/**",
      plugins: [['@babel/transform-runtime', { regenerator: false }]],
      runtimeHelpers: true,
    }
  }
};
