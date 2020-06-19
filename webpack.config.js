const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ForkTSCheckerWebpackPluginh = require('fork-ts-checker-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  context: __dirname,
  mode: 'development',
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './src/index.tsx',
  ],
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    chunkFilename: isDevelopment ? '[name].[id].chunk.js' : '[contenthash].min.js',
    filename: isDevelopment ? '[name].js' : '[contenthash].min.js',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        loaders: [
          'react-hot-loader/webpack',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            }
          },
          'babel-loader',
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: true,
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new ForkTSCheckerWebpackPluginh(),
  ],
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8100,
    historyApiFallback: true,
  }
};