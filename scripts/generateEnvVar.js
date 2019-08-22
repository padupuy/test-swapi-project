/* eslint-disable */

/**
 * This file allows to generate a default config file with at least development values
 * The conf file is generated in public/config.js
 *
 */

const fs = require('fs');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV;

const dotenvFiles = [
  '.env',
  `.env.development`,
  `.env.development.local`,
  `.env.${NODE_ENV}`,
  `.env.${NODE_ENV}.local`
];

let variables = {};

function getReactEnvVar(variables) {
  let result = {};

  for (const key in variables) {
    if (variables.hasOwnProperty(key) && key.includes('REACT_APP')) {
      result[key] = variables[key];
    }
  }

  return result;
}

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    const env = require('dotenv').config({
      path: dotenvFile
    });

    if (env.parsed) {
      variables = {
        ...variables,
        ...getReactEnvVar(env.parsed)
      };
    }
  }
});

const configFilePath = path.resolve(__dirname, '..', 'public', 'config.js');

const configFile = `window.app = ${JSON.stringify(variables)};`;

console.log('The NODE_ENV is', NODE_ENV);
console.log('The dotenv files are', dotenvFiles.join(', '));
console.log('The config file contains', variables);

fs.writeFile(configFilePath, configFile, 'utf-8', function(err) {
  if (err) {
    return console.log(err);
  }

  console.log('The config file was saved to', configFilePath);
});
