const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    resolve: {
        alias: {
        },
    },

    entry: {
        'main': './src/main.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        /*publicPath: '/assets/',*/
        publicPath: '',
        filename: '[name].js',
    },

    plugins: [
        /*
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        */

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },

                        {
                            loader: 'css-loader',
                        },

                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        /*require('precss'),*/
                                        require('autoprefixer'),
                                    ];
                                },
                            },
                        },

                        {
                            loader: 'sass-loader',
                        },
                ],
            },

            {
                test: /font.*\.(eot|svg|ttf|woff|woff2)$/,
                use: 'file-loader?name=static/font/[name].[ext]',
            },

            {
                test: /\.jpg$/,
                use: 'file-loader?name=static/img/[name].[ext]',
            },

            {
                test: /(\.png$|svg.*\.svg$)/,
                use: 'url-loader?limit=10000&name=static/img/[name].[ext]',
            },
        ],
    },
};