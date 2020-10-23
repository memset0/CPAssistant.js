const path = require('path');
const { merge } = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = {
  public: {
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'less-loader',
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
      ],
    },
    plugins: [],
  },
  production: {
    mode: 'production',
  },
  development: {
    mode: 'development',
    devtool: 'inline-source-map',
  }
}

module.exports = (env) => {
  let rsp = merge(
    config.public,
    env.includes('production') ? config.production : config.development
  );
  console.log(rsp);
  if (env.includes('analyz')) {
    rsp.plugins.push(new BundleAnalyzerPlugin());
  }
  return rsp;
};