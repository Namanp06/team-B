// module.exports = require('@hclcode/devutils-webpack')(__dirname, 'core_app');

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ROOT_NODE_MODULES_DIR = path.resolve('../../../node_modules');

module.exports = {
    entry: {
        server: './src/server.js'
    },
    output: {
        path: path.join(__dirname, '/dist/'),
        publicPath: '/',
        filename: '[name].js'
    },
    target: 'node',
    mode: 'production',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,
        __filename: false
    },
    externals: [
        // Need this to avoid error when working with Express
        nodeExternals(),
        nodeExternals({
            modulesDir: ROOT_NODE_MODULES_DIR
        })
    ],
    resolve: {
        extensions: ['.js', '.json']
    },
    module: {
        rules: [
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [new CleanWebpackPlugin()]
};
