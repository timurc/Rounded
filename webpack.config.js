
module.exports = {
    entry: {
        main: "./examples/main.js",
        type: "./examples/type-edit.js",
        print: "./examples/print.js"
    },
    output: {
        path: __dirname + '/dist',
        filename: "[name].bundle.js",
        publicPath: '/Rounded/dist'
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        root: __dirname,
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    }
};