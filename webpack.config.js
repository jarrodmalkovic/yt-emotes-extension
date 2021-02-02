const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/content/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'ytemotes.bundle.js',
	},
};
