/*
 * @Description : 对象和数组匹配器
 * @Date        : 2022-06-06 06:38:29 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-06-06 06:46:03 +0800
 * @LastEditors : JackChou
 */

describe('对象和数组匹配器', () => {
  test('toBe', () => {
    // NOTE 相同，即同一个引用
    const a = { name: 'jest' }
    expect(a).toBe(a)
    expect(a).not.toBe({ name: 'jest' })
    // 数组
    const arr = [1, { name: 'jest' }, 'hello']
    expect(arr).toBe(arr)
    expect(arr).not.toBe([1, { name: 'jest' }, 'hello'])
  })

  test('toEqual', () => {
    // NOTE 值比较，值相同即可
    const a = { name: 'jest' }
    expect(a).toEqual({ name: 'jest' })
    expect(a).toEqual(a)
    // 数组
    const arr = [1, { name: 'jest' }, 'hello']
    expect(arr).toEqual(arr)
    expect(arr).toEqual([1, { name: 'jest' }, 'hello'])
  })
})
