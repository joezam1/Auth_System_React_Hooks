const path = require('path');
const Envconfig = require('./configuration/environment/EnvConfig.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var jsEntryPath = path.join(__dirname, './index.js');
var htmlEntryPath = path.resolve(__dirname, './index.html');
var allFilesOutputPath = path.resolve(__dirname, 'dist');

var htmlTemplate = { template: htmlEntryPath }
const htmlPlugin = new HtmlWebpackPlugin(htmlTemplate);

const cleanWebpackPlugin = new CleanWebpackPlugin();


module.exports = {
    devtool: 'source-map',
    entry: [jsEntryPath],
    mode: "development",
    output: {
        path: allFilesOutputPath,
        filename: "bundle.js",
        publicPath: "/",
    },
    resolve:{
        fallback:{
            "path": require.resolve("path-browserify")
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ],
    },
    devServer: {
        historyApiFallback: true,
        port: 8080
    },
    plugins: [htmlPlugin, cleanWebpackPlugin],
    resolve: {
        extensions: ['.css', '.scss', '.js', '.jsx']
    }
}