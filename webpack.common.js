const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		app: './app/app.module.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist'),
	},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
	},
	plugins: [
	/*
		new webpack.ProvidePlugin({
		  $: 'jquery'
		})
		*/
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader',
			},
			{
				test: /\.(eot|svg|gif|png|jpg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
				loader: 'url-loader'
			},
		],
	},
};
