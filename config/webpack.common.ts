import {Configuration} from 'webpack';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

let config: Configuration = {
    entry: "./src/ts/main.ts",
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
    }
};

export default config
