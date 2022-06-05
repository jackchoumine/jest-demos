/*
 * @Description : 可用性测试
 * @Date        : 2022-06-06 05:58:19 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-06-06 06:24:31 +0800
 * @LastEditors : JackChou
 */
import { sum } from '../src/es6.sum.js'

test('可用吗？', () => {
  expect(sum(1, 2)).toBe(3)
})
