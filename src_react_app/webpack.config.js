var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var config = {
	entry : {
		app: path.resolve(APP_PATH, 'index.jsx')
	},
	output : {
		path : BUILD_PATH,
		filename : 'bundle.js'
	},
	devtool: 'eval-source-map',
	devServer: {
		port: 1111,
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},
	module: {
		loaders: [
		  {
			test: /\.jsx?$/,
			loader: 'babel',
			include: APP_PATH
		  },
		  {
			test: /\.css$/,
			loaders: ['style', 'css']
		  },
		  {
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass']
		  },
		  { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=assets/fonts/[name].[ext]' },
		  { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]' },
		  { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=assets/fonts/[name].[ext]' },
		  { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]' },
		  { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=assets/fonts/[name].[ext]' },
		]
	},
	resolve: {
      extensions: ['', '.js', '.jsx']
	},
	plugins : [
		new webpack.optimize.UglifyJsPlugin({minimize: true}),
		new HtmlwebpackPlugin({
			title : 'VDS Foundation Platform'
		})
	]
};

module.exports = config