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

### <a name="file-loader"></a> file-loader

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
