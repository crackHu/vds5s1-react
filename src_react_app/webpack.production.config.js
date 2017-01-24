const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, '../WebRoot/app');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const PROJECT_NAME = 'medicPHR'

const config = {
	devtool: 'cheap-module-source-map',
	entry: {
		app: path.resolve(APP_PATH, 'app.js'),
		vendor: [
			'react',
			'react-dom',
			'react-redux',
			'react-router',
			'redux',
			'redux-thunk',
			'isomorphic-fetch',
			'moment',
			'rc-queue-anim'
		],
		// polyfill: ['babel-polyfill'],
	},
	output: {
		path: BUILD_PATH,
		filename: 'assets/[name].[chunkhash:8].js',
		publicPath: `/${PROJECT_NAME}/app/`,
		chunkFilename: '[name].[chunkhash:8].chunk.js',
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
			loader: 'url?limit=65000&mimetype=image/svg+xml&name=assets/fonts/[name].[hash:8].[ext]'
		}, {
			test: /\.woff$/,
			loader: 'url?limit=65000&mimetype=application/font-woff&name=assets/fonts/[name].[hash:8].[ext]'
		}, {
			test: /\.woff2$/,
			loader: 'url?limit=65000&mimetype=application/font-woff2&name=assets/fonts/[name].[hash:8].[ext]'
		}, {
			test: /\.[ot]tf$/,
			loader: 'url?limit=65000&mimetype=application/octet-stream&name=assets/fonts/[name].[hash:8].[ext]'
		}, {
			test: /\.eot$/,
			loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=assets/fonts/[name].[hash:8].[ext]'
		}, ]
	},
	postcss: [
		autoprefixer({
			browsers: [
				'>1%',
				'last 4 versions',
				'Firefox ESR',
				'not ie < 9', // React doesn't support IE8 anyway
			]
		})
	],
	resolve: {
		alias: {
			echarts$: "echarts/src/echarts.js",
			echarts: "echarts/src",
			zrender$: "zrender/src/zrender.js",
			zrender: "zrender/src",

			'react': path.resolve(NODE_MODULES, 'react'),
			'config': path.resolve(APP_PATH, 'config'),
			'utils': path.resolve(APP_PATH, 'utils/utils'),
			'api': path.resolve(APP_PATH, 'api'),
			'AppActions': path.resolve(APP_PATH, 'actions/AppActions'),
			'ActionTypes': path.resolve(APP_PATH, 'constants/ActionTypes'),
			'app_base': APP_PATH,

			/*钉钉医疗*/
			'ddm': path.resolve(APP_PATH, 'modules/ddm'),
			'ddm_conf': path.resolve(APP_PATH, 'modules/ddm/DDMConfig'),
			/*登陆*/
			'login': path.resolve(APP_PATH, 'modules/login'),
			'login_conf': path.resolve(APP_PATH, 'modules/login/LoginConfig'),
			/*健康档案*/
			'phr': path.resolve(APP_PATH, 'modules/phr'),
			'phr_conf': path.resolve(APP_PATH, 'modules/phr/PHRConfig'),
			/*权限*/
			'rg': path.resolve(APP_PATH, 'modules/rg'),
			'rg_conf': path.resolve(APP_PATH, 'modules/rg/RGConfig'),
			/*统计*/
			'stat': path.resolve(APP_PATH, 'modules/stat'),
			'stat_conf': path.resolve(APP_PATH, 'modules/stat/STATConfig'),
		},
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		// new webpack.NoErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			comments: false,
			minimize: true,
			compress: {
				warnings: false,
				drop_debugger: true,
				drop_console: true
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor'],
			minChunks: Infinity,
			filename: 'assets/[name].[chunkhash:8].js',
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new ExtractTextPlugin("assets/[name].[contenthash:8].css", {
			allChunks: true
		}),
		new ManifestPlugin({
			fileName: 'asset-manifest.json'
		}),
		new HtmlwebpackPlugin({
			favicon: './app/assets/img/favicon.ico',
			title: '健康档案系统',
			template: './app/templates/index.html',
			filename: 'index.html',
			inject: 'body',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
		})
	]
};

module.exports = config