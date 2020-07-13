const docsLoader = require.resolve('./doc-loader')
//根据不同的环境生成不同的配置
module.exports = (isDev) => {
    return {
        //忽略.vue文件中template里的空格，有空格会对节点样式产生影响
        // preserveWhitepace: true,//废弃
        compilerOptions: {
            preserveWhitepace: true,

        },
        //vue会单独处理css内容，默认情况下vue里的css不会输出到在plugin配置ExtractPlugin后单独打包的css文件里，为true则输出到单独打包的文件里
        //将.vue文件中的css单独打包（true/false）
        extractCss: !isDev, //开发环境为true
        
        //不起作用，在webpack.config.base.js中配置
        // cssModules: {
        //     localIdentName:'[path]-[name]-[hash:base64:5]',
        //     //小驼峰命名方式 shHssd
        //     //因为css的命名是 xxx-xxx 在js中非常难用
        //     camelCase:true
        // },

        //js热重载 false是关闭
        // hotReload:false,

        //自定义模块 类似于.vue文件里的template和script,style
        // loaders: {
        //     'docs': docsLoader
        // },
        //无用 可见webpack.config.base.js对自定义模块的处理

        //preLoader解析在loaders之前 废弃
        // preLoader:{},
        // //preLoader解析在loaders之后 废弃
        // postLoader:{}
    }
}