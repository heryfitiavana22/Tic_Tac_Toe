import * as path from 'path';
import {Configuration} from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as TerserWebpackPlugin from 'terser-webpack-plugin';
import common from "./webpack.common"
import {merge} from "webpack-merge"

let configProd: Configuration = {
    output: {
        path: path.resolve("./", "dist"),
        filename: "js/[name].[contenthash:8].js",
        clean: true
    },
    mode: "production",
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/template/index.html',
            filename: 'index.ejs',
            publicPath: '/',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin()
        ]
    }
}

export default merge(common, configProd)