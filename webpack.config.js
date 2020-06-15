const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: 'eslint-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                type: 'javascript/auto',
                test: /manifest\.json$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'manifest.json'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CopyWebPackPlugin({
            patterns: [
                { from: './src/manifest.json', to: 'manifest.json' },
                { from: './src/favicon.ico', to: 'favicon.ico' }
            ]
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            MAPBOX_API_URL: 'https://api.mapbox.com',
            MAPBOX_API_KEY: '',
            OWM_API_URL: 'https://api.openweathermap.org',
            OWM_API_KEY: '',
            YELP_API_URL:
                'https://y9kj4t6r01.execute-api.us-east-1.amazonaws.com/dev',
            YELP_API_KEY: ''
        })
    ]
};
