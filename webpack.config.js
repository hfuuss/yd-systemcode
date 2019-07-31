const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const merge = require("webpack-merge");
const { resolve } = require("path");
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// console.log("🌹", argv);
const webpackConfig = {
    entry: {
        app: resolve("./src/web/index.tsx")
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({  
            filename: 'index.html',
            template: 'src/web/index.html'
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
}
module.exports = merge(webpackConfig, _mergeConfig);