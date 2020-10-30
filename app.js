'use strict';

module.exports = app => {
  if (app.config.mongooseMock.app) require('./lib/mongoose')(app);
};
