/*
 * @Description : 异步函数
 * @Date        : 2022-06-07 07:22:54 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-06-07 07:36:49 +0800
 * @LastEditors : JackChou
 */
import axios from 'axios'
export const fetchData = fn => {
  axios.get('https://api.github.com/users').then(res => {
    // console.log(res.data)
    fn(res.data.length)
  })
}
