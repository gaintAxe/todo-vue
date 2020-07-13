const autoprefixer = require('autoprefixer');

module.exports={
    plugins:[
        autoprefixer()
    ]
}

/*postcss 一种对css编译的工具，类似babel对js的处理，常见的功能如：
1 . 使用下一代css语法
2 . 自动补全浏览器前缀
3 . 自动把px代为转换成rem
4 . css 代码压缩等等
postcss 只是一个工具，本身不会对css一顿操作，它通过插件实现功能，autoprefixer 就是其一
*/

/*Autoprefixer前缀补全 */
//npm i post-css-loader autoprefixer