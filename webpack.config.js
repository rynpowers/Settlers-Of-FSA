const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  return {
    entry: './client',
    mode: 'development',
    output: {
      path: resolve(__dirname, 'public'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    devtool: 'source-maps',
    devServer: {
      contentBase: './public',
      proxy: [
        {
          context: '/',
          target: 'http://localhost:3000',
        },
      ],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            env ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        { test: /\.(png|jpg|gif)$/, use: [{ loader: 'url-loader' }] },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: env ? '[name].css' : '[name].[hash].css',
        chunkFilename: env ? '[id].css' : '[id].[hash].css',
      }),
    ],
  };
};
