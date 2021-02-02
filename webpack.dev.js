const path = require('path');

module.exports = {
	mode: 'development', // The plugin is activated only if mode is set to development
	watch: true,
	entry: {
		'content-script': './src/content/index.ts',
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'emotes.bundle.js',
	},
};
