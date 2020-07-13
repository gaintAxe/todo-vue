
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');

const baseConfig = require('./webpack.config.base.js')



const isDev = process.env.NODE_ENV === 'development'
const devServer = {
    contentBase: './dist',
    open: true,
    hot: true,
    overlay: {
        warnings: true,
        errors: true
    }
}
let config;
const defaultPlugin = [
    //将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
    //例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HtmlWebpackPlugin({
        title: 'Output Management'
    })
]
if (isDev) {
    config = merge(baseConfig, {
        devtool: '#cheap-module-eavl-source-map',
        devServer,
        module: {
            rules: [
                {
                    //处理styl文件
                    test: /\.styl/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        plugins: defaultPlugin.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../src/index.js'),
            vendor: ['vue']
        },
        optimization: {
            splitChunks: {
                name: 'vendor'
            },
            //把app.js内和webpack相关的代码单独打包到一个文件里去
            runtimeChunk: true
        },
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        plugins: defaultPlugin.concat([
            new ExtractPlugin('styles.[md5:contentHash:hex:8].css'),

        ]),
        module: {
            rules: [
                //处理styl文件
                {
                    test: /\.styl/,
                    use: ExtractPlugin.extract({
                        fallback: 'vue-style-loader',
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
                }
            ]
        }
    })
}
module.exports = config

