# jest-demos

jest 学习

## 环境搭建

安装依赖：

```bash
npm i -D jest # 版本还是 ~28.1.0
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

