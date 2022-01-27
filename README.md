# Настройка Webpack

- [Установка Webpack](#webpack-install)
- [Запуск Webpack без конфигурации](#run-webpack)
- [Запуск Webpack с параметром mode](#run-webpack-with-mode-param)
- [Конфигурационный файл Webpack](#webpack-config-file)
- [Webpack Loaders](#webpack-loaders)
- [Список популярных Webpack Loaders](#popular-webpack-loaders)
- [Webpack Plugins](#webpack-plugins)
- [Список популярных Webpack Plugins](#popular-webpack-plugins)
- [Webpack Dev Server](#webpack-dev-server)

### <a name="webpack-install"></a>Установка Webpack  

```javascript
npm i -D webpack webpack-cli
```

### <a name="run-webpack"></a>Запуск Webpack без конфигурации

```javascript
npx webpack
```

При запуске этой команды webpack сам находит файл index.js и создает директорию dist, куда помещает сгенерированный файл.  
 
При этом в логах выводится сообщение о том, что сборка произошла в production режиме, т.к. не был задан параметр mode.

### <a name="run-webpack-with-mode-param"></a>Запуск Webpack с параметром mode

```javascript
npx webpack --mode development
```

### <a name="webpack-config-file"></a>Конфигурационный файл Webpack

```javascript
webpack.config.js
```

Минимальная конфигурация webpack:

```javascript
module.exports = {
  mode: 'development',
};
```


### <a name="webpack-loaders"></a>Webpack Loaders

Из коробки Webpack умеет работать только с javascript файлами. 

Для обработки других типов файлов необходимо устанавливать дополнительные модули - лоадеры.  
Каждый из лоадеров выполняет свою узко-специальную задачу. Выстраивая композицию лоадеров с помощью Webpack можно решать широкий спектр задач.


### <a name="popular-webpack-loaders"></a>Список популярных Webpack Loaders

- [file-loader](#file-loader)
- [babel-loader](#babel-loader)
- [css-loader](#css-loader)
- [style-loader](#style-loader)
- [sass-loader](#sass-loader)

### <a name="file-loader"></a> file-loader

[ссылка на документацию](https://v4.webpack.js.org/loaders/file-loader/)

Этот лоадер загружает файл без преобразований и без изменений внутренней структуры. Он просто копирует файл в папку dist и возвращает путь к этому файлу. Обычно используется для загрузки статических ресурсов - шрифтов и изображений.

```javascript
npm i -D file-loader
```

Конфигурация лоадера:

```javascript
module.exports = {
  mode: 'development',
  module: {
      rules: [
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
};
```

Поля конфигурации:  
- **test** - содержит регулярное выражение, описывающее тип файлов, к которым применяется лоадер;
- **use** - массив, содержащий список лоадеров, которые последовательно (справа налево) применятся к описанным файлам;
- **outputPath** - название директории, которую создаст лоадер для скомпилированных файлов;
- **name** - имя выходного файла, с возможностью параметризации названия;

### <a name="babel-loader"></a> babel-loader

[ссылка на документацию](https://webpack.js.org/loaders/babel-loader/)

Этот лоадер позволяет использовать babel для проекта с webpack. При использовании этого лоадера важно исключить из обработки такие директории, как node_modules с помощью поля **exclude**.

```javascript
npm i -D babel-loader
```

Конфигурация лоадера:

```javascript
module.exports = {
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
```
### <a name="css-loader"></a> css-loader

[ссылка на документацию](https://webpack.js.org/loaders/css-loader/)

Этот лоадер позволяет загружать модули с расширением css.

```javascript
npm i -D css-loader
```

Конфигурация лоадера:

```javascript
{
  test: /\.(css)$/,
  use: [
    {
      loader: 'css-loader',
    },
  ],
}
```

### <a name="style-loader"></a> style-loader

[ссылка на документацию](https://webpack.js.org/loaders/style-loader/)

Этот лоадер добавляет на html страницу стили, сгенерированные при помощи css-loader, при помощи блока style.

```javascript
npm i -D css-loader
```

Конфигурация лоадера:

```javascript
{
  test: /\.(css)$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
    },
  ],
}
```

При композиции лоадеры применяются к файлам в обратном порядке. В данном случае к файлам с расширением css сначала применится css-loader и уже после результат его работы передастся в style-loader.


### <a name="sass-loader"></a> sass-loader

[ссылка на документацию](https://webpack.js.org/loaders/sass-loader/)

Этот лоадер позволяет работать с файлами с раширением scss. Требует для работы установку пакета node-sass, который и занимается преобразованием scss в обычный css.

```javascript
npm i -D node-sass sass-loader
```

Конфигурация лоадера:

```javascript
{
  test: /\.(s[ca]ss)$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'sass-loader',
    },
  ],
}
```
При композиции лоадеров и отсутствии дополнительных настроек можно использовать сокращенную запись, просто перечисляя строковые названия лоадеров в массиве use.

```javascript
{
  test: /\.(s[ca]ss)$/,
  use: [
    // Creates `style` nodes from JS strings
    "style-loader",
    // Translates CSS into CommonJS
    "css-loader",
    // Compiles Sass to CSS
    "sass-loader",
  ],
}
```

### <a name="webpack-plugins"></a>Webpack Plugins
В отличие от лоадеров, которые отвечают за трансформацию и загрузку модулей, плагины позволяют выполнять действия, которые относятся к приложению в целом. Например, они могут собрать все картинки проекта и собрать и в общий спрайт, или собрать все css файлы и собрать в один оптимизированный файл.

Впрочем, некоторые плагины могут вообще не изменять файлы проекта. Например, плагин под названием webpack-bundle-analyzer позволяет наглядно увидеть из чего состоит текущий банд приложения и какие его части нуждаются в оптимизации.

### <a name="popular-webpack-plugins"></a>Список популярных Webpack Plugins

- [HtmlWebpackPlugin](#html-webpack-plugin)
- [MiniCssExtractPlugin](#mini-css-extract-plugin)
### <a name="html-webpack-plugin"></a> HtmlWebpackPlugin

[ссылка на документацию](https://webpack.js.org/plugins/html-webpack-plugin/)

Один из самых популярных плагинов - это HtmlWebpackPlugin. Он позволяет копировать html файл из директории src в директорию билда приложения, попутно подключая к нему все необходимые билд файлы.

```javascript
npm i -D html-webpack-plugin
```

Плагины подкдючаются в webpack.config.js путем добавления в виде элементов массива в секцию plugins.

В отличие от лоадеров в секцию plugins подаются вызовы конструкторов плагинов, которые предварительно импортируются из node_modules с помощью require.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  module: {
      rules: [
        {...}
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
};
```

По умолчанию HtmlWebpackPlugin не копирует html файл из src, а создает новый в директории билда. 

Для конфигурации плагина необходимо передать в его конструктор объект с настройками.

```javascript
  plugins: [
    new HtmlWebpackPlugin({
        template: 'index.html',
      })
  ]
```

Помимо этого HtmlWebpackPlugin содержит в себе встроенный шаблонизатор, который позволяет передавать в результирующий html данные в виде шаблонных переменных. К примеру, следующим образом можно передать в шаблон отличный от исходного title.

```javascript
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Hello, World!',
        template: 'index.html'
      })
  ]
```

В шаблоне доступ к шаблонной переменной можно получить следующим образом:

```javascript
<title><%= htmlWebpackPlugin.options.title %></title>
```

Так можно передавать в шаблон какую-то служебную информацию, котормую можно динамически взять из JavaScript. К примеру, время создания билда.

```javascript
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Hello, World!',
        buildTime: new Date().toISOString(),
        template: 'index.html'
      })
  ]


<div>Build at: <%= htmlWebpackPlugin.options.buildTime %></div>
```

### <a name="mini-css-extract-plugin"></a> MiniCssExtractPlugin

[ссылка на документацию](https://webpack.js.org/plugins/mini-css-extract-plugin/)

Этот плагин извлекает css код в отдельные файлы, а затем добавляет ссылки на эти файлы в html документ.

```javascript
npm i -D mini-css-extract-plugin
```

Добавляется в weback.config.js он аналогично HtmlWebpackPlugin путем передачи в секцию plugins вызова своего конструктора.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


  plugins: [
    new HtmlWebpackPlugin({
        title: 'Hello, World!',
        buildTime: new Date().toISOString(),
        template: 'index.html'
      }),
    new MiniCssExtractPlugin()
  ]
```
Помимо этого неободимо внести изменения в секцию с лоадерами, заменив style-loader, который добавляет стили к странице с помощью тегов style, на собственный лоадер от MiniCssExtractPlugin.

```javascript
{
  test: /\.(s[ca]ss)$/,
  use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader'],
}
```

Так же как и с HtmlWebpackPlugin в конструктор MiniCssExtractPlugin можно передать объект с настройками. Например, изменить дефолтное название результирующего файла css.

```javascript
    new MiniCssExtractPlugin({
      filename: 'main-[hash:8].css'
    })
```

Такое решение позволить избежать агрессивного кэширования css файла и позволит браузерам оперативно загружать новую версию после внесения изменений в css.

MiniCssExtractPlugin удобно использовать в prodiction билдах. Для разработки и динамической подгрузки стилей после внесения изменений отлично подходит упомянутый style-loader.


### <a name="#webpack-dev-server"></a>Webpack Dev Server

[ссылка на документацию](https://webpack.js.org/configuration/dev-server/)

Webpack DevServer - это отдельная утилита, которая запускает WebPack и может реагировать на изменения в исходном коде, пересобирая проект в реальном времени.

```javascript
npm i -D webpack-dev-server
```

Для удобного запуска необходимо изменить команду запуска в package.json, запуская не сам webpack, а webpack-dev-server.

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server"
  },
```

При этом webpack-dev-server продолжает работать даже при удалении директории с билдом, потому что он хранит сборку в оперативной памяти компьютера, пересобирая ее по мере необходимости в реальном времени.

Для генерации статического билда можно создать дополнительную команду рядом со сборкой для разработки, назвав ее, к примеру, **build**.

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server",
    "build": "webpack"
  },
  ```

  Для конфигурации webpack-dev-server необходимо добавить соответствущий блок в weback.config.js.

```javascript
 devServer: {
      open: true,
    }
```

Поля конфигурации:  
- **open** - после окончания сборки webpack-dev-server сам откроет браузер по умолчанию на соответствующей странице;