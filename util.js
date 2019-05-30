const { extname } = require('path');
const eslint = require('eslint');
const { extension } = require('./config');

const { CLIEngine } = eslint;
const eslintCli = new CLIEngine({ useEslintrc: true });

function isPathNotIgnored(filePath) {
  return !eslintCli.isPathIgnored(filePath);
}

function isMatchExtension(filePath) {
  return extension.includes(extname(filePath));
}

module.exports = { isMatchExtension, isPathNotIgnored };
