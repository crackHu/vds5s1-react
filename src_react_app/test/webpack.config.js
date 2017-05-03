const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const PROJECT_NAME = 'medicPHR'

const config = {
	entry: {
		app: path.resolve(APP_PATH, 'app.js')
	},
	output: {
		path: BUILD_PATH,
		filename: '[name].js',
		publicPath: '/',
		chunkFilename: '[name].chunk.js',
	},
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		port: 1111,
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		proxy: {
			[`/${PROJECT_NAME}/*`]: {
				target: 'http://localhost:8080/',
				host: '',
			}
		}
	},
	module: {
		loaders: [{
			test: /\.js?$/,
			loader: 'babel',
			include: APP_PATH
		}, {
			test: /\.css$/,
			loader: 'style!css!postcss'
		}, {
			test: /\.less$/,
			loader: 'style!css!less'
		}, {
			test: /\.scss$/,
			loader: 'style!css!postcss!sass'
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
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
		new webpack.ProvidePlugin({
			NProgress: 'nprogress'
		}),
		new HtmlwebpackPlugin({
			favicon: './app/assets/img/favicon.ico',
			title: '健康档案系统',
			template: './app/templates/index.html',
			filename: 'index.html',
			inject: 'body'
		})
	]
};

module.exports = config