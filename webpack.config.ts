import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

let config: webpack.Configuration = {
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
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            noEmit: false, // this option will solve the issue
                        },
                    },
                },
            },
            {
                test : /\.css$/,
                use : [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ],
        
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

export default config
