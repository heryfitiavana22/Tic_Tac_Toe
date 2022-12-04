const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/ts/main.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js",
    },
    mode: "development",
    watch: true,
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
        rules : [{
            test : /\.css$/,
            use : [MiniCssExtractPlugin.loader, 'css-loader']
        }]
    },
    resolve: {
        extensions: ['.ts', '...' ],
    },
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
};
