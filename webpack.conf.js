const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');//4-1


const isDev = process.env.NODE_ENV === 'development'
//webpack中不需要区分环境的配置
const config = {
    target: 'web',//2-3
    //webpack.conf.js entry和output的意思 webpack 会将entry(入口配置)的文件，以及其依赖的文件（APP,vue）打包成一个bundle.js文件，放在test/dist下 打包出来的是能直接在浏览器运行的代码
    entry: path.join(__dirname, 'src/index'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                //使用babel-loader
                test: /\.jsx$/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                //处理图片
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,//小于1024字节则将图片转成base64代码，插入到html中，而不是作为外部文件引用
                            name: '[name].[ext]',//输出的文件名 name为原来的名字，ext为后缀
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // make sure to include the plugin for the magic
        //新版本需要添加 VueLoaderPlugin const VueLoaderPlugin = require('vue-loader/lib/plugin');
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        //在dist中生成一个index文件引入打包后的js、css和图片
        //const HtmlWebpackPlugin = require('html-webpack-plugin');
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ]
}

if (isDev) {
    //开发环境下 
    //css代码放入js中
    config.module.rules.push({
        //处理styl文件
        test: /\.styl/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    })

    //使用devtool ，在调试模式时，能在浏览器中显示源代码，而不是打包后的代码
    //cheap-module-eval-source-map  原始源代码（仅限行） 调试过程中的代码时源代码
    config.devtool = '#cheap-module-eavl-source-map'

    //配置webpack-dev-server的相关参数
    config.devServer = {
        //contentBase 告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
        contentBase: './dist',
        //当open启用时，开发服务器将打开浏览器。
        open: true,
        //启用 webpack 的模块热替换特性：
        //热替换 组件更新只重新渲染该组件部分
        hot: true,
        //出现编译器错误或警告时，在浏览器中显示全屏覆盖。默认禁用
        //如果要显示警告和错误：
        overlay: {
            warnings: true,
            errors: true
        }
    }
} else {
    //此为生产环境
    //生产环境下单独打包类库文件，
    //为什么？因为vue等类库文件十分稳定，而业务代码更改时每次都要重新打包vue等类库文件，造成不必要的浪费
    //单独打包类库代码
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    }
    //单独打包类库文件 原来是写在plugin中
    config.optimization = {
        splitChunks: {
            name: 'vendor'
        },
        //把app.js内和webpack相关的代码单独打包到一个文件里去
        runtimeChunk: true
    }

    //output.filename使用chunkhash
    config.output.filename = '[name].[chunkhash:8].js'

    //生产环境下单独打包css文件 对应8
    //在plugins中初始化ExtractPlugin，并指定打包后的文件名
    config.plugins.push(
        // new ExtractPlugin('styles.[contentHash:8].css')
        new ExtractPlugin('styles.[md5:contentHash:hex:8].css'),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'runtime'
        // })
    );
    //使用ExtractPlugin单独打包css文件
    config.module.rules.push({
        //处理styl文件
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                {
                    //使用postcss-loader
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                    }
                },
                'stylus-loader'
            ]
        })
    });



}
module.exports = config


//1运行webpack.conf.js
        //在package.json中加一条指令
        //"build":"webpack -- config webpack.config.js"
        //只有在package中调用webpack才会调用test/node_modules的webpack
        //在命令行cmd下调用的webpack是全局的webpack，版本可能不同
//2处理css要用到的loader
        //css-loader style-loader
        //npm i css-loader style-loader
//3处理图片要用到的loader
        //url-loader 依赖于file-loader
        // npm i url-loader file-loader
//4处理styl文件
        //npm i stylus-loader stylus

//5使用postcss-loader 为css添加前缀
        //postcss.config.js
        // npm i post-css-loader autoprefixer 
//6使用babel-loader解析jsx文件
        //.babelrc
        // npm i babel-preset-env babel-plugin-transform-vue-jsx @babel/core
//7单独打包css文件
        //因为webpack4.3包含了contentHash这个关键字段，所以在ExtractPlugin中不能使用contentHash
        //使用md5:contentHash:hex:8代替
        //webpack4.0以上用3.x extract-webpack-plugin 打包会不兼容，extract-webpack-plugin升级就可以了
        //npm install --save-dev extract-text-webpack-plugin@4.0.0-beta.0
//8单独打包类库文件
        //原先写在plugin中
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'vendor'
        // })
// 9配置webpack-dev-server

