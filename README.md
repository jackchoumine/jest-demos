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

> toBeDefined(只要有值，即通过测试)、toBeUndefined 检查`undefined`

> toContain 数组、set 严格匹配

> toContainEqual 数组、set 值相等匹配

2. 字符串

3. 数字

> BeCloseTo 浮点数判断相等

> toBeGreaterThan 大于

4. 布尔值

> toBeTruthy 真值

> toBeFalsy 假值

5. 函数匹配器

> 抛出异常

```js
const testFn = () => {
  throw new Error('test')
}
describe('函数抛出方法匹配', () => {
  test('should throw error', () => {
    expect(testFn).toThrow()
    expect(testFn).not.toThrow('a')
    expect(testFn).toThrow('test')
  })
})
```

> 异步代码

当你有以异步方式运行的代码时，Jest 需要知道当前它测试的代码是否已完成，然后它可以转移到另一个测试。

回调类型：

```js
test('异步函数', done => {
  fetchData(n => {
    expect(n).toEqual(30)
  })
  done()
})
```

promise

```js
test('函数返回 promise', () => {
  return githubUsers()
    .then(res => {
      expect(res).toEqual(23)
    })
    .catch(error => {
      console.log(error)
    })
})
```

使用 await

```js
test('函数返回 promise', async () => {
  const res = await githubUsers()
  expect(res).toEqual(23)
})
```

6. 常用函数钩子

`beforeEach` 在每个测试之前运行。
`afterEach` 在每个测试之后运行。
`beforeAll` 所有测试运行运行之前运行。
`afterAll` 所有测试运行运行之后运行。

钩子函数的运行的作用域，可通过 `describe` 进行分组，限制钩子函数的运行的范围。

顶级的 beforeEach 会比 describe 中的 beforeEach 执行的更早。

```js
beforeAll(() => {
  console.log('beforeAll ---1')
})

afterAll(() => {
  console.log('afterAll ---1')
})

beforeEach(() => {
  console.log('beforeEach ----- 1')
})

afterEach(() => {
  console.log('afterEach ----- 1')
})

test('city database has Vienna', () => {
  expect('Vienna').toBeTruthy()
})

describe('真值假值测试', () => {
  beforeAll(() => {
    console.log('beforeAll')
  })

  afterAll(() => {
    console.log('afterAll')
  })

  beforeEach(() => {
    console.log('beforeEach')
  })
  afterEach(() => {
    console.log('afterEach')
  })

  test('真值？', () => {
    expect(true).toBeTruthy()
    expect('0').toBeTruthy()
    expect(1).toBeTruthy()
    expect(100).toBeTruthy()
    expect({}).toBeTruthy()
    expect([]).toBeTruthy()
  })
})
// beforeAll ---1

// beforeEach ----- 1
// afterEach ----- 1

// beforeAll
// beforeEach ----- 1
// beforeEach
// afterEach
// afterEach ----- 1

// afterAll
// afterAll ----- 1
```

describe 之间互不影响。

```js
describe('describe 1', () => {
  beforeAll(() => {
    console.log('beforeAll ---1')
  })

  afterAll(() => {
    console.log('afterAll ---1')
  })

  beforeEach(() => {
    console.log('beforeEach ----- 1')
  })

  afterEach(() => {
    console.log('afterEach ----- 1')
  })

  test('city database has Vienna', () => {
    expect('Vienna').toBeTruthy()
  })
})

describe('真值假值测试', () => {
  beforeAll(() => {
    console.log('beforeAll')
  })

  afterAll(() => {
    console.log('afterAll')
  })

  beforeEach(() => {
    console.log('beforeEach')
  })
  afterEach(() => {
    console.log('afterEach')
  })
  test('真值？', () => {
    expect(true).toBeTruthy()
    expect('0').toBeTruthy()
    expect(1).toBeTruthy()
    expect(100).toBeTruthy()
    expect({}).toBeTruthy()
    expect([]).toBeTruthy()
  })

  // beforeAll ---1
  // beforeEach ----- 1
  // afterEach ----- 1
  // afterAll ---1

  // beforeAll
  // beforeEach
  // afterEach
  // afterAll
})
```
