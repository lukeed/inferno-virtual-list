module.exports = {
	mangle: 1,
	compress: {
		conditionals: 1,
		drop_console: 1,
		comparisons: 1,
		join_vars: 1,
		booleans: 1,
		loops: 1
	},
	output: {
		comments: 0
	}
};
