const ignored = [
  '**/node_modules/**',
  'build/**',
];

const extension = ['.js'];

const msg = {
  isOverwrite: '检测到你有内容没有提交, 你确定要格式化覆盖代码吗?',
  notForce: '你可以通过 pretty -f 来去除提示, 强制格式化',
  format: 'pretty 你更新的文件',
  tip: [
    '如果你怕脚本乱改你未提交的代码, 你可以选择先提交代码再使用`pretty -a`来格式化',
    '如果你对pretty脚本信任的话, 可以直接使用`pretty -f`, 作者就是这样子操作的',
    '⭐️ happy formatting ️️⭐️',
    '',
  ].join('\n'),
  none: [
    '没有找到需要被pretty的文件',
    '可以执行`pretty -a`来格式化当前仓库所有没被`ESLint`忽略的js文件',
  ].join(', '),
};

const isOverwriteQuestion = {
  type: 'confirm',
  name: 'isOverwrite',
  message: msg.isOverwrite,
  default: false,
};

module.exports = {
  ignored,
  extension,
  msg,
  isOverwriteQuestion,
};
