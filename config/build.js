const babel = require('rollup-plugin-babel');

/**
 * Rollup Config: `build`
 */
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
		babel({
			presets: [['es2015', {loose: true, modules: false}]],
			plugins: ['inferno']
		})
	]
};
