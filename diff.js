const execa = require('execa');

const runGit = (directory, args) => execa.sync('git', args, {
  cwd: directory,
});

const getLines = execaResult => execaResult.stdout.split('\n');

const getSinceRevision = (directory) => {
  try {
    const revision = 'HEAD';
    return runGit(directory, ['rev-parse', '--short', revision]).stdout.trim();
  } catch (error) {
    if (/HEAD/.test(error.message)) {
      return null;
    }
    throw error;
  }
};

// git diff
const getChangedFiles = (directory, revision) => [
  ...getLines(runGit(directory, ['diff', '--name-only', '--diff-filter=ACMRTUB', revision])),
].filter(Boolean);

module.exports = { getChangedFiles, getSinceRevision };
