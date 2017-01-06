const buble = require('rollup-plugin-buble');

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
		buble({
			transforms: {modules: false}
		})
	]
};
