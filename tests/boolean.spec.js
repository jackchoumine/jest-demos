/*
 * @Description : 真值假值测试
 * @Date        : 2022-06-07 06:36:09 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-06-08 11:14:51 +0800
 * @LastEditors : JackChou
 */
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

  // test('假值？', () => {
  //   expect(false).toBeFalsy()
  //   expect('').toBeFalsy()
  //   expect(0).toBeFalsy()
  //   expect(0).toBeFalsy()
  //   expect({}).not.toBeFalsy()
  //   expect([]).not.toBeFalsy()
  // })
})
