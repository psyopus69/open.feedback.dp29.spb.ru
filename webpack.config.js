const path = require(`path`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);

// const __dirname = path.resolve();
module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: false,
    open: true,
    port: 1337,
    historyApiFallback: {
      index: `index.html`
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          `css-loader?importLoaders=1!postcss-loader`,
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: `css-loader`,
            options: {
              modules: true,
            },
          },
          `postcss-loader`,
          `sass-loader`,
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `styles.css`,
    }),
  ],
  devtool: `true`
};
