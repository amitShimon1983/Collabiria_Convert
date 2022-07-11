/* eslint-disable @typescript-eslint/no-var-requires */
const { configPaths } = require('react-app-rewire-alias');
const { aliasDangerous } = require('react-app-rewire-alias/lib/aliasDangerous');

module.exports = function override(config) {
  aliasDangerous({
    ...configPaths('./base.tsconfig.json'),
  })(config);
  return config;
};
