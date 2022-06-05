# jest-demos

jest 学习

## 环境搭建

1. node 环境

安装依赖：

```bash
npm i -D jest # 此时版本是 ~28.1.0
```

写一个测试：

```js
test('可用吗？', () => {
  expect(1 + 2).toBe(3)
})
```

`npx jest` 测试通过，说明环境搭建好。

配置监听脚本，代码改变，自动执行测试：

```bash
"scripts": {
    "test": "jest --watchAll"
  },
```

2. ESM 环境搭建

jest 在是 node 下使用的，只能使用 CJS 语法，希望使用 ES6 模块语法，需要 babel 转化。

```bash
npm i -D @babel/core @babel/preset-env
```

配置`.babelrc.js`:

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
      },
    ],
  ],
}
```

引入测试用代码验证环境是否可用：

`tests/can-use.spec.js`

```js
import { sum } from '../src/es6.sum.js'

test('可用吗？', () => {
  expect(sum(1, 2)).toBe(3)
})
```

执行`npx jest`。

> 如果 package.json 含有 `"type": "module"`，改选项表示此 npm 包采用 ESM。

报错：

`Error while loading config - You appear to be using a native ECMAScript module configuration file, which is only supported when running Babel asynchronously.`

两个办法解决：

1. 修改 type 为 `commonjs` 或者删除 type。 推荐。

2. 修改`.babelrc.js` 为`.babelrc.cjs`

## 匹配器

### 常见数据类型的匹配器

1. 引用类型（对象和数组）

> toBe 引用比较 或者 `===`

> toEqual 值比较，值相同，就相等

> toBeNull 检查`null`

> toBeDefined、toBeUndefined 检查`undefined`

2. 字符串

3. 数字

4. 布尔值
