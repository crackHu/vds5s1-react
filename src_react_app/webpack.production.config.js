const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const env = process.env.NODE_ENV;
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, '../WebRoot/vdsapp');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');

const config = {
	devtool: 'cheap-module-source-map',
	entry: {
		vds5: path.resolve(APP_PATH, 'index.js'),
		/*common: ['antd']*/
	},
	output: {
		path: BUILD_PATH,
		filename: 'assets/[name].bundle_[hash].min.js'
	},
	proxy: {
		'/vds5s1/*': {
			target: 'http://localhost:8080/',
			host: 'example.com'
		}
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			include: APP_PATH
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css!postcss")
		}, {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css!less')
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css!sass')
		}, {
			test: /\.svg$/,
			loader: 'url?limit=65000&mimetype=image/svg+xml&name=assets/fonts/[name].[ext]'
		}, {
			test: /\.woff$/,
			loader: 'url?limit=65000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]'
		}, {
			test: /\.woff2$/,
			loader: 'url?limit=65000&mimetype=application/font-woff2&name=assets/fonts/[name].[ext]'
		}, {
			test: /\.[ot]tf$/,
			loader: 'url?limit=65000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]'
		}, {
			test: /\.eot$/,
			loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=assets/fonts/[name].[ext]'
		}, ]
	},
	postcss: [
		autoprefixer({
			browsers: ['last 3 versions', '> 1%']
		})
	],
	resolve: {
		alias: {
			'react': path.resolve(NODE_MODULES, 'react'),
		},
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false
			}
		}),
		/*new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			chunks: ['common'],
			filename: 'assets/[name]_[hash].min.js',
			minChunks: Infinity
		}),*/
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env)
		}),
		new ExtractTextPlugin("assets/[name].style_[hash].min.css"),
		new HtmlwebpackPlugin({
			title: 'VDS5 Foundation Platform',
			template: './app/templates/index.html',
			filename: 'index.html',
			inject: 'body'
		})
	]
};

module.exports = config