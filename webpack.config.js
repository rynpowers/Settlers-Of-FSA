const { resolve } = require('path');

module.exports = {
  entry: './client',
  mode: 'development',
  output: {
    path: resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
};
