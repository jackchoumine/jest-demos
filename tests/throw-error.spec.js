/*
 * @Description : 抛出方法匹配
 * @Date        : 2022-06-07 07:02:36 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-06-07 07:04:59 +0800
 * @LastEditors : JackChou
 */

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
