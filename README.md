## use-pretty

> 快速格式化成符合 ESLint 规范代码

### 功能

1. 格式化符合仓库 `eslintrc` 配置的代码
2. 默认只格式化修改的 js 文件
3. 不会 pretty 被 ignore 的文件

### 使用

* install 方式

```sh
$ npm install -g use-pretty
$ usePretty
```

* npx 方式

```sh
$ npx use-pretty
```

### 参数

#### --force -f

> 强制格式化, 不提示你是否要格式化覆盖文件

#### --all -a

> 格式化没有被 eslint ignore 的 js 文件

#### --path -p

> 格式化指定路径的 js 文件(并且没有被 ignore 掉的)

#### --semi

> 是否有分号, 默认是有

#### --version -v

> 查看版本

#### --help -h

> 帮助

### 原理

`Code` ➡️ `prettier` ➡️ `eslint --fix` ➡️ `Formatted Code`

### 感谢

[prettier-eslint](https://github.com/prettier/prettier-eslint)
