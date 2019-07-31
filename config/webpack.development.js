const { join } = require("path");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
module.exports = {
    devServer: {
        contentBase: join(__dirname, "../dist"),
        historyApiFallback: true,
        quiet: true,
        hot: true
    },
    plugins: [
        new WebpackBuildNotifierPlugin({
            title: "My Project Webpack Build",
            // logo: path.resolve("./img/favicon.png"),
            suppressSuccess: true
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: ['You application is running here http://localhost:3000'],
                notes: ['请使用npm run client:sver运行开发环境 🌶']
            },
            clearConsole: true,
            onErrors: function (severity, errors) {
                // You can listen to errors transformed and prioritized by the plugin
                // severity can be 'error' or 'warning'
            },
        })
    ]
}