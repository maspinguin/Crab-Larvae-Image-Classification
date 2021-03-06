const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv').config();

const packageVersion = require('./package.json').version;

let publicPath = '';
let mode = 'development';
if(process.env.NODE_ENV == "development" || process.env.NODE_ENV == "local") {
    publicPath = '/';
} else if(process.env.NODE_ENV == "production") {
    publicPath = "./";
}

module.exports = [{
    mode: mode,
    target: 'electron-renderer',
    devServer: {
        disableHostCheck: true,
        allowedHosts: [
            'localhost'
        ],
        hot: true,
        historyApiFallback: true,
    },
    context: path.join(__dirname),
    entry: {
        'larvae-ui': [
            './src/larvae-ui.js'
        ],
        style: [
            './scss/index.scss',
        ]
    },
    // node: {
    //     fs: 'empty',
    //     child_process: 'empty'
    // },
    output: {
        path: path.join(__dirname, 'dist', packageVersion),
        publicPath: publicPath,
        filename: '[name].js',
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'template/template.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'larvae-ui.css',
        }),
        new CopyPlugin([
            { from: 'image/', to: `image/` },
        ]),
        // new webpack.DefinePlugin({
        //     'process.env': JSON.stringify(dotenv.parsed)
        // })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }, {
                test: /\.(graphql|gql)$/,
                exclude: /(node_modules|bower_compontents)/,
                use: {
                    loader: 'graphql-tag/loader',
                }
            }, {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: {
                                safe: true
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            autoprefixer: {
                                browsers: ['last 2 versions']
                            },
                            plugins: () => [
                                require('autoprefixer')
                            ]
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sourceMapContents: false
                        }
                    }
                ]
            }, {
                test: /\.(jpe?g|bmp|png|gif|mp3|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath: `/`, //Use relative path to allow SCSS to load images from any folder
                            emitFile: true
                        }
                    }
                ]
            },
            // {
            //     test: /\.(png|jpg|gif)$/i,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 8192
            //             }
            //     }]
            // },
            {
                test: /\.node$/,
                use: 'node-loader'
            }

        ]
    },
}];
