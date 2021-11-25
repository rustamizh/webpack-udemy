# Настройка Webpack

### Установка Webpack  

```javascript
npm i -D webpack webpack-cli
```

### Запуск Webpack без конфигурации

```javascript
npx webpack
```

При запуске этой команды webpack сам находит файл index.js и создает директорию dist, куда помещает сгенерированный файл.  
 
При этом в логах выводится сообщение о том, что сборка произошла в production режиме, т.к. не был задан параметр mode.

### Запуск Webpack с параметром mode

```javascript
npx webpack --mode development
```

### Конфигурационный файл Webpack

```javascript
webpack.config.js
```

Минимальная конфигурация webpack:

```javascript
module.exports = {
  mode: 'development',
};
```


###  Webpack Loaders

Из коробки Webpack умеет работать только с javascript файлами. 

Для обработки других типов файлов необходимо устанавливать дополнительные модули - лоадеры.  
Каждый из лоадеров выполняет свою узко-специальную задачу. Выстраивая композицию лоадеров с помощью Webpack можно решать широкий спектр задач.


### Список популярных Webpack Loaders

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