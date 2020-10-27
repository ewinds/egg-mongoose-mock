# egg-mongoose-mock
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-mongoose-mock.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-mongoose-mock
[travis-image]: https://img.shields.io/travis/ewinds/egg-mongoose-mock.svg?style=flat-square
[travis-url]: https://travis-ci.org/ewinds/egg-mongoose-mock
[codecov-image]: https://img.shields.io/codecov/c/githubewinds/egg-mongoose-mock.svg?style=flat-square
[codecov-url]: https://codecov.io/github/ewinds/egg-mongoose-mock?branch=master
[david-image]: https://img.shields.io/david/ewinds/egg-mongoose-mock.svg?style=flat-square
[david-url]: https://david-dm.org/ewinds/egg-mongoose-mock
[snyk-image]: https://snyk.io/test/npm/egg-mongoose-mock/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-mongoose-mock
[download-image]: https://img.shields.io/npm/dm/egg-mongoose-mock.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-mongoose-mock

Egg's mongoose plugin.

## Install

```bash
$ npm i egg-mongoose-mock --save
```

## Configuration

Change `{app_root}/config/plugin.js` to enable `egg-mongoose-mock` plugin:

```js
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose-mock',
};
```

## Simple connection

### Config

```js
// {app_root}/config/config.default.js
exports.mongoose = {
  options: {},
  // mongoose global plugins, expected a function or an array of function and options
  plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
};
```

### Example

```js
// {app_root}/app/model/user.js
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    userName: { type: String  },
    password: { type: String  },
  });

  return mongoose.model('User', UserSchema);
}

// {app_root}/app/controller/user.js
exports.index = function* (ctx) {
  ctx.body = yield ctx.model.User.find({});
}
```

## Multiple connections

### Config

```js
// {app_root}/config/config.default.js
exports.mongoose = {
  clients: {
    // clientId, access the client instance by app.mongooseDB.get('clientId')
    db1: {
      url: 'mongodb://127.0.0.1/example1',
      options: {},
      // client scope plugin array
      plugins: []
    },
    db2: {
      url: 'mongodb://127.0.0.1/example2',
      options: {},
    },
  },
  // public scope plugin array
  plugins: []
};
```

### Example

```js
// {app_root}/app/model/user.js
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('db1'); 

  const UserSchema = new Schema({
    userName: { type: String },
    password: { type: String },
  });

  return conn.model('User', UserSchema);
}

// {app_root}/app/model/book.js
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('db2');

  const BookSchema = new Schema({
    name: { type: String },
  });

  return conn.model('Book', BookSchema);
}

// app/controller/user.js
exports.index = function* (ctx) {
  ctx.body = yield ctx.model.User.find({}); // get data from db1
}

// app/controller/book.js
exports.index = function* (ctx) {
  ctx.body = yield ctx.model.Book.find({}); // get data from db2
}
```

### Default config

see [config/config.default.js](config/config.default.js) for more detail.

## Questions & Suggestions

Please open an issue [here](https://github.com/ewinds/egg-mongoose-mock/issues).

## Contribution

If you are a contributor, follow [CONTRIBUTING](https://eggjs.org/zh-cn/contributing.html).

## License

[MIT](LICENSE)
