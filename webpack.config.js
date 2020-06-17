const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.jsx',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    chunkFilename: isDevelopment ? '[name].[id].chunk.js' : '[contenthash].min.js',
    filename: isDevelopment ? '[name].js' : '[contenthash].min.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        loaders: [
          'react-hot-loader/webpack',
          'babel-loader',
        ],
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
              outputStyle: 'compressed',
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images/',
          name: isDevelopment ? '[path][name].[ext]?[contenthash]' : '[contenthash].[ext]',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
          name: isDevelopment ? '[path][name].[ext]?[contenthash]' : '[contenthash].[ext]',
        }
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: process.env.PORT || 8100,
  }
};