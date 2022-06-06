/*
 * @Description : 抛出方法匹配
 * @Date        : 2022-06-07 07:02:36 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-06-07 07:40:50 +0800
 * @LastEditors : JackChou
 */
import { fetchData } from '../src/async.fn.js'

const testFn = () => {
  throw new Error('test')
}

describe('函数', () => {
  test('should throw error', () => {
    expect(testFn).toThrow()
    expect(testFn).not.toThrow('a')
    expect(testFn).toThrow('test')
  })

  test('异步函数', done => {
    fetchData(n => {
      expect(n).toEqual(30)
    })
    done()
  })
})
