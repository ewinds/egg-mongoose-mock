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

Egg's mongoose plugin for unit testing.

## Install

```bash
$ npm i egg-mongoose-mock --save-dev
```

## Configuration

Change `{app_root}/config/plugin.unittest.js` to enable `egg-mongoose-mock` plugin:

```js
exports.mongoose = {
  enable: false,
  package: 'egg-mongoose',
};
exports.mongooseMock = {
  enable: true,
  package: 'egg-mongoose-mock',
};
```

## Simple connection

### Config

```js
// {app_root}/config/config.unittest.js
exports.mongoose = {
  client: {
    plugins: []
  }
};
exports.mongooseMock = {
  options: {
    autoReconnect: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
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

### Default config

see [config/config.default.js](config/config.default.js) for more detail.

## Questions & Suggestions

Please open an issue [here](https://github.com/ewinds/egg-mongoose-mock/issues).

## Contribution

If you are a contributor, follow [CONTRIBUTING](https://eggjs.org/zh-cn/contributing.html).

## License

[MIT](LICENSE)
