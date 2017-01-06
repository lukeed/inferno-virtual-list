const uglify = require('rollup-plugin-uglify');
const config = require('./build');

config.dest = 'dist/inferno-virtual-list.min.js';

config.plugins.push(
	uglify({
		mangle: true,
		compress: {
			conditionals: true,
			drop_console: true,
			comparisons: true,
			join_vars: true,
			booleans: true,
			loops: true
		},
		output: {
			comments: false
		}
	})
);

module.exports = config;
