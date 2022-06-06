/*
 * @Description : 真值假值测试
 * @Date        : 2022-06-07 06:36:09 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-06-07 06:43:11 +0800
 * @LastEditors : JackChou
 */
describe('真值假值测试', () => {
  test('真值？', () => {
    expect(true).toBeTruthy()
    expect('0').toBeTruthy()
    expect(1).toBeTruthy()
    expect(100).toBeTruthy()
    expect({}).toBeTruthy()
    expect([]).toBeTruthy()
  })

  test('假值？', () => {
    expect(false).toBeFalsy()
    expect('').toBeFalsy()
    expect(0).toBeFalsy()
    expect(0).toBeFalsy()
    expect({}).not.toBeFalsy()
    expect([]).not.toBeFalsy()
  })
})
