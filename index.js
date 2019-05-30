const fs = require('fs');
const format = require('prettier-eslint');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');

const { isOverwriteQuestion, msg } = require('./config');
const { getNeedPrettyFiles } = require('./files');

async function prettyFormat({ force, all, path, ...prettierOptions }) {
  const { files, type } = getNeedPrettyFiles({ all, path });

  // 不需要修改
  if (!files.length) {
    console.log(chalk.green(msg.none));
    return;
  }

  if (type === 'changed' && files.length > 0 && !force) {
    console.log(chalk.green(msg.tip));
    const answers = await inquirer.prompt(isOverwriteQuestion);
    if (!answers.isOverwrite) {
      return;
    }
  }

  const formatSpinner = ora(msg.format).start();
  try {
    files.forEach((filePath) => {
      const formatted = format({
        filePath,
        eslintConfig: {
          useEslintrc: true,
        },
        prettierOptions,
      });

      fs.writeFileSync(filePath, formatted);
    });

    formatSpinner.succeed();
  } catch (error) {
    formatSpinner.fail();
    throw error;
  }
}

module.exports = prettyFormat;
