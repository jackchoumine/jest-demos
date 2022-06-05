/*
 * @Description : babel 配置
 * @Date        : 2022-06-06 06:09:36 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-06-06 06:20:54 +0800
 * @LastEditors : JackChou
 */
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
