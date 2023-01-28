import * as path from 'path';
import HtmlWebpackPlugin  from 'html-webpack-plugin';

const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const AutoPrefixerPlugin = require('autoprefixer');
const dartSass = require('sass');
const compress= require('compression');


module.exports = {
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'src', 'index.ts'),
    path.resolve(__dirname, 'src', 'styles.scss'),
  ],
  output: {
    filename: 'static/index.min.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'static/styles.min.css',
    }),
    // new StylelintPlugin({
    //   files: 'src/**/*.scss',
    // }),
    // Browsersync for development server, only runs with --watch flag.
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080',
      notify: false,
      startPath: '/',
      open: false,
      middleware: [compress()],
      reloadDelay: 1000,
      files: 'src/**/*',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ForkTsCheckerNotifierWebpackPlugin({excludeWarnings: true}),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/typescript",
            ],
            plugins: [
              "@babel/proposal-class-properties",
              "@babel/proposal-object-rest-spread",
              "@babel/plugin-proposal-optional-chaining",
              "@babel/plugin-proposal-nullish-coalescing-operator",
              "@babel/plugin-proposal-numeric-separator",
            ]
          }
        },
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [
                  AutoPrefixerPlugin(),
                ],
              },
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                implementation: dartSass,
                includePaths: [path.resolve(__dirname, 'node_modules')],
              },
            },
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  devtool: 'inline-source-map',
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  // devServer: {
  //   compress: true,
  //   static: {
  //     directory: path.join(__dirname, 'dist'),
  //   },
  //   proxy: {
  //     '/': 'http://localhost:3000',
  //   }
  // },
};