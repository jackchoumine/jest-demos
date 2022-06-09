# jest-demos

测试可让我们对代码更加有信心，测试能保证重构顺利进行等。但是因为前端行业的特殊性，测试往往是用手功进行。

随着 node 的出现，前端自动化测试开始慢慢普及。

## 测试为何重要

> 增加对代码的信心

测试能让问题提前暴露。

> 能大胆重构老代码

曾几何时，想要重构老代码，又怕引发问题，重构又要让测试同时重新测试，给测试增加工作量，那就干脆不重构了，继续在老代码里添加功能，然后功能越加越多，慢慢地变质腐败，然后失控。

要是之前有充分的测试代码，重构代码后，再运行测试，就能保证代码不出问题或者少出问题。

但是，但是，要是一个项目都写了测试代码，往往问题不会太大，是不需要重构的。那些问题多的代码，往往还没有测试代码。

> 编写最小代码

先写测试代码，再实现具体的而功能让测试代码通过，可实现编写最小功能代码的目的。TDD(测试驱动开发)能最少最干净的代码。

> 避免回归错误

当添加了新的需求，在代码里添加新功能，然后你不知道该功能上线后会产生什么影响，集成测试就能帮助在上线之前发现问题。

## 前端需要哪些测试

> 白盒测试

测试代码逻辑和结构。

> 黑盒测试

功能测试，测试功能是否符合预期，不关注内部代码结构。

> 单元测试（unit test）

测试单一的功能：一个函数、一个接口，是最基础的测试。往往属于白盒测试。

> 集成测试(integration test)

前端程序需要正常工作，可能需要集成其他模块，比如生产环境中依赖其他资源，需要集成测试。

这种测试配置复杂，生产环境也不好模块，实践中很少做这种测试。

> 端到端测试(E2E test)

从头到尾验证程序是否正常运行，比如验证后台接口、用户的使用流程等，耗时，性价比不高，实践中往往是测试人员手动测试代替。

## 有哪些测试框架

[jest](https://jestjs.io/zh-Hans/)、[vitest](https://vitest.dev/)、[Mocha](https://mochajs.org/)等。

jest 最流行，本文以 jest 为例子，学习如何测试。

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

匹配器用来判断值是否符合预期。

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
    expect(testFn).not.toThrow(/a/)
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

describe 的回调先于所有测试之前运行。

```js
describe('describe outer', () => {
  console.log('describe outer-a')

  describe('describe inner 1', () => {
    console.log('describe inner 1')

    test('test 1', () => console.log('test 1'))
  })

  console.log('describe outer-b')

  test('test 2', () => console.log('test 2'))

  describe('describe inner 2', () => {
    console.log('describe inner 2')

    test('test 3', () => console.log('test 3'))
  })

  console.log('describe outer-c')
})
```

只运行一条测试：

```js
describe('describe outer', () => {
  console.log('describe outer-a')

  describe('describe inner 1', () => {
    console.log('describe inner 1')

    test('test 1', () => console.log('test 1'))
  })

  console.log('describe outer-b')

  test.only('test only', () => console.log('test only'))
  test('test 2', () => console.log('test 2'))

  describe('describe inner 2', () => {
    console.log('describe inner 2')

    test('test 3', () => console.log('test 3'))
  })

  console.log('describe outer-c')
})
```

`test.only` 在测试之前相互影响时，很有用。

## 参考

[An Introduction to testing in Javascript](https://gabrieltanner.org/blog/testing-introduction)
