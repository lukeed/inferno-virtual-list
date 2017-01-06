const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const replace = require('rollup-plugin-replace');
// const cUglify = require('./uglify');
const cBabel = require('./babel');

module.exports = {
	format: 'umd',
	moduleName: 'VirtualList',
	entry: 'src/index.js',
	dest: 'dist/inferno-virtual-list.js',
	external: [
		'inferno',
		'inferno-component'
	],
	globals: {
		'inferno': 'Inferno',
		'inferno-component': 'Inferno.Component'
	},
	plugins: [
		babel(cBabel),
		// uglify(cUglify),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	]
};
