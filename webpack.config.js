const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniSccExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'prodiction';
  const isDev = argv.mode === 'development';

  const getStyleLoaders = () => {
    return [
      isProd ? MiniSccExtractPlugin.loader : 'style-loader',
      'css-loader',
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: 'Hello, World',
        template: 'index.html',
      }),
    ];
    if (isProd) {
      return [
        ...plugins,
        new MiniSccExtractPlugin({
          filename: 'main-[hash:8].css',
        }),
      ];
    }

    return plugins;
  };

  return {
    mode: isProd ? 'production' : isDev && 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        // Images
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name]-[sha1:hash:7].[ext]',
              },
            },
          ],
        },
        // Fonts
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(css)$/,
          use: getStyleLoaders(),
        },
        {
          test: /\.(s[ca]ss)$/,
          use: [...getStyleLoaders(), { loader: 'sass-loader' }],
        },
      ],
    },
    plugins: getPlugins(),
    devServer: {
      open: true,
    },
  };
};

// если у лоадеров нет дополнительных настроек
// можно передавать просто массив с названиями
// use: [ 'style-loader', 'css-loader', 'sass-loader']
