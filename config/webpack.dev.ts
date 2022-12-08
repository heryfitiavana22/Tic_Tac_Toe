import * as path from 'path';
import {Configuration} from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import common from "./webpack.common"
import {merge} from "webpack-merge"

let configDev: Configuration = {
    output: {
        path: path.resolve("./", "dist"),
        filename: "js/[name].js",
    },
    mode: "development",
    watch: true,
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/template/index.html',
            filename: 'index.html',
            publicPath: '/dist/',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
}

export default merge(common, configDev)