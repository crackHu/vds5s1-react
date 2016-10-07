const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, '../WebRoot/app');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const PROJECT_NAME = 'medicPHR'

const config = {
	devtool: 'cheap-module-source-map',
	entry: {
		[`${PROJECT_NAME}`]: path.resolve(APP_PATH, 'app.js'),
		common: [
			'react',
			'react-dom',
			'react-redux',
			'react-router',
			'redux',
			'redux-thunk',
			'babel-polyfill',
			'isomorphic-fetch',
			'react-d3-components'
		]
	},
	output: {
		path: BUILD_PATH,
		filename: 'assets/[name].bundle.js',
		publicPath: `/${PROJECT_NAME}/app/`
	},
	module: {
		loaders: [{
			test: /\.js?$/,
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
			loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!sass')
		}, {
			test: /\.(png|jpg|jpeg|gif)$/,
			loader: 'url?limit=10000&name=assets/img/[name].[ext]'
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
			'config': path.resolve(APP_PATH, 'config'),
			'utils': path.resolve(APP_PATH, 'utils/utils'),

			/*钉钉医疗*/
			'ddm_conf': path.resolve(APP_PATH, 'modules/ddm/DDMConfig'),
			/*登陆*/
			'login_conf': path.resolve(APP_PATH, 'modules/login/LoginConfig'),
			/*健康档案*/
			'phr_conf': path.resolve(APP_PATH, 'modules/phr/PHRConfig'),
			/*权限*/
			'rg_conf': path.resolve(APP_PATH, 'modules/rg/RGConfig'),
			/*统计*/
			'stat_conf': path.resolve(APP_PATH, 'modules/stat/STATConfig'),
		},
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false,
				drop_debugger: true,
				drop_console: true
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			chunks: [`${PROJECT_NAME}`],
			filename: 'assets/[name].js',
			minChunks: Infinity
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new ExtractTextPlugin("assets/[name].style.css"),
		new HtmlwebpackPlugin({
			favicon: './app/assets/img/favicon.ico',
			title: '健康档案系统',
			template: './app/templates/index.html',
			hash: 'true',
			filename: 'index.html',
			inject: 'body'
		})
	]
};

module.exports = config