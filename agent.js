'use strict';

module.exports = agent => {
  if (agent.config.mongooseMock.agent) require('./lib/mongoose')(agent);
};
