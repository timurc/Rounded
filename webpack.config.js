const path = require('path');

module.exports = {
    entry: {
        main: './examples/main.js',
        type: './examples/type-edit.js',
        print: './examples/print/print.js',
        something2019: './examples/something2019/index.js',
        client: './client/index.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js',
        publicPath: '/dist',
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        modules: [path.join(__dirname), 'node_modules'],
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }],
            },
        ],
    },
};
