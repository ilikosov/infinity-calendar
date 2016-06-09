var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var underscore = require('underscore');

module.exports = {
    devtool: 'source-map',
    entry: {
        calendar: __dirname + '/src/index.js'
    },
    output: {
        path: __dirname + '/static',
        filename: '[name].js',
        library: 'bootstrap'
        // libraryTarget: 'commonjs'
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'underscore'
        }),
        new ExtractTextPlugin('[name].css')
    ],
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.json$/, exclude: /node_modules/, loader: 'json-loader'},
            {test: /\.ejs$/, loader: 'ejs-loader?variable=data'},
            {test: /\.css$/, loader:  ExtractTextPlugin.extract('style-loader', 'css-loader')}
        ]
    }
};
