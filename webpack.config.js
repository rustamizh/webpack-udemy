const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniSccExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
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
        use: [
          { loader: MiniSccExtractPlugin.loader },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(s[ca]ss)$/,
        use: [
          { loader: MiniSccExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello, World',
      template: 'index.html',
    }),
    new MiniSccExtractPlugin({
      filename: 'main-[hash:8].css',
    }),
  ],
};

// если у лоадеров нет дополнительных настроек
// можно передавать просто массив с названиями
// use: [ 'style-loader', 'css-loader', 'sass-loader']
