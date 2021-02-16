const path = require('path');
const { merge } = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const LessCleanCSSPlugin = require("less-plugin-clean-css");
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
            {
              loader: "less-loader", options: {
                lessOptions: {
                  noIeCompat: true,
                  plugins: [
                    new LessCleanCSSPlugin({ advanced: true }),
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'postcss-loader',
            'css-loader',
          ],
        },
      ],
    },
    plugins: [],
  },
  production: {
    mode: 'production',
    plugins: [
      require('cssnano'),
    ]
  },
  development: {
    mode: 'development',
    devtool: 'inline-source-map',
  }
}

module.exports = (env) => {
  console.log(env);
  const is_defined = (key) => {
    if (typeof env === 'array') {
      return env.includes(key);
    } else if (typeof env === 'object') {
      return !!env[key];
    } else {
      return env == key;
    }
  };
  let rsp = merge(
    config.public,
    is_defined('production') ? config.production : config.development
  );
  console.log(rsp);
  if (is_defined('analyz')) {
    rsp.plugins.push(new BundleAnalyzerPlugin());
  }
  return rsp;
};