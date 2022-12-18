const path = require('path');
const Babel = require('@babel/core');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const babelOptions = (preset) => {
  const opts = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };

  if (preset) opts.presets.push(preset);
  return opts;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: babelOptions(),
    },
  ];

  if (isDev) {
    loaders.push('eslint-webpack-loader');
  }

  return loaders;
};

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [new CssMinimizerPlugin(), new TerserWebpackPlugin()];
  }
  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = (extra) => {
  const loaders = [MiniCssExtractPlugin.loader, 'css-loader'];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['@babel/polyfill', './index.js'],
    analytics: './analytics.ts',
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    port: 4200,
    hot: isDev,
  },
  optimization: optimization(),
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.png'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  devtool: isDev ? 'source-map' : '',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
        type: 'javascript/auto',
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { 
          loader: 'babel-loader' ,
          options: babelOptions()
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: { 
          loader: 'babel-loader' ,
          options: babelOptions('@babel/preset-typescript')
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: { 
          loader: 'babel-loader' ,
          options: babelOptions('@babel/preset-react')
        },
      },
    ],
  },
};
