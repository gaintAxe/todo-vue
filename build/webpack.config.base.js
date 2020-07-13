
const VueLoaderOptions = require('./vue-loader.config')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const config = {
    target: 'web',
    entry: path.join(__dirname, '../src/index'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../', 'dist')
    },
    resolve: {
        //将.ts添加为一个可解析的拓展名
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            //eslint检测
            {
                test: /\.(vue|js|jsx)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                //在上述文件的loader检测之前，先检测eslint，没通过，则不继续以下的loader检测
                //预处理
                // preh或者 post
                enforce: 'pre'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: VueLoaderOptions(isDev)
            }, {
                test: /\.jsx$/,
                loader: 'babel-loader'
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/ //忽略nodeModules
            }, {
                test: /\.css$/,
                oneOf: [
                    // 这里匹配 `<style module>`
                    {
                        resourceQuery: /module/,
                        use: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    // 开启 CSS Modules
                                    modules: true,
                                }
                            }
                        ]
                    },
                    // 这里匹配普通的 `<style>` 或 `<style scoped>`
                    {
                        use: [
                            'vue-style-loader',
                            'css-loader'
                        ]
                    }
                ]
            }, {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            //生成到文件夹中
                            name: 'resources/[path][name].[hash:8].[ext]',
                        }
                    },
                ]
            },
            //处理自定义模块
            {
                resourceQuery: /blockType=docs/,
                loader: require.resolve('./doc-loader.js')
            },
            //处理sass
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            //modules不为false，表示启用cssModule
                            modules: {
                                //插入的类名
                                localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
                            },
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            //使用sass语法时启用此配置项
                            // sassOptions: {
                            //     indentedSyntax: true
                            // },
                            //共享全局变量
                            prependData: `@import "src/assets/styles/variables.scss";`
                        }
                    }
                ]
            },
            //处理less 
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            //处理ts
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },


        ]
    }
}


module.exports = config
