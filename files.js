const path = require('path');
const glob = require('glob');
const isDirectory = require('is-directory');

const { getChangedFiles, getSinceRevision } = require('./diff');
const { isMatchExtension, isPathNotIgnored } = require('./util');
const { ignored } = require('./config');

const cwd = process.cwd();
const revision = getSinceRevision(cwd);
const allFiles = glob
  .sync('**/*.js', {
    ignore: ignored,
  })
  .filter(isPathNotIgnored);

const getSpecifyFiles = (filePath) => {
  if (isDirectory.sync(path.resolve(cwd, filePath))) {
    return glob
      .sync(`${filePath}/**/*.js`, {
        ignore: ignored,
      })
      .filter(isPathNotIgnored);
  } else {
    return [filePath];
  }
};

function getNeedPrettyFiles({ all, path: filePath }) {
  if (filePath) {
    return { files: getSpecifyFiles(filePath), type: 'path' };
  } else if (all) {
    return { files: allFiles, type: 'all' };
  } else {
    try {
      const changedFiles = getChangedFiles(cwd, revision)
        .filter(isMatchExtension)
        .filter(isPathNotIgnored);

      return { files: changedFiles, type: 'changed' };
    } catch (e) {
      return { files: allFiles, type: 'all' };
    }
  }
}

module.exports = {
  getNeedPrettyFiles,
  getSpecifyFiles,
};
