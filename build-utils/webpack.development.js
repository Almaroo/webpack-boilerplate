module.exports = () => ({
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    watchContentBase: true,
    liveReload: true,
  },
});
