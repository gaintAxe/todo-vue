const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'

const config= {
    target:'web',//2-3
    entry:path.join(__dirname,'src/index'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                // 处理vue 2-1
                test:/\.vue$/,
                loader:'vue-loader'
            },{
                //处理css文件 2-2
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },{
                //处理图片 2-2
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,//小于1024字节则将图片转成base64代码，插入到html中，而不是作为外部文件引用
                            name:'[name].[ext]',//输出的文件名
                        }
                    }
                ]
            },{
                //处理styl文件 2-2
                test:/\.styl/,
                use:[
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

if(isDev){
    //如果是开发环境
    config.devServer={
        port:'8000',
        host:'0.0.0.0',
        //编译有错误则显示在网页上
        overlay:{
            errors:true
        }
    }
}
module.exports=config

/*2-1 vue-loader 和webpack项目配置
    //webpack.conf.js entry和output的意思
        //webpack 会将entry(入口配置)的文件，以及其依赖的文件（APP,vue）打包成一个bundle.js文件，放在test/dist下
        //打包出来的是能直接在浏览器运行的代码
    //运行webpack.conf.js
        //在package.json中加一条指令
        //"build":"webpack -- config webpack.config.js"
        //只有在package中调用webpack才会调用test/node_modules的webpack
        //在命令行cmd下调用的webpack是全局的webpack，版本可能不同
    //因为依赖的文件有.vue，就需要在配置文件中配置处理vue文件的loader 否则会报错
        //新版本需要添加
            //const VueLoaderPlugin = require('vue-loader/lib/plugin');
            // plugins: [
                // make sure to include the plugin for the magic
            //     new VueLoaderPlugin()
            // ],
            //plugin和output同级
*/
/* 2-2 处理静态资源和css预处理去stylus
//处理css要用到的loader
    //css-loader style-loader
    //npm i css-loader style-loader
//处理图片要用到的loader
    // url-loader
    //url-loader 依赖于file-loader
    // npm i url-loader file-loader
//处理styl文件
    //npm i stylus-loader stylus
    // {
    //     test:/\.styl/,
    //     use:[
    //         'style-loader',
    //         'css-loader',
    //         'stylus-loader'
    //     ]
    // }
    //先用stylus-loader处理styl文件，再用css-loader 和style-loader
*/
//2-3webpack-dev-server的配置和使用
    //从命令中判断是否是开发环境
        //const isDev = process.env.NODE_ENV === 'development'
    //原先直接module.expots={} 现在要结果if(isDev)处理
    //htmlwebpackplugin 要3.2.0版本的 
        //const HTMLPlugin = require('html-webpack-plugin');
        //plugin:[new HTMLPlugin()] 
        // plugin和entry同级
    //const webpack = require('webpack')
    //new webpack.DefinePlugin({
    //     'process.env':{
    //         NODE_ENV:isDev?'"development"':'"production"'
    //     }
    // }),