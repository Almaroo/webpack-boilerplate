module.exports = () => ({
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] }],
  },
});
