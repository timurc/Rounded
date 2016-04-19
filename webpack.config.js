
module.exports = {
    entry: {
        main: "./examples/main.js",
        type: "./examples/type-edit.js",
        print: "./examples/print.js"
    },
    output: {
        path: __dirname,
        filename: "[name].bundle.js"
    },
    devtool: 'inline-source-map',
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